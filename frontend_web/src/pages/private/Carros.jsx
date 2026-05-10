import { useEffect, useState } from "react";

import { getUser } from "../../services/authUtils";

import {
  getCarros,
  createCarro,
  updateCarro,
  deleteCarro,
} from "../../services/carroService";

// ÍCONES
import {
  FaCarSide,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaImage,
  FaCalendarAlt,
  FaTag,
} from "react-icons/fa";

function Carros() {
  const user = getUser();

  const [carros, setCarros] = useState([]);

  const [matricula, setMatricula] = useState("");

  const [marca, setMarca] = useState("");

  const [modelo, setModelo] = useState("");

  const [ano, setAno] = useState("");

  const [imgUrl, setImgUrl] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    loadCarros();
  }, []);

  const loadCarros = async () => {
    try {
      const response = await getCarros();

      setCarros(response.data);
    } catch (error) {
      console.log(error);

      alert("Erro ao carregar carros");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dados = new FormData();

      dados.append("matricula", matricula);

      dados.append("marca", marca);

      dados.append("modelo", modelo);

      dados.append("ano", ano);

      if (imagem) {
        dados.append("imagem", imagem);
      }

      if (editingId) {
        await updateCarro(editingId, dados);

        alert("Carro atualizado");
      } else {
        await createCarro(dados);

        alert("Carro criado");
      }

      loadCarros();

      setMatricula("");

      setMarca("");

      setModelo("");

      setAno("");

      setImgUrl("");

      setImagem(null);

      setEditingId(null);

      setShowForm(false);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Erro");
    }
  };

  const handleEdit = (carro) => {
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setEditingId(carro.matricula);

    setMatricula(carro.matricula);

    setMarca(carro.marca);

    setModelo(carro.modelo);

    setAno(carro.ano);

    setImgUrl(carro.img_url);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem a certeza?");

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteCarro(id);

      alert("Carro apagado");

      loadCarros();
    } catch (error) {
      console.log(error);

      alert("Erro ao apagar");
    }
  };

  const carrosPorEvento = {};

  carros.forEach((carro) => {
    carro.bilhetes?.forEach((bilhete) => {
      const evento = bilhete.evento;

      if (!evento) return;

      if (!carrosPorEvento[evento.nome]) {
        carrosPorEvento[evento.nome] = [];
      }

      carrosPorEvento[evento.nome].push(carro);
    });
  });

  return (
    <div>
      {/* CLIENTE */}

      {user.role === "cliente" && (
        <div>
          {/* TOPO */}

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold d-flex align-items-center gap-2">
                <FaCarSide color="#df9425" />
                Carros
              </h2>

              <p className="text-muted mb-0">Gerir os seus veículos</p>
            </div>

            <button
              className="btn d-flex align-items-center gap-2"
              onClick={() => {
                setShowForm(true);

                setEditingId(null);

                setMatricula("");

                setMarca("");

                setModelo("");

                setAno("");

                setImgUrl("");
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
              Adicionar carro
            </button>
          </div>

          {/* FORM */}

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="card border-0 shadow-sm p-4 mb-4"
              style={{
                borderRadius: "24px",
              }}
            >
              <h5 className="fw-bold mb-4">
                {editingId ? "Editar veículo" : "Adicionar veículo"}
              </h5>

              <div className="row">
                {/* MATRÍCULA */}

                <div className="col-md-3 mb-3">
                  <label className="form-label fw-semibold">
                    <FaTag className="me-2" />
                    Matrícula
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    disabled={editingId}
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  />
                </div>

                {/* MARCA */}

                <div className="col-md-3 mb-3">
                  <label className="form-label fw-semibold">
                    <FaCarSide className="me-2" />
                    Marca
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  />
                </div>

                {/* MODELO */}

                <div className="col-md-3 mb-3">
                  <label className="form-label fw-semibold">
                    <FaCarSide className="me-2" />
                    Modelo
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  />
                </div>

                {/* ANO */}

                <div className="col-md-3 mb-3">
                  <label className="form-label fw-semibold">
                    <FaCalendarAlt className="me-2" />
                    Ano
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  />
                </div>

                {/* IMAGEM */}

                <div className="col-md-12 mb-3">
                  <label className="form-label fw-semibold">
                    <FaImage className="me-2" />
                    Imagem
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
              </div>

              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "#111",
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "12px 24px",
                  fontWeight: "600",
                }}
              >
                {editingId ? "Atualizar veículo" : "Adicionar veículo"}
              </button>
            </form>
          )}

          {/* LISTA */}

          <div className="row">
            {carros.map((carro) => (
              <div key={carro.matricula} className="col-lg-3 col-md-6 mb-4">
                <div
                  className="card border-0 shadow-sm h-100 overflow-hidden"
                  style={{
                    borderRadius: "22px",
                  }}
                >
                  <img
                    src={
                      carro.img_url
                        ? `http://localhost:3000${carro.img_url}`
                        : "https://placehold.co/600x400"
                    }
                    className="card-img-top"
                    alt={carro.modelo}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body">
                    <div className="mb-3">
                      <h5 className="fw-bold">
                        {carro.marca} {carro.modelo}
                      </h5>

                      <p className="text-muted mb-0">{carro.ano}</p>
                    </div>

                    <span
                      className="badge"
                      style={{
                        backgroundColor: "#111",
                        color: "#fff",
                        borderRadius: "10px",
                        padding: "10px 14px",
                      }}
                    >
                      {carro.matricula}
                    </span>
                  </div>

                  <div className="card-footer bg-white border-0 d-flex gap-2 pb-4 px-4">
                    <button
                      className="btn w-100"
                      onClick={() => handleEdit(carro)}
                      style={{
                        backgroundColor: "#df9425",
                        color: "#111",
                        borderRadius: "12px",
                        fontWeight: "600",
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleDelete(carro.matricula)}
                      style={{
                        borderRadius: "12px",
                      }}
                    >
                      <FaTrashAlt />
                    </button>
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
              <FaCarSide color="#df9425" />
              Carros
            </h2>

            <p className="text-muted mb-0">Gerir todos os veículos</p>
          </div>

          {/* FORM */}

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="card border-0 shadow-sm p-4 mb-4"
              style={{
                borderRadius: "24px",
              }}
            >
              <h5 className="fw-bold mb-4">Editar veículo</h5>

              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label fw-semibold">Matrícula</label>

                  <input
                    type="text"
                    className="form-control"
                    value={matricula}
                    disabled
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label fw-semibold">Marca</label>

                  <input
                    type="text"
                    className="form-control"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label fw-semibold">Modelo</label>

                  <input
                    type="text"
                    className="form-control"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label fw-semibold">Ano</label>

                  <input
                    type="number"
                    className="form-control"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                    style={{
                      borderRadius: "12px",
                      padding: "12px",
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "#111",
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "12px 24px",
                  fontWeight: "600",
                }}
              >
                Atualizar veículo
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
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Veículo</th>

                    <th>Matrícula</th>

                    <th>Marca</th>

                    <th>Modelo</th>

                    <th>Ano</th>

                    <th className="text-center">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {carros.map((carro) => (
                    <tr key={carro.matricula}>
                      <td>
                        <img
                          src={
                            carro.img_url
                              ? `http://localhost:3000${carro.img_url}`
                              : "https://placehold.co/600x400"
                          }
                          alt={carro.modelo}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "12px",
                          }}
                        />
                      </td>

                      <td>{carro.matricula}</td>

                      <td>{carro.marca}</td>

                      <td>{carro.modelo}</td>

                      <td>{carro.ano}</td>

                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-sm"
                            onClick={() => handleEdit(carro)}
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
                            onClick={() => handleDelete(carro.matricula)}
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
          {/* TOPO */}

          <div className="mb-4">
            <h2 className="fw-bold d-flex align-items-center gap-2">
              <FaCarSide color="#df9425" />
              Carros dos seus eventos
            </h2>

            <p className="text-muted mb-0">
              Consultar veículos inscritos nos seus eventos
            </p>
          </div>

          {/* EVENTOS */}

          {Object.entries(carrosPorEvento).map(([nomeEvento, carrosEvento]) => (
            <div key={nomeEvento} className="mb-5">
              <div className="mb-4">
                <h3 className="fw-bold">{nomeEvento}</h3>

                <p className="text-muted">Carros inscritos neste evento</p>
              </div>

              <div className="row">
                {carrosEvento.map((carro) => (
                  <div
                    key={`${nomeEvento}-${carro.matricula}`}
                    className="col-lg-4 col-md-6 mb-4"
                  >
                    <div
                      className="card border-0 shadow-sm h-100 overflow-hidden"
                      style={{
                        borderRadius: "22px",
                      }}
                    >
                      {/* IMAGEM */}

                      <div
                        style={{
                          height: "240px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={
                            carro.img_url
                              ? `http://localhost:3000${carro.img_url}`
                              : "https://placehold.co/600x400"
                          }
                          alt={carro.modelo}
                          className="w-100 h-100"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      {/* CONTEÚDO */}

                      <div className="card-body d-flex flex-column">
                        <div className="mb-3">
                          <h5 className="fw-bold mb-1">
                            {carro.marca} {carro.modelo}
                          </h5>

                          <p className="text-muted mb-0">{carro.ano}</p>
                        </div>

                        <div className="mt-auto">
                          <span
                            className="badge"
                            style={{
                              backgroundColor: "#111",
                              color: "#fff",
                              borderRadius: "10px",
                              padding: "10px 14px",
                            }}
                          >
                            {carro.matricula}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Carros;
