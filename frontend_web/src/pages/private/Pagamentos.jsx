import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

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

  useEffect(() => {

    loadPagamentos();

    loadBilhetes();

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
        estado,
        id_bilhete: idBilhete
      });

      alert("Pagamento criado");

      loadPagamentos();

      setIban("");

      setIdBilhete("");

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

    <AdminLayout>

      <h1 className="mb-4">
        Pagamentos
      </h1>

      {user.role === "cliente" && (

        <form
          onSubmit={handleSubmit}
          className="card p-4 mb-4"
        >

          <h4 className="mb-3">
            Criar Pagamento
          </h4>

          <div className="row">

            <div className="col-md-6 mb-3">

              <input
                type="text"
                placeholder="IBAN"
                className="form-control"
                value={iban}
                onChange={(e) =>
                  setIban(e.target.value)
                }
              />

            </div>

            <div className="col-md-6 mb-3">

              <select
                className="form-control"
                value={idBilhete}
                onChange={(e) =>
                  setIdBilhete(e.target.value)
                }
              >

                <option value="">
                  Escolher Bilhete
                </option>

                {bilhetes.map((bilhete) => (

                  <option
                    key={bilhete.id_bilhete}
                    value={bilhete.id_bilhete}
                  >
                    Bilhete #{bilhete.id_bilhete}
                  </option>

                ))}

              </select>

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-dark"
          >
            Criar Pagamento
          </button>

        </form>

      )}

      <table className="table table-dark table-striped">

        <thead>

          <tr>

            <th>ID</th>

            <th>IBAN</th>

            <th>Preço</th>

            <th>Estado</th>

            <th>Bilhete</th>

            {user.role === "admin" && (
              <th>Ações</th>
            )}

          </tr>

        </thead>

        <tbody>

          {pagamentos.map((pagamento) => (

            <tr key={pagamento.id_pagamento}>

              <td>
                {pagamento.id_pagamento}
              </td>

              <td>
                {pagamento.iban}
              </td>

              <td>
                {pagamento.preco}€
              </td>

              <td>
                {pagamento.estado
                  ? "Pago"
                  : "Pendente"}
              </td>

              <td>
                #{pagamento.id_bilhete}
              </td>

              {user.role === "admin" && (

                <td>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(
                        pagamento.id_pagamento
                      )
                    }
                  >
                    Apagar
                  </button>

                </td>

              )}

            </tr>

          ))}

        </tbody>

      </table>

    </AdminLayout>

  )

}

export default Pagamentos;