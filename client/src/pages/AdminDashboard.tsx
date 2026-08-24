import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteReservation,
  getReservations,
  updateReservationStatus,
  type Reservation,
} from "../services/api";
import { useAuth } from "../context/AuthContext";

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
    <main className="py-5">
      <div className="container">
        {/* Dashboard Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold mb-1">Admin Dashboard</h1>

            <p className="text-muted mb-0">Welcome, {admin?.email}</p>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => navigate("/admin/menu")}
            >
              Manage Menu
            </button>

            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Reservations */}
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h4 fw-bold mb-0">Reservations</h2>

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={loadReservations}
              >
                Refresh
              </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
              <p className="text-muted">Loading reservations...</p>
            ) : reservations.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted mb-0">No reservations found.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
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
                          <strong>{reservation.name}</strong>

                          <br />

                          <small className="text-muted">
                            {reservation.email}
                          </small>
                        </td>

                        <td>
                          {new Date(reservation.date).toLocaleDateString()}
                        </td>

                        <td>{reservation.time}</td>

                        <td>{reservation.guests}</td>

                        <td>{reservation.specialRequest || "—"}</td>

                        <td>
                          <select
                            className="form-select form-select-sm"
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
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-dark me-2"
                            onClick={() =>
                              navigate(`/admin/reservations/${reservation.id}`)
                            }
                          >
                            View
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(reservation.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
