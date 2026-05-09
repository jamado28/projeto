import { useEffect, useState } from "react";
import { getUser } from "../../services/authUtils";
import {
  getCarros,
  createCarro,
  updateCarro,
  deleteCarro
} from "../../services/carroService";

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

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message || "Erro");

    }

  };

  const handleEdit = (carro) => {

    setShowForm(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setEditingId(carro.matricula);
    setMatricula(carro.matricula);
    setMarca(carro.marca);
    setModelo(carro.modelo);
    setAno(carro.ano);
    setImgUrl(carro.img_url);

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Tem a certeza?"
    );

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

            <h2>
              Carros
            </h2>

            <p className="text-muted">
              Gerir os seus veículos
            </p>

          </div>

          <button
            className="btn btn-danger"
            onClick={() => {

              setShowForm(true);

              setEditingId(null);

              setMatricula("");
              setMarca("");
              setModelo("");
              setAno("");
              setImgUrl("");

            }}
          >
            + Adicionar carro
          </button>

        </div>

        {/* FORM */}
        {showForm && (

          <form
            onSubmit={handleSubmit}
            className="card p-4 mb-4 shadow-sm"
          >

            <h5 className="mb-4">

              {editingId
                ? "Editar veículo"
                : "Adicionar novo veículo"}

            </h5>

            <div className="row">

              <div className="col-md-3 mb-3">

                <label className="form-label">
                  Matrícula
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={matricula}
                  onChange={(e) =>
                    setMatricula(e.target.value)
                  }
                  disabled={editingId}
                />

              </div>

              <div className="col-md-3 mb-3">

                <label className="form-label">
                  Marca
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={marca}
                  onChange={(e) =>
                    setMarca(e.target.value)
                  }
                />

              </div>

              <div className="col-md-3 mb-3">

                <label className="form-label">
                  Modelo
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={modelo}
                  onChange={(e) =>
                    setModelo(e.target.value)
                  }
                />

              </div>

              <div className="col-md-3 mb-3">

                <label className="form-label">
                  Ano
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={ano}
                  onChange={(e) =>
                    setAno(e.target.value)
                  }
                />

              </div>

              <div className="col-md-12 mb-3">

                <label className="form-label">
                  Imagem URL
                </label>

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) =>
                    setImagem(e.target.files[0])
                  }
                />

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-danger"
            >

              {editingId
                ? "Atualizar veículo"
                : "Adicionar veículo"}

            </button>

          </form>
        )}
        {/* LISTA */}

        <div className="row">

          {carros.map((carro) => (

            <div
              key={carro.matricula}
              className="col-md-3 mb-4"
            >

              <div className="card h-100 shadow-sm">

                <img
                  src={
                    carro.img_url
                      ? `http://localhost:3000${carro.img_url}`
                      : "https://placehold.co/600x400"
                  }
                  className="card-img-top"
                  alt={carro.modelo}
                  style={{
                    height: "180px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body">

                  <h5>
                    {carro.matricula}
                  </h5>

                  <p className="mb-1">
                    {carro.marca}
                  </p>

                  <p className="mb-1">
                    {carro.modelo}
                  </p>

                  <p className="text-muted">
                    {carro.ano}
                  </p>

                </div>

                <div className="card-footer d-flex gap-2">

                  <button
                    className="btn btn-outline-secondary btn-sm w-100"
                    onClick={() =>
                      handleEdit(carro)
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm w-100"
                    onClick={() =>
                      handleDelete(carro.matricula)
                    }
                  >
                    Apagar
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

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h2>
              Carros
            </h2>

            <p className="text-muted">
              Gerir todos os veículos
            </p>

          </div>

        </div>

        {/* FORM */}

        {showForm && (

          <form
            onSubmit={handleSubmit}
            className="card shadow-sm border-0 p-4 mb-4"
          >

            <h5 className="mb-4">
              Editar veículo
            </h5>

            <div className="row">

              <div className="col-md-3 mb-3">

                <label className="form-label">
                  Matrícula
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={matricula}
                  disabled
                />

              </div>

              <div className="col-md-3 mb-3">

                <label className="form-label">
                  Marca
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={marca}
                  onChange={(e) =>
                    setMarca(e.target.value)
                  }
                />

              </div>

              <div className="col-md-3 mb-3">

                <label className="form-label">
                  Modelo
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={modelo}
                  onChange={(e) =>
                    setModelo(e.target.value)
                  }
                />

              </div>

              <div className="col-md-3 mb-3">

                <label className="form-label">
                  Ano
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={ano}
                  onChange={(e) =>
                    setAno(e.target.value)
                  }
                />

              </div>

              <div className="col-md-12 mb-3">

                <label className="form-label">
                  Imagem URL
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={imgUrl}
                  onChange={(e) =>
                    setImgUrl(e.target.value)
                  }
                />

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-dark"
            >
              Atualizar veículo
            </button>

          </form>

        )}

        {/* TABELA */}

        <div className="card shadow-sm border-0 p-4">

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr>

                  <th>Veículo</th>

                  <th>Matrícula</th>

                  <th>Marca</th>

                  <th>Modelo</th>

                  <th>Ano</th>

                  <th>Ações</th>

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
                          borderRadius: "10px"
                        }}
                      />

                    </td>

                    <td>
                      {carro.matricula}
                    </td>

                    <td>
                      {carro.marca}
                    </td>

                    <td>
                      {carro.modelo}
                    </td>

                    <td>
                      {carro.ano}
                    </td>

                    <td>

                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            handleEdit(carro)
                          }
                        >
                          ✏️
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(carro.matricula)
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
              Carros dos seus eventos
            </h2>

            <p className="text-muted">
              Consultar veículos inscritos nos seus eventos
            </p>

          </div>

        </div>

        {/* LISTA */}

        {Object.entries(carrosPorEvento).map(
          ([nomeEvento, carrosEvento]) => (

            <div
              key={nomeEvento}
              className="mb-5"
            >

              {/* EVENTO */}

              <div className="mb-4">

                <h3>
                  {nomeEvento}
                </h3>

                <p className="text-muted">
                  Carros inscritos neste evento
                </p>

              </div>

              {/* CARROS */}

              <div className="row">

                {carrosEvento.map((carro) => (

                  <div
                    key={`${nomeEvento}-${carro.matricula}`}
                    className="col-lg-4 col-md-6 mb-4"
                  >

                    <div className="card border-0 shadow-sm h-100 overflow-hidden">

                      {/* IMAGEM */}

                      <div
                        style={{
                          height: "220px",
                          overflow: "hidden"
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
                            objectFit: "cover"
                          }}
                        />

                      </div>

                      {/* CONTEÚDO */}

                      <div className="card-body d-flex flex-column">

                        <div className="mb-3">

                          <h5 className="mb-1">

                            {carro.marca} {carro.modelo}

                          </h5>

                          <p className="text-muted mb-0">

                            {carro.ano}

                          </p>

                        </div>

                        <div className="mt-auto">

                          <span className="badge bg-dark fs-6">

                            {carro.matricula}

                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )

        )}
      </div>

    )}
  </div>

)

}

export default Carros;