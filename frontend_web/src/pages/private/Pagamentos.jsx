import { useEffect, useState } from "react";
import { getUser } from "../../services/authUtils";
import {
  getPagamentos,
  createPagamento,
  deletePagamento
} from "../../services/pagamentoService";
import { getBilhetes } from "../../services/bilheteService";

function Pagamentos() {

  const user = getUser();
  const [pagamentos, setPagamentos] = useState([]);
  const [bilhetes, setBilhetes] = useState([]);
  const [iban, setIban] = useState("");
  const [estado, setEstado] = useState(true);
  const [idBilhete, setIdBilhete] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {

    loadPagamentos();

    loadBilhetes();
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

    }

  };

  const loadBilhetes = async () => {

    try {

      const response = await getBilhetes();

      setBilhetes(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      await createPagamento({
        iban,
        estado: true,
        id_bilhete: idBilhete
      });
      alert("Pagamento criado");
      loadPagamentos();
      setIban("");
      setIdBilhete("");
      localStorage.removeItem(
        "bilhetePagamento"
      );

      setShowForm(false);
    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message || "Erro"
      );

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Tem a certeza?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await deletePagamento(id);

      alert("Pagamento apagado");

      loadPagamentos();

    } catch (error) {

      console.log(error);

      alert("Erro ao apagar");

    }

  };

  return (
    <div>
      {/* CLIENTE */}
      {user.role === "cliente" && (
        <div>
          {/* TOPO */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2>
                Pagamentos
              </h2>
              <p className="text-muted">
                Gerir os seus pagamentos
              </p>
            </div>

            <button
              className="btn btn-danger"
              onClick={() =>
                setShowForm(!showForm)
              }
            >
              + Criar pagamento
            </button>

          </div>

          {/* FORM */}

          {showForm && (

            <form
              onSubmit={handleSubmit}
              className="card p-4 mb-4 shadow-sm"
            >

              <h5 className="mb-4">
                Criar novo pagamento
              </h5>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    IBAN
                  </label>

                  <input
                    type="text"
                    placeholder="PT50..."
                    className="form-control"
                    value={iban}
                    onChange={(e) =>
                      setIban(e.target.value)
                    }
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Bilhete
                  </label>

                  <select
                    className="form-control"
                    value={idBilhete}
                    onChange={(e) =>
                      setIdBilhete(e.target.value)
                    }
                  >

                    <option value="">
                      Escolher bilhete
                    </option>

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
                className="btn btn-danger"
              >
                Criar pagamento
              </button>

            </form>

          )}

          {/* LISTA */}

          <div className="row">

            {pagamentos.map((pagamento) => (

              <div
                key={pagamento.id_pagamento}
                className="col-md-6 mb-4"
              >

                <div className="card shadow-sm h-100">

                  <div className="card-body">

                    <div className="d-flex justify-content-between align-items-start mb-3">

                      <div>

                        <h5>
                          {pagamento.bilhete?.evento?.nome}
                        </h5>

                        <p className="text-muted">
                          {pagamento.bilhete?.evento?.nome}
                        </p>

                      </div>

                      <span
                        className={`badge ${
                          pagamento.estado
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >

                        {pagamento.estado
                          ? "Pago"
                          : "Pendente"}

                      </span>

                    </div>

                    <p>

                      <strong>IBAN:</strong>
                      {" "}
                      {pagamento.iban}

                    </p>

                    <p>

                      <strong>Preço:</strong>
                      {" "}
                      {pagamento.preco}€

                    </p>

                    <p>

                      <strong>Data pagamento:</strong>
                      {" "}

                      {new Date(
                        pagamento.createdAt
                      ).toLocaleDateString()}

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

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h2>
                Todos os pagamentos
              </h2>

              <p className="text-muted">
                Gerir todos os pagamentos da plataforma
              </p>

            </div>

          </div>

          {/* TABELA */}

          <div className="card shadow-sm border-0 p-4">

            <div className="table-responsive">

              <table className="table align-middle">

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Bilhete</th>

                    <th>Evento</th>

                    <th>Preço</th>

                    <th>Estado</th>

                    <th>Ações</th>

                  </tr>

                </thead>

                <tbody>

                  {pagamentos.map((pagamento) => (

                    <tr key={pagamento.id_pagamento}>

                      <td>
                        #{pagamento.id_pagamento}
                      </td>

                      <td>
                        #{pagamento.id_bilhete}
                      </td>

                      <td>
                        {pagamento.bilhete?.evento?.nome}
                      </td>

                      <td>
                        {pagamento.preco}€
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            pagamento.estado
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >

                          {pagamento.estado
                            ? "Pago"
                            : "Pendente"}

                        </span>

                      </td>

                      <td>

                        <div className="d-flex gap-2">

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDelete(
                                pagamento.id_pagamento
                              )
                            }
                          >
                            🗑️
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

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h2>
                Pagamentos dos seus eventos
              </h2>

              <p className="text-muted">
                Consultar pagamentos associados aos seus eventos
              </p>

            </div>

          </div>

          {/* TABELA */}

          <div className="card shadow-sm border-0 p-4">

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

                  {pagamentos.map((pagamento) => (

                    <tr key={pagamento.id_pagamento}>

                      <td>
                        #{pagamento.id_pagamento}
                      </td>

                      <td>
                        #{pagamento.id_bilhete}
                      </td>

                      <td>
                        {pagamento.bilhete?.evento?.nome}
                      </td>

                      <td>
                        {pagamento.preco}€
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            pagamento.estado
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >

                          {pagamento.estado
                            ? "Pago"
                            : "Pendente"}

                        </span>

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

  )

}

export default Pagamentos;