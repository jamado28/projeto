import { useEffect, useState } from "react";
import { getUser } from "../../services/authUtils";
import { getEventos, createEvento, deleteEvento, updateEvento } from "../../services/eventService";

function Eventos() {

  const user = getUser();
  const [eventos, setEventos] = useState([]);
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [localEvento, setLocalEvento] = useState("");
  const [precoVisitante, setPrecoVisitante] = useState("");
  const [precoParticipante, setPrecoParticipante] = useState("");
  const [limiteParticipantes, setLimiteParticipantes] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {

    loadEventos();

  }, []);

  const loadEventos = async () => {

    try {

      const response = await getEventos();

      setEventos(response.data);

    } catch (error) {

      console.log(error);

      alert("Erro ao carregar eventos");

    }

  };
  const handleCreate = async (e) => {

    e.preventDefault();

    try {

      const dados = {
        nome,
        data,
        local_evento: localEvento,
        preco_visitante: precoVisitante,
        preco_participante: precoParticipante,
        limite_participantes: limiteParticipantes,
      };

      if (editingId) {

        await updateEvento(editingId, dados);

        alert("Evento atualizado");

      } else {

        await createEvento(dados);

        alert("Evento criado");

      }

      alert("Evento criado com sucesso");

      loadEventos();
      setEditingId(null);
      setNome("");
      setData("");
      setLocalEvento("");
      setPrecoVisitante("");
      setPrecoParticipante("");
      setLimiteParticipantes("");
      setShowForm(false);

    } catch (error) {

      console.log(error);

      alert("Erro ao criar evento");

    }

  };
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Tem a certeza que quer eliminar este evento?");

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteEvento(id);

      alert("Evento apagado");

      loadEventos();

    } catch (error) {

      console.log(error);

      alert("Erro ao apagar");

    }

  };
  const handleEdit = (evento) => {

    setEditingId(evento.id_evento);
    setNome(evento.nome);
    setData(evento.data);
    setLocalEvento(evento.local_evento);
    setPrecoVisitante(evento.preco_visitante);
    setPrecoParticipante(evento.preco_participante);
    setLimiteParticipantes(evento.limite_participantes);
    setShowForm(true);
  };

  return (

    <div>

      {/* TOPO */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2>
            Eventos
          </h2>

          <p className="text-muted">
            Gerir todos os eventos
          </p>

        </div>

        <button
          className="btn btn-danger"
          onClick={() =>
            setShowForm(!showForm)
          }
        >

          + Criar evento

        </button>

      </div>

      {/* FORM */}

      {showForm && (

        <form
          onSubmit={handleCreate}
          className="card shadow-sm border-0 p-4 mb-4"
        >

          <h5 className="mb-1">
            {editingId
              ? "Editar evento"
              : "Criar novo evento"}
          </h5>

          <p className="text-muted mb-4">

            Preencha os dados para criar
            um novo evento.

          </p>

          <div className="row">

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Nome do evento
              </label>

              <input
                type="text"
                placeholder="Ex: Drift Night Lisboa"
                className="form-control"
                value={nome}
                onChange={(e) =>
                  setNome(e.target.value)
                }
              />

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Data
              </label>

              <input
                type="date"
                className="form-control"
                value={data}
                onChange={(e) =>
                  setData(e.target.value)
                }
              />

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Local
              </label>

              <input
                type="text"
                placeholder="Ex: Lisboa"
                className="form-control"
                value={localEvento}
                onChange={(e) =>
                  setLocalEvento(e.target.value)
                }
              />

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Preço visitante
              </label>

              <input
                type="number"
                placeholder="Ex: 20.00"
                className="form-control"
                value={precoVisitante}
                onChange={(e) =>
                  setPrecoVisitante(e.target.value)
                }
              />

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Preço participante
              </label>

              <input
                type="number"
                placeholder="Ex: 15.00"
                className="form-control"
                value={precoParticipante}
                onChange={(e) =>
                  setPrecoParticipante(e.target.value)
                }
              />

            </div>

            <div className="col-md-4 mb-3">

              <label className="form-label">
                Limite de participantes
              </label>

              <input
                type="number"
                placeholder="Ex: 100"
                className="form-control"
                value={limiteParticipantes}
                onChange={(e) =>
                  setLimiteParticipantes(e.target.value)
                }
              />

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-dark w-100"
          >

            {editingId
              ? "Atualizar evento"
              : "Criar evento"}

          </button>

        </form>

      )}

      {/* TABELA */}

      <div className="card shadow-sm border-0 p-4">

        <h5 className="mb-4">
          Lista de eventos
        </h5>

        <div className="table-responsive">

          <table className="table align-middle">

            <thead>

              <tr>

                <th>Evento</th>

                <th>Data</th>

                <th>Local</th>

                <th>Preço Visitante</th>

                <th>Preço Participante</th>

                <th>Limite de Participantes</th>

                <th>Participantes Confirmados</th>
                <th>Ações</th>

              </tr>

            </thead>

            <tbody>

              {eventos.map((evento) => (

                <tr key={evento.id_evento}>

                  <td>

                    <div className="d-flex align-items-center gap-3">

                      <img
                        src={
                          evento.imagem ||
                          "https://placehold.co/60x60"
                        }
                        alt={evento.nome}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "10px"
                        }}
                      />

                      <div>

                        <strong>
                          {evento.nome}
                        </strong>

                      </div>

                    </div>

                  </td>

                  <td>
                    {evento.data}
                  </td>

                  <td>
                    {evento.local_evento}
                  </td>

                  <td>
                    {evento.preco_visitante}€
                  </td>

                  <td>
                    {evento.preco_participante}€
                  </td>

                  <td>
                    {evento.limite_participantes}
                  </td>
                  <td>{evento.total_participantes}</td>      
                  <td>

                    {(user.role === "admin" ||
                      (user.role === "organizador" &&
                        evento.user_id === user.id)) && (

                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            handleEdit(evento)
                          }
                        >
                          ✏️
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(evento.id_evento)
                          }
                        >
                          🗑️
                        </button>

                      </div>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}

export default Eventos;