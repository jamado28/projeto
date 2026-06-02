import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import {
  getBilhetes,
  createBilhete,
  deleteBilhete,
} from "../../services/bilheteService";

import { getEventos } from "../../services/eventService";
import { useEventos } from "../../hooks/useEventos";
import { getCarros } from "../../services/carroService";
import { useBilhetes } from "../../hooks/useBilhetes";
import { useNavigate } from "react-router-dom";

// ÍCONES
import {
  FaTicketAlt,
  FaPlus,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCarSide,
  FaTrashAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useCarros } from "../../hooks/useCarros";

function Bilhetes({ setSection }) {
  const { user, role, isAuthenticated } = useAuth();
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bilheteToDelete, setBilheteToDelete] = useState(null);
  const navigate = useNavigate();

  const { bilhetes, loadBilhetes } = useBilhetes();

  const { eventos } = useEventos();
  const { carros } = useCarros();

  const [idEvento, setIdEvento] = useState("");

  const [tipo, setTipo] = useState("visitante");

  const [matriculaCarro, setMatriculaCarro] = useState("");

  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    const eventoGuardado = localStorage.getItem("eventoBilhete");

    if (eventoGuardado) {
      setIdEvento(eventoGuardado);

      setShowForm(true);

      localStorage.removeItem("eventoBilhete");
    }
  }, []);

  const handleSubmit = async (e) => {
    setErro("");
    setSucesso("");
    if (!idEvento) {
      setErro("Selecione um evento.");
      return;
    }
    if (tipo === "participante" && !matriculaCarro) {
      setErro("Selecione um veículo.");
      return;
    }
    e.preventDefault();

    try {
      await createBilhete({
        id_evento: idEvento,
        tipo,
        matricula_carro: tipo === "participante" ? matriculaCarro : null,
      });

      setSucesso("Bilhete criado com sucesso.");

      setTimeout(() => {
        setSucesso("");
      }, 4000);

      loadBilhetes();

      setIdEvento("");

      setTipo("visitante");

      setMatriculaCarro("");

      setShowForm(false);
    } catch (error) {
      console.log(error);

      setErro(error.response?.data?.message || "Erro ao criar bilhete.");
    }
  };

  const handleDelete = (id) => {
    setBilheteToDelete(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    try {
      await deleteBilhete(bilheteToDelete);

      setSucesso("Bilhete eliminado com sucesso.");

      loadBilhetes();
    } catch (error) {
      setErro("Erro ao eliminar bilhete.");
    }

    setShowDeleteModal(false);
    setBilheteToDelete(null);
  };

  const handlePagar = (idBilhete) => {
    localStorage.setItem("bilhetePagamento", idBilhete);

    setSection("pagamentos");
  };

  return (
    <div>
      {/* CLIENTE */}

      {user.role === "cliente" && (
        <div>
          {/* TOPO */}

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold d-flex align-items-center gap-2">
                <FaTicketAlt color="#df9425" />
                Bilhetes
              </h2>

              <p className="text-muted mb-0">Gerir os seus bilhetes</p>
            </div>

            <button
              aria-label="Comprar bilhete"
              className="btn d-flex align-items-center gap-2"
              onClick={() => setShowForm(!showForm)}
              style={{
                backgroundColor: "#111",
                color: "#fff",
                borderRadius: "14px",
                padding: "12px 20px",
                fontWeight: "600",
              }}
            >
              <FaPlus />
              Comprar bilhete
            </button>
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
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="card border-0 shadow-sm p-4 mb-4"
              style={{
                borderRadius: "24px",
              }}
            >
              <h5 className="fw-bold mb-4">Comprar bilhete</h5>

              <div className="row">
                {/* EVENTO */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold" aria-label="Evento">
                    Evento
                  </label>

                  <select
                    className="form-control"
                    aria-label="Evento"
                    value={idEvento}
                    onChange={(e) => setIdEvento(e.target.value)}
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  >
                    <option value="">Escolher evento</option>

                    {eventos.map((evento) => (
                      <option key={evento.id_evento} value={evento.id_evento}>
                        {evento.nome}
                      </option>
                    ))}
                  </select>
                </div>

                {/* TIPO */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Tipo</label>

                  <select
                    className="form-control"
                    aria-label="Tipo de bilhete"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  >
                    <option value="visitante">Visitante</option>

                    <option value="participante">Participante</option>
                  </select>
                </div>

                {/* CARRO */}

                {tipo === "participante" && (
                  <div className="col-md-12 mb-3">
                    <label className="form-label fw-semibold">
                      <FaCarSide className="me-2" />
                      Carro
                    </label>

                    <select
                      className="form-control"
                      aria-label="Carro"
                      value={matriculaCarro}
                      onChange={(e) => setMatriculaCarro(e.target.value)}
                      style={{
                        borderRadius: "12px",
                        padding: "12px",
                      }}
                    >
                      <option value="">Escolher carro</option>

                      {carros.map((carro) => (
                        <option key={carro.matricula} value={carro.matricula}>
                          {carro.matricula}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <button
                type="submit"
                aria-label="Comprar bilhete"
                className="btn"
                style={{
                  backgroundColor: "#df9425",
                  color: "#111",
                  borderRadius: "14px",
                  padding: "12px 24px",
                  fontWeight: "700",
                }}
              >
                Comprar bilhete
              </button>
            </form>
          )}

          {/* LISTA */}

          <div className="row">
            {bilhetes.map((bilhete) => (
              <div key={bilhete.id_bilhete} className="col-lg-6 mb-4">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "22px",
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div>
                        <h5 className="fw-bold">{bilhete.evento?.nome}</h5>

                        <p className="text-muted mb-1">
                          <FaMapMarkerAlt className="me-2" />

                          {bilhete.evento?.local_evento}
                        </p>

                        <p className="text-muted mb-0">
                          <FaCalendarAlt className="me-2" />

                          {new Date(bilhete.evento?.data).toLocaleDateString(
                            "pt-PT",
                          )}
                        </p>
                      </div>

                      <span
                        className={`badge ${
                          bilhete.tipo === "participante"
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                        style={{
                          borderRadius: "10px",
                          padding: "10px 14px",
                        }}
                      >
                        {bilhete.tipo}
                      </span>
                    </div>

                    <p>
                      <strong>Carro:</strong> {bilhete.matricula_carro || "-"}
                    </p>

                    <p>
                      <strong>Estado:</strong>{" "}
                      {bilhete.pagamento ? (
                        <span className="text-success">
                          <FaCheckCircle className="me-2" />
                          Pago
                        </span>
                      ) : (
                        <span className="text-danger">
                          <FaTimesCircle className="me-2" />
                          Não pago
                        </span>
                      )}
                    </p>

                    <div className="d-flex gap-2 mt-4">
                      {!bilhete.pagamento && (
                        <button
                          aria-label={"Pagar bilhete " + bilhete.evento?.nome}
                          className="btn btn-success btn-sm d-flex align-items-center gap-2"
                          onClick={() => handlePagar(bilhete.id_bilhete)}
                          style={{
                            borderRadius: "12px",
                            padding: "10px 16px",
                          }}
                        >
                          <FaMoneyBillWave />
                          Pagar
                        </button>
                      )}

                      <button
                        aria-label={"Eliminar bilhete " + bilhete.evento?.nome}
                        className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
                        onClick={() => handleDelete(bilhete.id_bilhete)}
                        style={{
                          borderRadius: "12px",
                          padding: "10px 16px",
                        }}
                      >
                        <FaTrashAlt />
                        Apagar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADMIN */}

      {user.role === "admin" && (
        <div>
          <div className="mb-4">
            <h2 className="fw-bold d-flex align-items-center gap-2">
              <FaTicketAlt color="#df9425" />
              Todos os bilhetes
            </h2>

            <p className="text-muted mb-0">
              Gerir todos os bilhetes da plataforma
            </p>
          </div>

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
                    <th>ID</th>

                    <th>Evento</th>

                    <th>Tipo</th>

                    <th>Carro</th>

                    <th>Estado</th>

                    <th className="text-center">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {bilhetes.map((bilhete) => (
                    <tr key={bilhete.id_bilhete}>
                      <td>#{bilhete.id_bilhete}</td>

                      <td>{bilhete.evento?.nome}</td>

                      <td>
                        <span
                          className={`badge ${
                            bilhete.tipo === "participante"
                              ? "bg-primary"
                              : "bg-secondary"
                          }`}
                        >
                          {bilhete.tipo}
                        </span>
                      </td>

                      <td>{bilhete.matricula_carro || "-"}</td>

                      <td>
                        <span
                          className={`badge ${
                            bilhete.pagamento ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {bilhete.pagamento ? "Pago" : "Não pago"}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            aria-label={"Pagar bilhete " + bilhete.evento?.nome}
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(bilhete.id_bilhete)}
                            style={{
                              borderRadius: "10px",
                              width: "42px",
                              height: "42px",
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
      )}

      {/* ORGANIZADOR */}

      {user.role === "organizador" && (
        <div>
          <div className="mb-4">
            <h2 className="fw-bold d-flex align-items-center gap-2">
              <FaTicketAlt color="#df9425" />
              Bilhetes dos seus eventos
            </h2>

            <p className="text-muted mb-0">
              Consultar bilhetes associados aos seus eventos
            </p>
          </div>

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
                    <th>ID</th>

                    <th>Evento</th>

                    <th>Tipo</th>

                    <th>Carro</th>

                    <th>Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {bilhetes.length === 0 ? (
                    <tr>
                      <td colSpan="999" className="text-center py-4">
                        Não existem bilhetes.
                      </td>
                    </tr>
                  ) : (
                    bilhetes.map((bilhete) => (
                      <tr key={bilhete.id_bilhete}>
                        <td>#{bilhete.id_bilhete}</td>

                        <td>{bilhete.evento?.nome}</td>

                        <td>
                          <span
                            className={`badge ${
                              bilhete.tipo === "participante"
                                ? "bg-primary"
                                : "bg-secondary"
                            }`}
                          >
                            {bilhete.tipo}
                          </span>
                        </td>

                        <td>{bilhete.matricula_carro || "-"}</td>

                        <td>
                          <span
                            className={`badge ${
                              bilhete.pagamento ? "bg-success" : "bg-danger"
                            }`}
                          >
                            {bilhete.pagamento ? "Pago" : "Não pago"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <ConfirmDeleteModal
        show={showDeleteModal}
        title="Eliminar bilhete"
        message="Tem a certeza que pretende eliminar este bilhete? Esta ação não pode ser revertida."
        onConfirm={confirmDelete}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
}

export default Bilhetes;
