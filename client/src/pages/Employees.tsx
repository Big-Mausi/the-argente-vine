import { useEffect, useState } from "react";
import {
  createEmployee,
  deactivateEmployee,
  getEmployees,
  updateEmployee,
  type Employee,
} from "../services/api";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  jobTitle: "",
  department: "",
  basicSalary: "",
};

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadEmployees = async () => {
    try {
      setError("");
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error loading employees:", error);
      setError("Unable to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialEmployees = async () => {
      try {
        setError("");

        const data = await getEmployees();

        if (cancelled) return;

        setEmployees(data);
      } catch (error) {
        if (cancelled) return;

        console.error("Error loading employees:", error);
        setError("Unable to load employees.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialEmployees();

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

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const employeeData = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        jobTitle: form.jobTitle,
        department: form.department,
        basicSalary: Number(form.basicSalary),
      };

      if (editingId !== null) {
        await updateEmployee(editingId, employeeData);
      } else {
        await createEmployee(employeeData);
      }

      resetForm();
      await loadEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);
      setError("Unable to save employee.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingId(employee.id);

    setForm({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      jobTitle: employee.jobTitle,
      department: employee.department,
      basicSalary: String(employee.basicSalary),
    });
  };

  const handleDeactivate = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to deactivate this employee?",
    );

    if (!confirmed) return;

    try {
      setError("");

      await deactivateEmployee(id);
      await loadEmployees();
    } catch (error) {
      console.error("Error deactivating employee:", error);
      setError("Unable to deactivate employee.");
    }
  };

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1">Employees</h1>
          <p className="text-muted mb-0">
            Manage restaurant employees and salary information.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Employee Form */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h5 fw-bold mb-4">
            {editingId !== null ? "Edit Employee" : "Add Employee"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  className="form-control"
                  value={form.jobTitle}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  name="department"
                  className="form-control"
                  value={form.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Basic Salary</label>
                <input
                  type="number"
                  name="basicSalary"
                  className="form-control"
                  min="0"
                  value={form.basicSalary}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId !== null
                      ? "Update Employee"
                      : "Add Employee"}
                </button>

                {editingId !== null && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Employee List */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h2 className="h5 fw-bold mb-4">Employee List</h2>

          {loading ? (
            <p className="text-muted">Loading employees...</p>
          ) : employees.length === 0 ? (
            <p className="text-muted">No employees found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Job Title</th>
                    <th>Department</th>
                    <th>Basic Salary</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>
                        <strong>
                          {employee.firstName} {employee.lastName}
                        </strong>
                        <br />
                        <small className="text-muted">{employee.email}</small>
                      </td>

                      <td>{employee.jobTitle}</td>

                      <td>{employee.department}</td>

                      <td>₦{employee.basicSalary.toLocaleString()}</td>

                      <td>
                        {employee.isActive ? (
                          <span className="badge text-bg-success">Active</span>
                        ) : (
                          <span className="badge text-bg-secondary">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark me-2"
                          onClick={() => handleEdit(employee)}
                        >
                          Edit
                        </button>

                        {employee.isActive && (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeactivate(employee.id)}
                          >
                            Deactivate
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

export default Employees;
