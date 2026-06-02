import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { Link } from "react-router-dom";
import PublicNavbar from "../../components/public/PublicNavbar";
import Footer from "../../components/public/Footer";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);

      localStorage.setItem("token", response.AccessToken);

      navigate("/perfil");
    } catch (error) {
      setErro("Credenciais inválidas");
    }
  };

  return (
    <div>
      <PublicNavbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card p-4">
              <h2 className="mb-4 text-center">Login</h2>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {erro && (
                  <div className="alert alert-danger mt-3">
                    {erro}
                  </div>
                )}
                <button type="submit" className="btn btn-dark w-100">
                  Entrar
                </button>
                <p className="mt-3 text-center">
                  Não tem conta?
                  <Link to="/register" className="ms-2">
                    Registar
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
