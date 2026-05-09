import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../services/authUtils";

function Navbar() {

  const user = getUser();

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{
        background:
          "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(14px)",
        borderBottom:
          "1px solid rgba(255,255,255,0.06)"
      }}
    >

      <div className="container py-2">

        {/* LOGO */}

        <Link
          className="navbar-brand fw-bold fs-4"
          to="/"
          style={{
            letterSpacing: "1px"
          }}
        >

          AutoEventos

        </Link>

        {/* MOBILE */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >

          <span className="navbar-toggler-icon"></span>

        </button>

        {/* MENU */}

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >

          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

            <Link
              className="nav-link px-3"
              to="/eventos"
            >
              Eventos
            </Link>

            {(user?.role === "cliente" ||
              user?.role === "organizador" ||
              user?.role === "admin") && (

              <Link
                className="nav-link px-3"
                to="/profile"
              >
                Dashboard
              </Link>

            )}

            {!user && (

              <>
              
                <Link
                  className="nav-link px-3"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="btn btn-danger ms-lg-3 px-4"
                  to="/register"
                >
                  Registar
                </Link>

              </>

            )}

            {user && (

              <button
                className="btn btn-danger ms-lg-3 px-4"
                onClick={logout}
              >

                Logout

              </button>

            )}

          </div>

        </div>

      </div>

    </nav>

  )

}

export default Navbar;