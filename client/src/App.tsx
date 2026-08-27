import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reservation from "./pages/Reservation";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMenu from "./pages/AdminMenu";
import AdminContact from "./pages/AdminContact";
import ReservationDetails from "./pages/ReservationDetails";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import { AuthProvider } from "./context/AuthContext";

import Employees from "./pages/Employees";
import Payroll from "./pages/Payroll";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public website */}
          <Route
            element={
              <>
                <Navbar />

                <div>
                  <Outlet />
                </div>

                <Footer />
              </>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservation" element={<Reservation />} />
          </Route>

          {/* Admin login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              <Route path="/admin/menu" element={<AdminMenu />} />

              <Route path="/admin/contact" element={<AdminContact />} />

              <Route path="/admin/employees" element={<Employees />} />
              <Route path="/admin/payroll" element={<Payroll />} />

              <Route
                path="/admin/reservations/:id"
                element={<ReservationDetails />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
