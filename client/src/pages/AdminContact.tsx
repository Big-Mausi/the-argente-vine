import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteContactMessage,
  getContactMessages,
  type ContactMessageResponse,
} from "../services/api";

const AdminContact = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<ContactMessageResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadMessages = async () => {
      try {
        const data = await getContactMessages();

        if (cancelled) return;

        setMessages(data);
      } catch (error) {
        if (cancelled) return;

        console.error("Error loading contact messages:", error);
        setError("Unable to load contact messages.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmed) return;

    try {
      await deleteContactMessage(id);

      setMessages((previous) =>
        previous.filter((message) => message.id !== id),
      );

      setSuccess("Message deleted successfully.");
      setError("");
    } catch (error) {
      console.error("Error deleting contact message:", error);
      setError("Unable to delete contact message.");
      setSuccess("");
    }
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold mb-1">Contact Messages</h1>

            <p className="text-muted mb-0">
              View messages submitted through the contact form.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => navigate("/admin/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>

        {success && <div className="alert alert-success">{success}</div>}

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            {loading ? (
              <p className="text-muted">Loading messages...</p>
            ) : messages.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted mb-0">No contact messages found.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Sender</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {messages.map((message) => (
                      <tr key={message.id}>
                        <td>
                          <strong>{message.name}</strong>

                          <br />

                          <small className="text-muted">{message.email}</small>
                        </td>

                        <td>{message.subject}</td>

                        <td>{message.message}</td>

                        <td>{new Date(message.createdAt).toLocaleString()}</td>

                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(message.id)}
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

export default AdminContact;
