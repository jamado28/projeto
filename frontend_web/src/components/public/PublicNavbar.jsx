import { Link } from "react-router-dom";

import { getUser } from "../../services/authUtils";

// ÍCONES
import {
  FaCarSide,
  FaCalendarAlt,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

function PublicNavbar() {
  const user = getUser();

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        background: "linear-gradient(90deg, #111827 0%, #0f172a 100%)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="container py-2">
        {/* LOGO */}

        <Link
          className="navbar-brand d-flex align-items-center gap-3 fw-bold text-white"
          to="/"
          style={{
            fontSize: "1.4rem",
          }}
        >
          AutoEventos
        </Link>

        {/* BOTÃO MOBILE */}

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}

        <div className="collapse navbar-collapse" id="navbarContent">
          {/* CENTRO */}

          <div className="navbar-nav mx-auto d-flex align-items-center gap-lg-3 mt-4 mt-lg-0">
            <Link
              className="nav-link text-white d-flex align-items-center gap-2 fw-semibold"
              to="/eventos-publicos"
              style={{
                fontSize: "1rem",
              }}
            >
              Eventos
            </Link>
          </div>

          {/* DIREITA */}

          <div className="d-flex flex-column flex-lg-row gap-2 mt-4 mt-lg-0">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="btn d-flex align-items-center justify-content-center gap-2"
                  style={{
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    borderRadius: "14px",
                    padding: "10px 18px",
                    fontWeight: "600",
                  }}
                >
                  <FaSignInAlt />
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn d-flex align-items-center justify-content-center gap-2"
                  style={{
                    backgroundColor: "#df9425",
                    color: "#111",
                    borderRadius: "14px",
                    padding: "10px 18px",
                    fontWeight: "700",
                    border: "none",
                  }}
                >
                  <FaUserPlus />
                  Registar
                </Link>
              </>
            ) : (
              <Link
                to="/perfil"
                className="btn d-flex align-items-center justify-content-center gap-2"
                style={{
                  backgroundColor: "#df9425",
                  color: "#111",
                  borderRadius: "14px",
                  padding: "10px 18px",
                  fontWeight: "700",
                  border: "none",
                }}
              >
                <FaUser />
                Perfil
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PublicNavbar;
