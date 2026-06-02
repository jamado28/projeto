import { useEffect, useState } from "react";

import { getUser } from "../../services/authUtils";

import { getPessoas, updatePessoa } from "../../services/pessoaService";

// ÍCONES
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaUsers,
  FaUserEdit,
  FaSave,
} from "react-icons/fa";

function Pessoas() {
  const user = getUser();
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [pessoas, setPessoas] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [nome, setNome] = useState("");

  const [email, setEmail] = useState("");

  const [telemovel, setTelemovel] = useState("");

  const [dataNascimento, setDataNascimento] = useState("");

  useEffect(() => {
    loadPessoas();
  }, []);

  const loadPessoas = async () => {
    try {
      const response = await getPessoas();

      // cliente recebe objeto
      if (user.role === "cliente") {
        setPessoas([response.data]);

        setEditingId(response.data.id_pessoa);

        setNome(response.data.nome || "");

        setEmail(response.data.email || "");

        setTelemovel(response.data.telemovel || "");

        setDataNascimento(response.data.data_nascimento || "");
      } else {
        setPessoas(response.data);
      }
    } catch (error) {
      console.log(error);
      setErro("Não foi possível carregar os utilizadores.");
    }
  };

  const handleEdit = (pessoa) => {
    setEditingId(pessoa.id_pessoa);

    setNome(pessoa.nome || "");

    setEmail(pessoa.email || "");

    setTelemovel(pessoa.telemovel || "");

    setDataNascimento(pessoa.data_nascimento || "");
  };

  const handleSubmit = async (e) => {
    setErro("");
    setSucesso("");
    e.preventDefault();
    if (!nome || !email) {
      setErro("Nome e email são obrigatórios.");
      return;
    }
    if (!email.includes("@")) {
      setErro("Introduza um email válido.");
      return;
    }
    if (telemovel && telemovel.length < 9) {
      setErro("Introduza um telemóvel válido.");
      return;
    }
    try {
      await updatePessoa(editingId, {
        nome,
        email,
        telemovel,
        data_nascimento: dataNascimento,
      });

      setSucesso("Dados atualizados com sucesso.");

      setTimeout(() => {
        setSucesso("");
      }, 4000);

      loadPessoas();

      setEditingId(null);

      setNome("");

      setEmail("");

      setTelemovel("");

      setDataNascimento("");
    } catch (error) {
      console.log(error);

      setErro(
        error.response?.data?.message ||
          "Ocorreu um erro ao atualizar os dados.",
      );
    }
  };

  return (
    <div>
      {/* CLIENTE */}

      {user.role === "cliente" && pessoas.length > 0 && (
        <div
          className="card border-0 shadow-sm p-4"
          style={{
            borderRadius: "24px",
          }}
        >
          {/* TOPO */}

          <div className="mb-4">
            <h2 className="fw-bold d-flex align-items-center gap-2">
              <FaUser color="#df9425" />
              Olá, {pessoas[0].nome}
            </h2>

            <p className="text-muted mb-0">Gerir os seus dados pessoais</p>
          </div>

          {/* FORM */}
          {erro && (
            <div
              className="alert alert-danger border-0 shadow-sm mb-4"
              role="alert"
            >
              {erro}
            </div>
          )}

          {sucesso && (
            <div
              className="alert alert-success border-0 shadow-sm mb-4"
              role="alert"
            >
              {sucesso}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* NOME */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  <FaUser className="me-2" />
                  Nome
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  style={{
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                />
              </div>

              {/* EMAIL */}

              <div className="col-md-6 mb-3">
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

              {/* TELEMOVEL */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  <FaPhone className="me-2" />
                  Telemóvel
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={telemovel}
                  onChange={(e) => setTelemovel(e.target.value)}
                  style={{
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                />
              </div>

              {/* DATA */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  <FaBirthdayCake className="me-2" />
                  Data nascimento
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  style={{
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn mt-3 d-flex align-items-center gap-2"
              style={{
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: "14px",
                padding: "12px 24px",
                fontWeight: "600",
              }}
            >
              <FaSave />
              Guardar alterações
            </button>
          </form>
        </div>
      )}

      {/* ADMIN / ORGANIZADOR */}

      {(user.role === "admin" || user.role === "organizador") && (
        <div>
          {/* TOPO */}

          <div className="mb-4">
            <h2 className="fw-bold d-flex align-items-center gap-2">
              <FaUsers color="#df9425" />
              Pessoas
            </h2>

            <p className="text-muted mb-0">Gerir utilizadores da plataforma</p>
          </div>

          {/* FORM */}

          {editingId && (
            <form
              onSubmit={handleSubmit}
              className="card border-0 shadow-sm p-4 mb-4"
              style={{
                borderRadius: "24px",
              }}
            >
              <h5 className="mb-4 fw-bold d-flex align-items-center gap-2">
                <FaUserEdit color="#df9425" />
                Editar pessoa
              </h5>

              <div className="row">
                {/* NOME */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    <FaUser className="me-2" />
                    Nome
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  />
                </div>

                {/* EMAIL */}

                <div className="col-md-6 mb-3">
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

                {/* TELEMOVEL */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    <FaPhone className="me-2" />
                    Telemóvel
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={telemovel}
                    onChange={(e) => setTelemovel(e.target.value)}
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  />
                </div>

                {/* DATA */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    <FaBirthdayCake className="me-2" />
                    Data nascimento
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn mt-3 d-flex align-items-center gap-2"
                style={{
                  backgroundColor: "#111",
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "12px 24px",
                  fontWeight: "600",
                }}
              >
                <FaSave />
                Atualizar pessoa
              </button>
            </form>
          )}

          {/* TABELA */}

          <div
            className="card border-0 shadow-sm p-4"
            style={{
              borderRadius: "24px",
            }}
          >
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    {user.role === "admin" && <th>ID</th>}

                    <th>Nome</th>

                    <th>Email</th>

                    <th>Telemóvel</th>

                    <th>Data Nascimento</th>

                    <th className="text-center">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {pessoas.map((pessoa) => (
                    <tr key={pessoa.id_pessoa}>
                      {user.role === "admin" && (
                        <td>
                          <span
                            className="badge"
                            style={{
                              backgroundColor: "#111",
                              color: "#fff",
                              borderRadius: "10px",
                              padding: "8px 12px",
                            }}
                          >
                            #{pessoa.id_pessoa}
                          </span>
                        </td>
                      )}

                      <td className="fw-semibold">{pessoa.nome}</td>

                      <td>{pessoa.email}</td>

                      <td>{pessoa.telemovel}</td>

                      <td>
                        {new Date(pessoa.data_nascimento).toLocaleDateString(
                          "pt-PT",
                        )}
                      </td>

                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-sm"
                            onClick={() => handleEdit(pessoa)}
                            style={{
                              backgroundColor: "#df9425",
                              color: "#111",
                              borderRadius: "10px",
                              width: "42px",
                              height: "42px",
                            }}
                          >
                            <FaUserEdit />
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
      )}
    </div>
  );
}

export default Pessoas;
