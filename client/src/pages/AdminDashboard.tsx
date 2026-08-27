import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteReservation,
  getReservations,
  updateReservationStatus,
  type Reservation,
} from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReservations = async () => {
    try {
      setError("");

      const data = await getReservations();
      setReservations(data);
    } catch (error) {
      console.error("Error loading reservations:", error);
      setError("Unable to load reservations.");
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialReservations = async () => {
      try {
        const data = await getReservations();

        if (cancelled) return;

        setReservations(data);
      } catch (error) {
        if (cancelled) return;

        console.error("Error loading reservations:", error);
        setError("Unable to load reservations.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialReservations();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleStatusChange = async (
    id: number,
    status: Reservation["status"],
  ) => {
    try {
      await updateReservationStatus(id, status);
      await loadReservations();
    } catch (error) {
      console.error("Error updating reservation:", error);
      setError("Unable to update reservation status.");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this reservation?",
    );

    if (!confirmed) return;

    try {
      await deleteReservation(id);
      await loadReservations();
    } catch (error) {
      console.error("Error deleting reservation:", error);
      setError("Unable to delete reservation.");
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/admin/login";
  };

  return (
    <main className="admin-dashboard">
      <div className="container">
        {/* Dashboard Header */}
        <div className="admin-header">
          <div>
            <p className="admin-eyebrow">ARGENTÉ VINE · ADMIN</p>

            <h1>Admin Dashboard</h1>

            <p className="admin-welcome">Welcome back, {admin?.email}</p>
          </div>

          <div className="admin-actions">
            <button
              type="button"
              className="admin-btn admin-btn-outline"
              onClick={() => navigate("/admin/menu")}
            >
              Manage Menu
            </button>

            <button
              type="button"
              className="admin-btn admin-btn-outline"
              onClick={() => navigate("/admin/employees")}
            >
              Employees
            </button>

            <button
              type="button"
              className="admin-btn admin-btn-outline"
              onClick={() => navigate("/admin/payroll")}
            >
              Payroll
            </button>

            <button
              type="button"
              className="admin-btn admin-btn-dark"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Reservations */}
        <section className="admin-card">
          <div className="admin-card-header">
            <div>
              <p className="admin-section-label">BOOKINGS</p>
              <h2>Reservations</h2>
            </div>

            <button
              type="button"
              className="admin-refresh"
              onClick={loadReservations}
            >
              Refresh
            </button>
          </div>

          {error && <div className="admin-alert">{error}</div>}

          {loading ? (
            <div className="admin-empty-state">
              <p>Loading reservations...</p>
            </div>
          ) : reservations.length === 0 ? (
            <div className="admin-empty-state">
              <p>No reservations found.</p>
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests</th>
                    <th>Request</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>
                        <div className="guest-name">{reservation.name}</div>

                        <div className="guest-email">{reservation.email}</div>
                      </td>

                      <td>{new Date(reservation.date).toLocaleDateString()}</td>

                      <td>{reservation.time}</td>

                      <td>{reservation.guests}</td>

                      <td className="request-cell">
                        {reservation.specialRequest || "—"}
                      </td>

                      <td>
                        <select
                          className={`status-select status-${reservation.status.toLowerCase()}`}
                          value={reservation.status}
                          onChange={(event) =>
                            handleStatusChange(
                              reservation.id,
                              event.target.value as Reservation["status"],
                            )
                          }
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </td>

                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="action-view"
                            onClick={() =>
                              navigate(`/admin/reservations/${reservation.id}`)
                            }
                          >
                            View
                          </button>

                          <button
                            type="button"
                            className="action-delete"
                            onClick={() => handleDelete(reservation.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AdminDashboard;
