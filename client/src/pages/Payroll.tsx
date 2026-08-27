import { useEffect, useState } from "react";
import {
  createPayrollPeriod,
  getPayrollPeriods,
  getPayrollRecords,
  markPayrollAsPaid,
  processPayroll,
  type PayrollPeriod,
  type PayrollRecord,
} from "../services/api";

const emptyForm = {
  name: "",
  startDate: "",
  endDate: "",
};

const Payroll = () => {
  const [periods, setPeriods] = useState<PayrollPeriod[]>([]);
  const [records, setRecords] = useState<PayrollRecord[]>([]);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [payingId, setPayingId] = useState<number | null>(null);

  const [error, setError] = useState("");

  const loadPayroll = async () => {
    try {
      setError("");

      const [periodData, recordData] = await Promise.all([
        getPayrollPeriods(),
        getPayrollRecords(),
      ]);

      setPeriods(periodData);
      setRecords(recordData);
    } catch (error) {
      console.error("Error loading payroll:", error);
      setError("Unable to load payroll data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialPayroll = async () => {
      try {
        const [periodData, recordData] = await Promise.all([
          getPayrollPeriods(),
          getPayrollRecords(),
        ]);

        if (cancelled) return;

        setPeriods(periodData);
        setRecords(recordData);
      } catch (error) {
        if (cancelled) return;

        console.error("Error loading payroll:", error);
        setError("Unable to load payroll data.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialPayroll();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleCreatePeriod = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      await createPayrollPeriod(form);

      setForm(emptyForm);

      await loadPayroll();
    } catch (error) {
      console.error("Error creating payroll period:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to create payroll period.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleProcessPayroll = async (periodId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to process this payroll period?",
    );

    if (!confirmed) return;

    try {
      setProcessingId(periodId);
      setError("");

      await processPayroll(periodId);

      await loadPayroll();
    } catch (error) {
      console.error("Error processing payroll:", error);

      setError(
        error instanceof Error ? error.message : "Unable to process payroll.",
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleMarkAsPaid = async (recordId: number) => {
    const confirmed = window.confirm("Mark this payroll record as paid?");

    if (!confirmed) return;

    try {
      setPayingId(recordId);
      setError("");

      await markPayrollAsPaid(recordId);

      await loadPayroll();
    } catch (error) {
      console.error("Error marking payroll as paid:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to mark payroll as paid.",
      );
    } finally {
      setPayingId(null);
    }
  };

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1">Payroll</h1>

          <p className="text-muted mb-0">
            Manage payroll periods and employee payments.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={loadPayroll}
        >
          Refresh
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Create Payroll Period */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h5 fw-bold mb-4">Create Payroll Period</h2>

          <form onSubmit={handleCreatePeriod}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Period Name</label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="August 2026 Payroll"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Start Date</label>

                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">End Date</label>

                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  value={form.endDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={saving}
                >
                  {saving ? "Creating..." : "Create Payroll Period"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Payroll Periods */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h5 fw-bold mb-4">Payroll Periods</h2>

          {loading ? (
            <p className="text-muted">Loading payroll...</p>
          ) : periods.length === 0 ? (
            <p className="text-muted">No payroll periods found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {periods.map((period) => (
                    <tr key={period.id}>
                      <td>
                        <strong>{period.name}</strong>
                      </td>

                      <td>{new Date(period.startDate).toLocaleDateString()}</td>

                      <td>{new Date(period.endDate).toLocaleDateString()}</td>

                      <td>
                        <span className="badge text-bg-secondary">
                          {period.status}
                        </span>
                      </td>

                      <td>
                        {period.status === "OPEN" && (
                          <button
                            type="button"
                            className="btn btn-sm btn-dark"
                            disabled={processingId === period.id}
                            onClick={() => handleProcessPayroll(period.id)}
                          >
                            {processingId === period.id
                              ? "Processing..."
                              : "Process Payroll"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Payroll Records */}

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h2 className="h5 fw-bold mb-4">Payroll Records</h2>

          {loading ? (
            <p className="text-muted">Loading payroll records...</p>
          ) : records.length === 0 ? (
            <p className="text-muted">No payroll records found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Period</th>
                    <th>Basic</th>
                    <th>Allowances</th>
                    <th>Deductions</th>
                    <th>Gross</th>
                    <th>Net</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td>
                        <strong>
                          {record.employee.firstName} {record.employee.lastName}
                        </strong>
                      </td>

                      <td>{record.payrollPeriod.name}</td>

                      <td>{formatCurrency(record.basicSalary)}</td>

                      <td>{formatCurrency(record.allowances)}</td>

                      <td>{formatCurrency(record.deductions)}</td>

                      <td>{formatCurrency(record.grossSalary)}</td>

                      <td>
                        <strong>{formatCurrency(record.netSalary)}</strong>
                      </td>

                      <td>
                        {record.status === "PAID" ? (
                          <span className="badge text-bg-success">Paid</span>
                        ) : (
                          <span className="badge text-bg-warning">Pending</span>
                        )}
                      </td>

                      <td>
                        {record.status === "PENDING" && (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-dark"
                            disabled={payingId === record.id}
                            onClick={() => handleMarkAsPaid(record.id)}
                          >
                            {payingId === record.id
                              ? "Updating..."
                              : "Mark Paid"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Payroll;
