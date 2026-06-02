import { useEffect, useState } from "react";

import { getUser } from "../../services/authUtils";
import {
  getEventos,
  createEvento,
  deleteEvento,
  updateEvento,
} from "../../services/eventService";
const BASE_URL = import.meta.env.VITE_BASE_URL;
// ÍCONES
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaEuroSign,
  FaImage,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaCarSide,
  FaAlignLeft,
} from "react-icons/fa";

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

  const [imagem, setImagem] = useState(null);

  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventoToDelete, setEventoToDelete] = useState(null);
  useEffect(() => {
    loadEventos();
  }, []);

  const loadEventos = async () => {
    try {
      const response = await getEventos();

      setEventos(response.data);
    } catch (error) {
      console.log(error);

      setErro("Não foi possível carregar os eventos.");
    }
  };

  const handleCreate = async (e) => {
    setErro("");
    setSucesso("");
    e.preventDefault();
    if (
      !nome ||
      !data ||
      !localEvento ||
      !precoVisitante ||
      !precoParticipante ||
      !limiteParticipantes
    ) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }
    try {
      const dados = new FormData();

      dados.append("nome", nome);

      dados.append("data", data);

      dados.append("local_evento", localEvento);

      dados.append("preco_visitante", precoVisitante);

      dados.append("preco_participante", precoParticipante);

      dados.append("limite_participantes", limiteParticipantes);

      dados.append("descricao", descricao);

      if (imagem) {
        dados.append("imagem", imagem);
      }

      if (editingId) {
        await updateEvento(editingId, dados);

        setSucesso("Evento atualizado com sucesso.");
      } else {
        await createEvento(dados);

        setSucesso("Evento criado com sucesso.");
        setTimeout(() => {
          setSucesso("");
        }, 4000);
      }

      loadEventos();

      setEditingId(null);

      setNome("");

      setData("");

      setLocalEvento("");

      setPrecoVisitante("");

      setPrecoParticipante("");

      setLimiteParticipantes("");

      setDescricao("");

      setImagem(null);

      setShowForm(false);
    } catch (error) {
      console.log(error);

      setErro(
        error.response?.data?.message || "Ocorreu um erro ao guardar o evento.",
      );
    }
  };

  const handleDelete = (id) => {
    setEventoToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEvento(eventoToDelete);

      setSucesso("Evento eliminado com sucesso.");

      loadEventos();
    } catch (error) {
      setErro("Erro ao eliminar evento.");
    }

    setShowDeleteModal(false);
    setEventoToDelete(null);
  };

  const handleEdit = (evento) => {
    setEditingId(evento.id_evento);

    setNome(evento.nome);

    setData(evento.data);

    setLocalEvento(evento.local_evento);

    setPrecoVisitante(evento.preco_visitante);

    setPrecoParticipante(evento.preco_participante);

    setLimiteParticipantes(evento.limite_participantes);

    setDescricao(evento.descricao || "");

    setImagem(null);

    setShowForm(true);
  };

  return (
    <div>
      {/* TOPO */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold d-flex align-items-center gap-2">
            <FaCarSide color="#df9425" />
            Eventos
          </h2>

          <p className="text-muted mb-0">Gerir todos os eventos</p>
        </div>

        <button
          className="btn d-flex align-items-center gap-2"
          onClick={() => {
            setShowForm(!showForm);

            if (!showForm) {
              setEditingId(null);

              setNome("");

              setData("");

              setLocalEvento("");

              setPrecoVisitante("");

              setPrecoParticipante("");

              setLimiteParticipantes("");

              setDescricao("");

              setImagem(null);
            }
          }}
          style={{
            backgroundColor: "#111",
            color: "#fff",
            borderRadius: "14px",
            padding: "12px 20px",
            fontWeight: "600",
          }}
        >
          <FaPlus />
          Criar evento
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
          onSubmit={handleCreate}
          className="card border-0 shadow-sm p-4 mb-4"
          style={{
            borderRadius: "24px",
          }}
        >
          <h5 className="fw-bold mb-1">
            {editingId ? "Editar evento" : "Criar novo evento"}
          </h5>

          <p className="text-muted mb-4">Preencha os dados do evento.</p>

          <div className="row">
            {/* NOME */}

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">
                <FaCarSide className="me-2" />
                Nome do evento
              </label>

              <input
                type="text"
                placeholder="Ex: Drift Night Lisboa"
                className="form-control"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={{
                  borderRadius: "12px",
                  padding: "12px",
                }}
              />
            </div>

            {/* DATA */}

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">
                <FaCalendarAlt className="me-2" />
                Data
              </label>

              <input
                type="date"
                className="form-control"
                value={data}
                onChange={(e) => setData(e.target.value)}
                style={{
                  borderRadius: "12px",
                  padding: "12px",
                }}
              />
            </div>

            {/* LOCAL */}

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">
                <FaMapMarkerAlt className="me-2" />
                Local
              </label>

              <input
                type="text"
                placeholder="Ex: Lisboa"
                className="form-control"
                value={localEvento}
                onChange={(e) => setLocalEvento(e.target.value)}
                style={{
                  borderRadius: "12px",
                  padding: "12px",
                }}
              />
            </div>

            {/* PREÇO VISITANTE */}

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">
                <FaEuroSign className="me-2" />
                Preço visitante
              </label>

              <input
                type="number"
                placeholder="Ex: 20.00"
                className="form-control"
                value={precoVisitante}
                onChange={(e) => setPrecoVisitante(e.target.value)}
                style={{
                  borderRadius: "12px",
                  padding: "12px",
                }}
              />
            </div>

            {/* PREÇO PARTICIPANTE */}

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">
                <FaEuroSign className="me-2" />
                Preço participante
              </label>

              <input
                type="number"
                placeholder="Ex: 15.00"
                className="form-control"
                value={precoParticipante}
                onChange={(e) => setPrecoParticipante(e.target.value)}
                style={{
                  borderRadius: "12px",
                  padding: "12px",
                }}
              />
            </div>

            {/* LIMITE */}

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">
                <FaUsers className="me-2" />
                Limite participantes
              </label>

              <input
                type="number"
                placeholder="Ex: 100"
                className="form-control"
                value={limiteParticipantes}
                onChange={(e) => setLimiteParticipantes(e.target.value)}
                style={{
                  borderRadius: "12px",
                  padding: "12px",
                }}
              />
            </div>
          </div>

          {/* DESCRIÇÃO */}

          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaAlignLeft className="me-2" />
              Descrição
            </label>

            <textarea
              className="form-control"
              rows="4"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              style={{
                borderRadius: "12px",
                padding: "12px",
              }}
            />
          </div>

          {/* IMAGEM */}

          <div className="mb-4">
            <label className="form-label fw-semibold">
              <FaImage className="me-2" />
              Imagem do evento
            </label>

            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImagem(e.target.files[0])}
              style={{
                borderRadius: "12px",
                padding: "12px",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#111",
              color: "#fff",
              borderRadius: "14px",
              padding: "14px",
              fontWeight: "600",
            }}
          >
            {editingId ? "Atualizar evento" : "Criar evento"}
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
        <h5 className="fw-bold mb-4">Lista de eventos</h5>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Evento</th>

                <th>Data</th>

                <th>Local</th>

                <th>Visitante</th>

                <th>Participante</th>

                <th>Limite</th>

                <th>Confirmados</th>

                <th>Descrição</th>

                <th className="text-center">Ações</th>
              </tr>
            </thead>

            <tbody>
              {eventos.map((evento) => (
                <tr key={evento.id_evento}>
                  {/* EVENTO */}

                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={
                          evento.imagem
                            ? `${BASE_URL}${evento.imagem}`
                            : "https://placehold.co/60x60"
                        }
                        alt={evento.nome}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />

                      <div>
                        <strong>{evento.nome}</strong>
                      </div>
                    </div>
                  </td>

                  <td>{evento.data}</td>

                  <td>{evento.local_evento}</td>

                  <td>{evento.preco_visitante}€</td>

                  <td>{evento.preco_participante}€</td>

                  <td>{evento.limite_participantes}</td>

                  <td>
                    <span
                      className="badge"
                      style={{
                        backgroundColor: "#df9425",
                        color: "#111",
                        borderRadius: "10px",
                        padding: "8px 12px",
                      }}
                    >
                      {evento.total_participantes}
                    </span>
                  </td>

                  <td
                    style={{
                      maxWidth: "250px",
                    }}
                  >
                    <span className="text-muted">
                      {evento.descricao?.slice(0, 80)}

                      {evento.descricao?.length > 80 ? "..." : ""}
                    </span>
                  </td>

                  {/* AÇÕES */}

                  <td>
                    {(user.role === "admin" ||
                      (user.role === "organizador" &&
                        evento.user_id === user.id)) && (
                      <div className="d-flex gap-2 justify-content-center">
                        <button
                          className="btn btn-sm"
                          onClick={() => handleEdit(evento)}
                          style={{
                            backgroundColor: "#df9425",
                            color: "#111",
                            borderRadius: "10px",
                            width: "42px",
                            height: "42px",
                          }}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(evento.id_evento)}
                          style={{
                            borderRadius: "10px",
                            width: "42px",
                            height: "42px",
                          }}
                        >
                          <FaTrashAlt />
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
      {/* MODAL DE CONFIRMAÇÃO DE ELIMINAÇÃO */}
      <ConfirmDeleteModal
        show={showDeleteModal}
        title="Eliminar evento"
        message="Tem a certeza que pretende eliminar este evento? Esta ação não pode ser revertida."
        onConfirm={confirmDelete}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
}

export default Eventos;
