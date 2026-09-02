import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = "/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to login");
      }

      await refreshAuth();
      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while logging in.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="py-5 bg-dark text-white text-center">
        <div className="container">
          <h1 className="display-5 fw-bold">Admin Login</h1>
          <p className="lead mb-0">Sign in to manage The Argenté Vine.</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-md-5">
                  <h2 className="fw-bold mb-4">Sign In</h2>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>

                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>

                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-warning w-100"
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </button>
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

export default AdminLogin;
