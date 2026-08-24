import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span
            className="navbar-brand fw-bold"
            role="button"
            onClick={() => navigate("/admin/dashboard")}
          >
            The Argenté Vine — Admin
          </span>

          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className={`btn btn-sm ${
                location.pathname === "/admin/dashboard"
                  ? "btn-light"
                  : "btn-outline-light"
              }`}
              onClick={() => navigate("/admin/dashboard")}
            >
              Dashboard
            </button>

            <button
              type="button"
              className={`btn btn-sm ${
                location.pathname === "/admin/menu"
                  ? "btn-light"
                  : "btn-outline-light"
              }`}
              onClick={() => navigate("/admin/menu")}
            >
              Menu
            </button>

            <button
              type="button"
              className={`btn btn-sm ${
                location.pathname === "/admin/contact"
                  ? "btn-light"
                  : "btn-outline-light"
              }`}
              onClick={() => navigate("/admin/contact")}
            >
              Messages
            </button>

            <span className="text-white small ms-2">{admin?.email}</span>

            <button
              type="button"
              className="btn btn-outline-light btn-sm ms-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default AdminLayout;
