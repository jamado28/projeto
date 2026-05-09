import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
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

  };
  return (

    <AdminLayout>

      <h1 className="mb-4">
        Eventos
      </h1>
      <form
        onSubmit={handleCreate}
        className="card p-4 mb-4"
      >

        <h4 className="mb-3">
          Criar Evento
        </h4>

        <div className="row">

          <div className="col-md-4 mb-3">

            <input
              type="text"
              placeholder="Nome"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

          </div>

          <div className="col-md-4 mb-3">

            <input
              type="date"
              className="form-control"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />

          </div>

          <div className="col-md-4 mb-3">

            <input
              type="text"
              placeholder="Local"
              className="form-control"
              value={localEvento}
              onChange={(e) => setLocalEvento(e.target.value)}
            />

          </div>

          <div className="col-md-4 mb-3">

            <input
              type="number"
              placeholder="Preço visitante"
              className="form-control"
              value={precoVisitante}
              onChange={(e) => setPrecoVisitante(e.target.value)}
            />

          </div>

          <div className="col-md-4 mb-3">

            <input
              type="number"
              placeholder="Preço participante"
              className="form-control"
              value={precoParticipante}
              onChange={(e) => setPrecoParticipante(e.target.value)}
            />

          </div>

          <div className="col-md-4 mb-3">

            <input
              type="number"
              placeholder="Limite participantes"
              className="form-control"
              value={limiteParticipantes}
              onChange={(e) => setLimiteParticipantes(e.target.value)}
            />

          </div>

        </div>

        <button
          type="submit"
          className="btn btn-dark"
        >
          Criar Evento
        </button>

      </form>
      <table className="table table-dark table-striped">

        <thead>

          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data</th>
            <th>Local</th>
            <th>Ações</th>
          </tr>

        </thead>

        <tbody>

          {eventos.map((evento) => (

            <tr key={evento.id_evento}>

              <td>{evento.id_evento}</td>

              <td>{evento.nome}</td>

              <td>{evento.data}</td>

              <td>{evento.local_evento}</td>

              <td>

                {(user.role === "admin" ||
                  (user.role === "organizador" &&
                    evento.user_id === user.id)) && (

                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(evento)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(evento.id_evento)}
                    >
                      Apagar
                    </button>
                  </>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </AdminLayout>

  )

}

export default Eventos;