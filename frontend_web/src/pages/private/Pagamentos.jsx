import { useEffect, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import {
  getPagamentos,
  createPagamento,
  deletePagamento,
} from "../../services/pagamentoService";

import { getBilhetes } from "../../services/bilheteService";

// ÍCONES
import {
  FaCreditCard,
  FaPlus,
  FaTrashAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaTicketAlt,
  FaUniversity,
} from "react-icons/fa";
import { useBilhetes } from "../../hooks/useBilhetes";
function Pagamentos() {
  const { user, role, isAuthenticated } = useAuth();
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pagamentoToDelete, setPagamentoToDelete] = useState(null);
  const [pagamentos, setPagamentos] = useState([]);

  const { bilhetes, loadBilhetes } = useBilhetes();

  const [iban, setIban] = useState("");

  const [idBilhete, setIdBilhete] = useState("");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadPagamentos();

    const bilheteGuardado = localStorage.getItem("bilhetePagamento");

    if (bilheteGuardado) {
      setIdBilhete(bilheteGuardado);

      setShowForm(true);
    }
  }, []);

  const loadPagamentos = async () => {
    try {
      const response = await getPagamentos();

      setPagamentos(response.data);
    } catch (error) {
      console.log(error);

      setErro("Não foi possível carregar os pagamentos.");
    }
  };

  const handleSubmit = async (e) => {
    setErro("");
    setSucesso("");
    e.preventDefault();
    if (!iban.trim()) {
      setErro("Introduza o IBAN.");
      return;
    }

    if (!iban.startsWith("PT50")) {
      setErro("O IBAN deve começar por PT50.");
      return;
    }

    if (iban.replace(/\s/g, "").length < 25) {
      setErro("Introduza um IBAN válido.");
      return;
    }
    try {
      await createPagamento({
        iban,
        estado: true,
        id_bilhete: idBilhete,
      });

      setSucesso("Pagamento criado com sucesso.");

      setTimeout(() => {
        setSucesso("");
      }, 4000);

      loadPagamentos();

      setIban("");

      setIdBilhete("");

      localStorage.removeItem("bilhetePagamento");

      setShowForm(false);
    } catch (error) {
      console.log(error);

      setErro(
        error.response?.data?.message ||
          "Ocorreu um erro ao criar o pagamento.",
      );
    }
  };

  const handleDelete = (id) => {
    setPagamentoToDelete(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    try {
      await deletePagamento(pagamentoToDelete);

      setSucesso("Pagamento eliminado com sucesso.");

      loadPagamentos();
    } catch (error) {
      setErro("Erro ao eliminar pagamento.");
    }

    setShowDeleteModal(false);
    setPagamentoToDelete(null);
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
                <FaCreditCard color="#df9425" />
                Pagamentos
              </h2>

              <p className="text-muted mb-0">Gerir os seus pagamentos</p>
            </div>

            <button
              className="btn d-flex align-items-center gap-2"
              aria-label="Criar pagamento"
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
              Criar pagamento
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
              <h5 className="mb-4 fw-bold">Novo pagamento</h5>

              <div className="row">
                {/* IBAN */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    <FaUniversity className="me-2" />
                    IBAN
                  </label>

                  <input
                    type="text"
                    placeholder="PT50..."
                    className="form-control"
                    aria-label="IBAN"
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  />
                </div>

                {/* BILHETE */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">
                    <FaTicketAlt className="me-2" />
                    Bilhete
                  </label>

                  <select
                    className="form-control"
                    aria-label="Bilhete"
                    value={idBilhete}
                    onChange={(e) => setIdBilhete(e.target.value)}
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  >
                    <option value="">Escolher bilhete</option>

                    {bilhetes.map((bilhete) => (
                      <option
                        key={bilhete.id_bilhete}
                        value={bilhete.id_bilhete}
                      >
                        #{bilhete.id_bilhete}
                        {" - "}
                        {bilhete.evento?.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                aria-label="Criar pagamento"
                className="btn mt-3"
                style={{
                  backgroundColor: "#df9425",
                  color: "#111",
                  borderRadius: "14px",
                  padding: "12px 24px",
                  fontWeight: "700",
                }}
              >
                Criar pagamento
              </button>
            </form>
          )}

          {/* LISTA */}

          <div className="row">
            {pagamentos.map((pagamento) => (
              <div key={pagamento.id_pagamento} className="col-lg-6 mb-4">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "22px",
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div>
                        <h5 className="fw-bold">
                          {pagamento.bilhete?.evento?.nome}
                        </h5>

                        <p className="text-muted mb-0">
                          Bilhete #{pagamento.id_bilhete}
                        </p>
                      </div>

                      <span
                        className={`badge d-flex align-items-center gap-2 ${
                          pagamento.estado
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                        style={{
                          padding: "10px 14px",
                          borderRadius: "10px",
                        }}
                      >
                        {pagamento.estado ? <FaCheckCircle /> : <FaClock />}

                        {pagamento.estado ? "Pago" : "Pendente"}
                      </span>
                    </div>

                    <p>
                      <strong>IBAN:</strong> {pagamento.iban}
                    </p>

                    <p>
                      <strong>Preço:</strong> {pagamento.preco}€
                    </p>

                    <p className="mb-0">
                      <strong>Data:</strong>{" "}
                      {new Date(pagamento.createdAt).toLocaleDateString()}
                    </p>
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
          {/* TOPO */}

          <div className="mb-4">
            <h2 className="fw-bold d-flex align-items-center gap-2">
              <FaMoneyBillWave color="#df9425" />
              Todos os pagamentos
            </h2>

            <p className="text-muted mb-0">
              Gerir todos os pagamentos da plataforma
            </p>
          </div>

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
                    <th>ID</th>

                    <th>Bilhete</th>

                    <th>Evento</th>

                    <th>Preço</th>

                    <th>Estado</th>

                    <th className="text-center">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {pagamentos.map((pagamento) => (
                    <tr key={pagamento.id_pagamento}>
                      <td>#{pagamento.id_pagamento}</td>

                      <td>#{pagamento.id_bilhete}</td>

                      <td>{pagamento.bilhete?.evento?.nome}</td>

                      <td>{pagamento.preco}€</td>

                      <td>
                        <span
                          className={`badge ${
                            pagamento.estado
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                          style={{
                            borderRadius: "10px",
                            padding: "8px 12px",
                          }}
                        >
                          {pagamento.estado ? "Pago" : "Pendente"}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-danger btn-sm"
                            aria-label={
                              "Eliminar pagamento #" + pagamento.id_pagamento
                            }
                            onClick={() => handleDelete(pagamento.id_pagamento)}
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
      )}

      {/* ORGANIZADOR */}

      {user.role === "organizador" && (
        <div>
          {/* TOPO */}

          <div className="mb-4">
            <h2 className="fw-bold d-flex align-items-center gap-2">
              <FaMoneyBillWave color="#df9425" />
              Pagamentos dos seus eventos
            </h2>

            <p className="text-muted mb-0">
              Consultar pagamentos associados aos seus eventos
            </p>
          </div>

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
                    <th>ID</th>

                    <th>Bilhete</th>

                    <th>Evento</th>

                    <th>Preço</th>

                    <th>Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {pagamentos.length === 0 ? (
                    <tr>
                      <td colSpan="999" className="text-center py-4">
                        Não existem pagamentos.
                      </td>
                    </tr>
                  ) : (
                    pagamentos.map((pagamento) => (
                      <tr key={pagamento.id_pagamento}>
                        <td>#{pagamento.id_pagamento}</td>

                        <td>#{pagamento.id_bilhete}</td>

                        <td>{pagamento.bilhete?.evento?.nome}</td>

                        <td>{pagamento.preco}€</td>

                        <td>
                          <span
                            className={`badge ${
                              pagamento.estado
                                ? "bg-success"
                                : "bg-warning text-dark"
                            }`}
                            style={{
                              borderRadius: "10px",
                              padding: "8px 12px",
                            }}
                          >
                            {pagamento.estado ? "Pago" : "Pendente"}
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
        title="Eliminar pagamento"
        message="Tem a certeza que pretende eliminar este pagamento? Esta ação não pode ser revertida."
        onConfirm={confirmDelete}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
}

export default Pagamentos;
