import { useEffect, useState } from "react";
import { getUser } from "../../services/authUtils";
import {
  getBilhetes,
  createBilhete,
  deleteBilhete
} from "../../services/bilheteService";
import { getEventos } from "../../services/eventService";
import { getCarros } from "../../services/carroService";
import { useNavigate } from "react-router-dom";

function Bilhetes({ setSection }) {

  const user = getUser();
  const navigate = useNavigate();
  const [bilhetes, setBilhetes] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [carros, setCarros] = useState([]);
  const [idEvento, setIdEvento] = useState("");
  const [tipo, setTipo] = useState("visitante");
  const [matriculaCarro, setMatriculaCarro] = useState("");
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {

    loadBilhetes();

    loadEventos();

    loadCarros();

    const eventoGuardado = localStorage.getItem("eventoBilhete");

    if (eventoGuardado) {

      setIdEvento(eventoGuardado);

      setShowForm(true);

      localStorage.removeItem(
        "eventoBilhete"
      );

    }
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
        id_evento: idEvento,
        tipo,
        matricula_carro:
          tipo === "participante"
            ? matriculaCarro
            : null
      });

      alert("Bilhete criado");

      loadBilhetes();
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

  const handlePagar = (idBilhete) => {

    localStorage.setItem(
      "bilhetePagamento",
      idBilhete
    );

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

              <h2>
                Bilhetes
              </h2>

              <p className="text-muted">
                Gerir os seus bilhetes
              </p>

            </div>

            <button
              className="btn btn-danger"
              onClick={() =>
                setShowForm(!showForm)
              }
            >
              + Comprar bilhete
            </button>

          </div>

          {/* FORM */}

          {showForm && (

            <form
              onSubmit={handleSubmit}
              className="card p-4 mb-4 shadow-sm"
            >

              <h5 className="mb-4">
                Comprar bilhete
              </h5>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Evento
                  </label>

                  <select
                    className="form-control"
                    value={idEvento}
                    onChange={(e) =>
                      setIdEvento(e.target.value)
                    }
                  >

                    <option value="">
                      Escolher evento
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

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Tipo
                  </label>

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

                  <div className="col-md-12 mb-3">

                    <label className="form-label">
                      Carro
                    </label>

                    <select
                      className="form-control"
                      value={matriculaCarro}
                      onChange={(e) =>
                        setMatriculaCarro(e.target.value)
                      }
                    >

                      <option value="">
                        Escolher carro
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
                className="btn btn-danger"
              >
                Comprar bilhete
              </button>

            </form>

          )}

          {/* LISTA */}

          <div className="row">

            {bilhetes.map((bilhete) => (

              <div
                key={bilhete.id_bilhete}
                className="col-md-6 mb-4"
              >

                <div className="card shadow-sm h-100">

                  <div className="card-body">

                    <div className="d-flex justify-content-between align-items-start mb-3">

                      <div>

                        <h5>
                          {bilhete.evento?.nome}
                        </h5>

                        <p className="text-muted mb-1">
                          📍 {bilhete.evento?.local_evento}
                        </p>

                        <p className="text-muted">
                          📅 {bilhete.evento?.data}
                        </p>

                      </div>

                      <span
                        className={`badge ${
                          bilhete.tipo === "participante"
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                      >

                        {bilhete.tipo}

                      </span>

                    </div>

                    <p>

                      <strong>Carro:</strong>{" "}

                      {bilhete.matricula_carro || "-"}

                    </p>

                    <p>

                      <strong>Estado:</strong>{" "}

                      {bilhete.pagamento
                        ? "Pago"
                        : "Não pago"}

                    </p>

                    <div className="d-flex gap-2 mt-3">

                      {!bilhete.pagamento && (

                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            handlePagar(bilhete.id_bilhete)
                          }
                        >
                          Pagar
                        </button>

                      )}

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          handleDelete(
                            bilhete.id_bilhete
                          )
                        }
                      >
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

          {/* TOPO */}

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h2>
                Todos os bilhetes
              </h2>

              <p className="text-muted">
                Gerir todos os bilhetes da plataforma
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

                    <th>Evento</th>

                    <th>Tipo</th>

                    <th>Carro</th>

                    <th>Estado</th>

                    <th>Ações</th>

                  </tr>

                </thead>

                <tbody>

                  {bilhetes.map((bilhete) => (

                    <tr key={bilhete.id_bilhete}>

                      <td>
                        #{bilhete.id_bilhete}
                      </td>

                      <td>
                        {bilhete.evento?.nome}
                      </td>

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

                      <td>
                        {bilhete.matricula_carro || "-"}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            bilhete.pagamento
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >

                          {bilhete.pagamento
                            ? "Pago"
                            : "Não pago"}

                        </span>

                      </td>

                      <td>

                        <div className="d-flex gap-2">

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDelete(
                                bilhete.id_bilhete
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
                Bilhetes dos seus eventos
              </h2>

              <p className="text-muted">
                Consultar bilhetes associados aos seus eventos
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

                    <th>Evento</th>

                    <th>Tipo</th>

                    <th>Carro</th>

                    <th>Estado</th>

                  </tr>

                </thead>

                <tbody>

                  {bilhetes.map((bilhete) => (

                    <tr key={bilhete.id_bilhete}>

                      <td>
                        #{bilhete.id_bilhete}
                      </td>

                      <td>
                        {bilhete.evento?.nome}
                      </td>

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

                      <td>
                        {bilhete.matricula_carro || "-"}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            bilhete.pagamento
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >

                          {bilhete.pagamento
                            ? "Pago"
                            : "Não pago"}

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

export default Bilhetes;