import { useEffect, useState } from "react";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { useAuth } from "../../hooks/useAuth";
import { useEventos } from "../../hooks/useEventos";
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
  const { user, role, isAuthenticated } = useAuth();

  const {
    eventos,
    setEventos,
    loading,
    erro,
    setErro,
    loadEventos,
  } = useEventos();

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
  const [sucesso, setSucesso] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventoToDelete, setEventoToDelete] = useState(null);

  const handleCreate = async (e) => {
    setErro("");
    setSucesso("");
    e.preventDefault();
    if (nome.trim().length < 3) {
      setErro("O nome do evento deve ter pelo menos 3 caracteres.");
      return;
    }

    if (localEvento.trim().length < 3) {
      setErro("O local do evento é inválido.");
      return;
    }

    if (Number(precoVisitante) < 0) {
      setErro("O preço de visitante não pode ser negativo.");
      return;
    }

    if (Number(precoParticipante) < 0) {
      setErro("O preço de participante não pode ser negativo.");
      return;
    }

    if (Number(limiteParticipantes) <= 0) {
      setErro("O limite de participantes deve ser superior a 0.");
      return;
    }
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
        console.log("A criar evento...");
        console.log(user);
        console.log(editingId);
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
      console.log("ERRO COMPLETO:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);

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
          aria-label="Criar evento"
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
                aria-label="Nome do evento"
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
                aria-label="Data"
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
                aria-label="Local do evento"
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
                aria-label="Preço visitante"
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
                aria-label="Preço participante"
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
                aria-label="Limite de participantes"
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
              aria-label="Descrição do evento"
              placeholder="Escreva uma descrição para o evento"
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
              aria-label="Imagem do evento"
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
            aria-label={editingId ? "Atualizar evento" : "Criar evento"}
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
              {eventos.length === 0 ? (
                <tr>
                  <td colSpan="999" className="text-center py-4">
                    Não existem eventos registados.
                  </td>
                </tr>
              ) : (
                eventos.map((evento) => (
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
                              aria-label={"Editar " + evento.nome}
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
                              aria-label={"Eliminar " + evento.nome}
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
                ))
              )}
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
