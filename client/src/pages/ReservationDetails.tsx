import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getReservations,
  updateReservationStatus,
  type Reservation,
} from "../services/api";

const ReservationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReservation = async () => {
      try {
        const reservations = await getReservations();

        const foundReservation = reservations.find(
          (item) => item.id === Number(id),
        );

        if (!foundReservation) {
          setError("Reservation not found.");
          return;
        }

        setReservation(foundReservation);
      } catch (error) {
        console.error("Error loading reservation:", error);
        setError("Unable to load reservation.");
      } finally {
        setLoading(false);
      }
    };

    loadReservation();
  }, [id]);

  const handleStatusChange = async (status: Reservation["status"]) => {
    if (!reservation) return;

    try {
      await updateReservationStatus(reservation.id, status);

      setReservation({
        ...reservation,
        status,
      });
    } catch (error) {
      console.error("Error updating reservation:", error);
      setError("Unable to update reservation status.");
    }
  };

  if (loading) {
    return (
      <main className="py-5">
        <div className="container">
          <p>Loading reservation...</p>
        </div>
      </main>
    );
  }

  if (error || !reservation) {
    return (
      <main className="py-5">
        <div className="container">
          <div className="alert alert-danger">
            {error || "Reservation not found."}
          </div>

          <button
            type="button"
            className="btn btn-dark"
            onClick={() => navigate("/admin/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="py-5">
      <div className="container">
        <button
          type="button"
          className="btn btn-outline-secondary mb-4"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Reservations
        </button>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h1 className="h3 fw-bold mb-1">
                  Reservation #{reservation.id}
                </h1>

                <p className="text-muted mb-0">
                  Submitted {new Date(reservation.createdAt).toLocaleString()}
                </p>
              </div>

              <span className="badge bg-secondary fs-6">
                {reservation.status}
              </span>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <h2 className="h6 text-muted">Customer</h2>

                <p className="mb-1 fw-bold">{reservation.name}</p>

                <p className="mb-1">{reservation.email}</p>

                <p className="mb-0">{reservation.phone}</p>
              </div>

              <div className="col-md-6">
                <h2 className="h6 text-muted">Reservation</h2>

                <p className="mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(reservation.date).toLocaleDateString()}
                </p>

                <p className="mb-1">
                  <strong>Time:</strong> {reservation.time}
                </p>

                <p className="mb-0">
                  <strong>Guests:</strong> {reservation.guests}
                </p>
              </div>

              <div className="col-12">
                <h2 className="h6 text-muted">Special Request</h2>

                <div className="bg-light rounded p-3">
                  {reservation.specialRequest || "No special request."}
                </div>
              </div>

              <div className="col-12">
                <hr />

                <label
                  htmlFor="reservation-status"
                  className="form-label fw-bold"
                >
                  Update Status
                </label>

                <select
                  id="reservation-status"
                  className="form-select"
                  value={reservation.status}
                  onChange={(event) =>
                    handleStatusChange(
                      event.target.value as Reservation["status"],
                    )
                  }
                >
                  <option value="PENDING">Pending</option>

                  <option value="CONFIRMED">Confirmed</option>

                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReservationDetails;
