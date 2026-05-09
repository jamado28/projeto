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

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          Gestão Eventos
        </Link>

        <div className="navbar-nav">

          <Link className="nav-link" to="/eventos">
            Eventos
          </Link>

          {(user?.role === "cliente" || user?.role === "organizador" || user?.role === "admin") && (
            <Link className="nav-link" to="/pessoas">
              Pessoas
            </Link>
          )}

          {(user?.role === "cliente" || user?.role === "organizador" || user?.role === "admin") && (

            <Link className="nav-link" to="/carros">
              Carros
            </Link>

          )}

          {(user?.role === "cliente" || user?.role === "organizador" || user?.role === "admin") && (
            <Link className="nav-link" to="/bilhetes">
              Bilhetes
            </Link>
          )}

          {(user?.role === "cliente" || user?.role === "organizador" || user?.role === "admin") && (
            <Link className="nav-link" to="/pagamentos">
              Pagamentos
            </Link>
          )}

        </div>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>

  )

}

export default Navbar;