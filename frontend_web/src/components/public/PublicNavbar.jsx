import { Link } from "react-router-dom";

import { getUser } from "../../services/authUtils";

function PublicNavbar() {

  const user = getUser();

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">

      <div className="container">

        {/* LOGO */}

        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          Gestão Eventos
        </Link>

        {/* MENU */}

        <div className="navbar-nav mx-auto">

          <Link
            className="nav-link"
            to="/eventos-publicos"
          >
            Eventos
          </Link>

        </div>

        {/* DIREITA */}

        <div className="d-flex gap-2">

          {!user ? (

            <>

              <Link
                to="/login"
                className="btn btn-outline-light"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-light"
              >
                Registar
              </Link>

            </>

          ) : (

            <Link
              to="/perfil"
              className="btn btn-light"
            >
              Perfil
            </Link>

          )}

        </div>

      </div>

    </nav>

  )

}

export default PublicNavbar;