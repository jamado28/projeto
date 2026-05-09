import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

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

      const dados = {
        matricula,
        marca,
        modelo,
        ano,
        img_url: imgUrl
      };

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

      setEditingId(null);

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message || "Erro");

    }

  };

  const handleEdit = (carro) => {

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

  return (

    <AdminLayout>

      <h1 className="mb-4">
        Carros
      </h1>

      {user.role === "cliente" && (

        <form
          onSubmit={handleSubmit}
          className="card p-4 mb-4"
        >

          <h4 className="mb-3">

            {editingId
              ? "Editar Carro"
              : "Criar Carro"}

          </h4>

          <div className="row">

            <div className="col-md-4 mb-3">

              <input
                type="text"
                placeholder="Matrícula"
                className="form-control"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                disabled={editingId}
              />

            </div>

            <div className="col-md-4 mb-3">

              <input
                type="text"
                placeholder="Marca"
                className="form-control"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              />

            </div>

            <div className="col-md-4 mb-3">

              <input
                type="text"
                placeholder="Modelo"
                className="form-control"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              />

            </div>

            <div className="col-md-4 mb-3">

              <input
                type="number"
                placeholder="Ano"
                className="form-control"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
              />

            </div>

            <div className="col-md-4 mb-3">

              <input
                type="text"
                placeholder="Imagem URL"
                className="form-control"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-dark"
          >
            {editingId
              ? "Atualizar"
              : "Criar"}
          </button>

        </form>

      )}

      <table className="table table-dark table-striped">

        <thead>

          <tr>
            <th>Matrícula</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>

            {(user.role === "cliente" ||
              user.role === "admin") && (
              <th>Ações</th>
            )}

          </tr>

        </thead>

        <tbody>

          {carros.map((carro) => (

            <tr key={carro.matricula}>

              <td>{carro.matricula}</td>

              <td>{carro.marca}</td>

              <td>{carro.modelo}</td>

              <td>{carro.ano}</td>

              {(user.role === "cliente" ||
                user.role === "admin") && (

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(carro)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(carro.matricula)}
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

export default Carros;