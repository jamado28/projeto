import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getUser } from "../../services/authUtils";

import {
  getBilhetes,
  createBilhete,
  deleteBilhete
} from "../../services/bilheteService";

import { getEventos } from "../../services/eventService";

import { getCarros } from "../../services/carroService";

function Bilhetes() {

  const user = getUser();

  const [bilhetes, setBilhetes] = useState([]);

  const [eventos, setEventos] = useState([]);

  const [carros, setCarros] = useState([]);

  const [anoBilhete, setAnoBilhete] = useState("");

  const [idEvento, setIdEvento] = useState("");

  const [tipo, setTipo] = useState("visitante");

  const [matriculaCarro, setMatriculaCarro] = useState("");

  useEffect(() => {

    loadBilhetes();

    loadEventos();

    loadCarros();

  }, []);

  const loadBilhetes = async () => {

    try {

      const response = await getBilhetes();

      setBilhetes(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const loadEventos = async () => {

    try {

      const response = await getEventos();

      setEventos(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const loadCarros = async () => {

    try {

      const response = await getCarros();

      setCarros(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createBilhete({
        ano_bilhete: anoBilhete,
        id_evento: idEvento,
        tipo,
        matricula_carro:
          tipo === "participante"
            ? matriculaCarro
            : null
      });

      alert("Bilhete criado");

      loadBilhetes();

      setAnoBilhete("");
      setIdEvento("");
      setTipo("visitante");
      setMatriculaCarro("");

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

      await deleteBilhete(id);

      alert("Bilhete apagado");

      loadBilhetes();

    } catch (error) {

      console.log(error);

      alert("Erro ao apagar");

    }

  };

  return (

    <AdminLayout>

      <h1 className="mb-4">
        Bilhetes
      </h1>

      {user.role === "cliente" && (

        <form
          onSubmit={handleSubmit}
          className="card p-4 mb-4"
        >

          <h4 className="mb-3">
            Criar Bilhete
          </h4>

          <div className="row">

            <div className="col-md-3 mb-3">

              <input
                type="number"
                placeholder="Ano"
                className="form-control"
                value={anoBilhete}
                onChange={(e) =>
                  setAnoBilhete(e.target.value)
                }
              />

            </div>

            <div className="col-md-3 mb-3">

              <select
                className="form-control"
                value={idEvento}
                onChange={(e) =>
                  setIdEvento(e.target.value)
                }
              >

                <option value="">
                  Escolher Evento
                </option>

                {eventos.map((evento) => (

                  <option
                    key={evento.id_evento}
                    value={evento.id_evento}
                  >
                    {evento.nome}
                  </option>

                ))}

              </select>

            </div>

            <div className="col-md-3 mb-3">

              <select
                className="form-control"
                value={tipo}
                onChange={(e) =>
                  setTipo(e.target.value)
                }
              >

                <option value="visitante">
                  Visitante
                </option>

                <option value="participante">
                  Participante
                </option>

              </select>

            </div>

            {tipo === "participante" && (

              <div className="col-md-3 mb-3">

                <select
                  className="form-control"
                  value={matriculaCarro}
                  onChange={(e) =>
                    setMatriculaCarro(e.target.value)
                  }
                >

                  <option value="">
                    Escolher Carro
                  </option>

                  {carros.map((carro) => (

                    <option
                      key={carro.matricula}
                      value={carro.matricula}
                    >
                      {carro.matricula}
                    </option>

                  ))}

                </select>

              </div>

            )}

          </div>

          <button
            type="submit"
            className="btn btn-dark"
          >
            Criar Bilhete
          </button>

        </form>

      )}

      <table className="table table-dark table-striped">

        <thead>

          <tr>

            <th>ID</th>

            <th>Evento</th>

            <th>Tipo</th>

            <th>Carro</th>

            {(user.role === "cliente" ||
              user.role === "admin") && (
              <th>Ações</th>
            )}

          </tr>

        </thead>

        <tbody>

          {bilhetes.map((bilhete) => (

            <tr key={bilhete.id_bilhete}>

              <td>{bilhete.id_bilhete}</td>

              <td>
                {bilhete.evento?.nome}
              </td>

              <td>{bilhete.tipo}</td>

              <td>
                {bilhete.matricula_carro || "-"}
              </td>

              {(user.role === "cliente" ||
                user.role === "admin") && (

                <td>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(bilhete.id_bilhete)
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

export default Bilhetes;