import { useState, type ChangeEvent, type FormEvent } from "react";
import { submitReservation } from "../services/api";

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    specialRequest: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "guests" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await submitReservation(formData);

      setSuccess(
        "Your reservation request has been received. We will contact you to confirm your booking.",
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 1,
        specialRequest: "",
      });
    } catch (error) {
      console.error("Error submitting reservation:", error);

      setError(
        "Something went wrong while making your reservation. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <main>
      <section className="py-5 bg-dark text-white text-center">
        <div className="container">
          <h1 className="display-5 fw-bold">Make a Reservation</h1>

          <p className="lead mb-0">Reserve your table at The Argenté Vine.</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <h2 className="fw-bold mb-4">Book Your Table</h2>

                  {success && (
                    <div className="alert alert-success" role="alert">
                      {success}
                    </div>
                  )}

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>

                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>

                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="phone" className="form-label">
                          Phone
                        </label>

                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="form-control"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="date" className="form-label">
                          Date
                        </label>

                        <input
                          type="date"
                          id="date"
                          name="date"
                          className="form-control"
                          value={formData.date}
                          onChange={handleChange}
                          min={today}
                          required
                        />
                      </div>

                      <div className="col-md-3">
                        <label htmlFor="time" className="form-label">
                          Time
                        </label>

                        <select
                          id="time"
                          name="time"
                          className="form-select"
                          value={formData.time}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a time</option>
                          {/* <option value="10:00 AM">10:00 AM</option> */}
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="1:00 PM">1:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                          <option value="6:00 PM">6:00 PM</option>
                          <option value="7:00 PM">7:00 PM</option>
                          <option value="8:00 PM">8:00 PM</option>
                          <option value="9:00 PM">9:00 PM</option>
                          <option value="10:00 PM">10:00 PM</option>
                        </select>
                      </div>

                      <div className="col-md-4">
                        <label htmlFor="guests" className="form-label">
                          Number of Guests
                        </label>

                        <input
                          type="number"
                          id="guests"
                          name="guests"
                          className="form-control"
                          min="1"
                          max="20"
                          value={formData.guests}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label htmlFor="specialRequest" className="form-label">
                          Special Request{" "}
                          <span className="text-muted">(Optional)</span>
                        </label>

                        <textarea
                          id="specialRequest"
                          name="specialRequest"
                          className="form-control"
                          rows={4}
                          value={formData.specialRequest}
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn btn-warning px-4"
                          disabled={loading}
                        >
                          {loading ? "Sending..." : "Request Reservation"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Reservation;
