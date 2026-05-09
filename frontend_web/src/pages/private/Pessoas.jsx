import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { getUser } from "../../services/authUtils";

import {
  getPessoas,
  updatePessoa
} from "../../services/pessoaService";

function Pessoas() {

  const user = getUser();

  const [pessoas, setPessoas] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [nome, setNome] = useState("");

  const [email, setEmail] = useState("");

  const [telemovel, setTelemovel] = useState("");

  const [dataNascimento, setDataNascimento] = useState("");

  useEffect(() => {

    loadPessoas();

  }, []);

  const loadPessoas = async () => {

    try {

      const response = await getPessoas();

      // cliente recebe objeto
      if (user.role === "cliente") {

        setPessoas([response.data]);

      } else {

        setPessoas(response.data);

      }

    } catch (error) {

      console.log(error);

    }

  };

  const handleEdit = (pessoa) => {

    setEditingId(pessoa.id_pessoa);

    setNome(pessoa.nome || "");

    setEmail(pessoa.email || "");

    setTelemovel(pessoa.telemovel || "");

    setDataNascimento(
      pessoa.data_nascimento || ""
    );

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updatePessoa(editingId, {
        nome,
        email,
        telemovel,
        data_nascimento: dataNascimento
      });

      alert("Pessoa atualizada");

      loadPessoas();

      setEditingId(null);

      setNome("");
      setEmail("");
      setTelemovel("");
      setDataNascimento("");

    } catch (error) {

      console.log(error);

      alert("Erro ao atualizar");

    }

  };

  return (

    <AdminLayout>

      <h1 className="mb-4">
        Pessoas
      </h1>

      {editingId && (

        <form
          onSubmit={handleSubmit}
          className="card p-4 mb-4"
        >

          <h4 className="mb-3">
            Editar Pessoa
          </h4>

          <div className="row">

            <div className="col-md-6 mb-3">

              <input
                type="text"
                placeholder="Nome"
                className="form-control"
                value={nome}
                onChange={(e) =>
                  setNome(e.target.value)
                }
              />

            </div>

            <div className="col-md-6 mb-3">

              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            <div className="col-md-6 mb-3">

              <input
                type="text"
                placeholder="Telemóvel"
                className="form-control"
                value={telemovel}
                onChange={(e) =>
                  setTelemovel(e.target.value)
                }
              />

            </div>

            <div className="col-md-6 mb-3">

              <input
                type="date"
                className="form-control"
                value={dataNascimento}
                onChange={(e) =>
                  setDataNascimento(e.target.value)
                }
              />

            </div>

          </div>

          <button
            type="submit"
            className="btn btn-dark"
          >
            Atualizar
          </button>

        </form>

      )}

      <table className="table table-dark table-striped">

        <thead>

          <tr>

            <th>ID</th>

            <th>Nome</th>

            <th>Email</th>

            <th>Telemóvel</th>

            <th>Data Nascimento</th>

            {(user.role === "admin" ||
              user.role === "cliente") && (
              <th>Ações</th>
            )}

          </tr>

        </thead>

        <tbody>

          {pessoas.map((pessoa) => (

            <tr key={pessoa.id_pessoa}>

              <td>{pessoa.id_pessoa}</td>

              <td>{pessoa.nome}</td>

              <td>{pessoa.email}</td>

              <td>{pessoa.telemovel}</td>

              <td>
                {pessoa.data_nascimento}
              </td>

              {(user.role === "admin" ||
                user.role === "cliente") && (

                <td>

                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() =>
                      handleEdit(pessoa)
                    }
                  >
                    Editar
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

export default Pessoas;