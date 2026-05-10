import { useEffect, useState } from "react";

import { getUsers, updateUser, deleteUser } from "../../services/authService";

// ÍCONES
import {
  FaUsers,
  FaUserShield,
  FaUserEdit,
  FaTrashAlt,
  FaEnvelope,
  FaLock,
  FaUserTag,
} from "react-icons/fa";

function Users() {
  const [users, setUsers] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("cliente");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();

      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);

    setEmail(user.email);

    setRole(user.role);

    setPassword("");

    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(editingId, {
        email,
        password,
        role,
      });

      alert("Utilizador atualizado");

      loadUsers();

      setShowForm(false);

      setEditingId(null);

      setEmail("");

      setPassword("");

      setRole("cliente");
    } catch (error) {
      console.log(error);

      alert("Erro ao atualizar");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem a certeza?");

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteUser(id);

      alert("Utilizador eliminado");

      loadUsers();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Erro");
    }
  };

  return (
    <div>
      {/* TOPO */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold d-flex align-items-center gap-2">
            <FaUsers color="#df9425" />
            Utilizadores
          </h2>

          <p className="text-muted mb-0">Gerir contas do sistema</p>
        </div>
      </div>

      {/* FORM */}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="card border-0 shadow-sm p-4 mb-4"
          style={{
            borderRadius: "20px",
          }}
        >
          <h5 className="mb-4 fw-bold d-flex align-items-center gap-2">
            <FaUserEdit color="#df9425" />
            Editar utilizador
          </h5>

          <div className="row">
            {/* EMAIL */}

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">
                <FaEnvelope className="me-2" />
                Email
              </label>

              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderRadius: "12px",
                  padding: "12px",
                }}
              />
            </div>

            {/* PASSWORD */}

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">
                <FaLock className="me-2" />
                Password
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Nova password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  borderRadius: "12px",
                  padding: "12px",
                }}
              />
            </div>

            {/* ROLE */}

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">
                <FaUserTag className="me-2" />
                Role
              </label>

              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  borderRadius: "12px",
                  padding: "12px",
                }}
              >
                <option value="cliente">Cliente</option>

                <option value="organizador">Organizador</option>

                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="d-flex gap-2 mt-3">
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: "12px",
                padding: "12px 24px",
                fontWeight: "600",
              }}
            >
              Atualizar
            </button>

            <button
              type="button"
              className="btn btn-light"
              onClick={() => setShowForm(false)}
              style={{
                borderRadius: "12px",
                padding: "12px 24px",
                fontWeight: "600",
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* TABELA */}

      <div
        className="card border-0 shadow-sm p-4"
        style={{
          borderRadius: "20px",
        }}
      >
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Email</th>

                <th>Role</th>

                <th>Criado em</th>

                <th className="text-center">Ações</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  {/* EMAIL */}

                  <td className="fw-semibold">{user.email}</td>

                  {/* ROLE */}

                  <td>
                    <span
                      className="badge d-inline-flex align-items-center gap-2"
                      style={{
                        backgroundColor: "#111",
                        color: "#fff",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        fontSize: "0.85rem",
                      }}
                    >
                      <FaUserShield />

                      {user.role}
                    </span>
                  </td>

                  {/* DATA */}

                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                  {/* AÇÕES */}

                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-sm"
                        onClick={() => handleEdit(user)}
                        style={{
                          backgroundColor: "#df9425",
                          color: "#111",
                          borderRadius: "10px",
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        <FaUserEdit />
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user.id)}
                        style={{
                          borderRadius: "10px",
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
