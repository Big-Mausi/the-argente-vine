import { useState, type FormEvent } from "react";
import { submitContactMessage } from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await submitContactMessage(formData);

      alert("Your message has been sent successfully.");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);

      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <main>
      {/* Header */}
      <section className="py-5 bg-dark text-white text-center">
        <div className="container">
          <h1 className="display-5 fw-bold">Contact Us</h1>

          <p className="lead mb-0">We'd love to hear from you.</p>
        </div>
      </section>

      {/* Contact Information + Form */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {/* Contact Information */}
            <div className="col-lg-5">
              <h2 className="fw-bold mb-4">Get in Touch</h2>

              <p className="text-muted">
                Whether you have a question, want to make a reservation, or
                simply want to learn more about The Argenté Vine, feel free to
                reach out.
              </p>

              <div className="mt-4">
                <div className="d-flex mb-4">
                  <i className="bi bi-geo-alt fs-4 me-3"></i>

                  <div>
                    <h5 className="mb-1">Address</h5>
                    <p className="text-muted mb-0">
                      The Argenté Vine Restaurant
                    </p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <i className="bi bi-telephone fs-4 me-3"></i>

                  <div>
                    <h5 className="mb-1">Phone</h5>
                    <p className="text-muted mb-0">+234 800 000 0000</p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <i className="bi bi-envelope fs-4 me-3"></i>

                  <div>
                    <h5 className="mb-1">Email</h5>
                    <p className="text-muted mb-0">hello@argentevine.com</p>
                  </div>
                </div>

                <div className="d-flex">
                  <i className="bi bi-clock fs-4 me-3"></i>

                  <div>
                    <h5 className="mb-1">Opening Hours</h5>
                    <p className="text-muted mb-0">
                      Monday – Sunday
                      <br />
                      11:00 AM – 11:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <h2 className="fw-bold mb-4">Send Us a Message</h2>

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

                      <div className="col-12">
                        <label htmlFor="subject" className="form-label">
                          Subject
                        </label>

                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="form-control"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label htmlFor="message" className="form-label">
                          Message
                        </label>

                        <textarea
                          id="message"
                          name="message"
                          className="form-control"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>

                      <div className="col-12">
                        <button type="submit" className="btn btn-warning px-4">
                          Send Message
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

export default Contact;
