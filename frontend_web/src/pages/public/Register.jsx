import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { register } from "../../services/authService";

function Register() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("cliente");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await register({
        email,
        password,
        role
      });

      alert("Conta criada com sucesso");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message || "Erro"
      );

    }

  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card p-4">

            <h2 className="mb-4 text-center">
              Registar
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>

              <div className="mb-4">

                <label className="form-label">
                  Role
                </label>

                <select
                  className="form-control"
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                >

                  <option value="cliente">
                    Cliente
                  </option>

                  <option value="organizador">
                    Organizador
                  </option>

                </select>

              </div>

              <button
                type="submit"
                className="btn btn-dark w-100"
              >
                Criar Conta
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  )

}

export default Register;