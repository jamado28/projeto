import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventoById } from "../../services/eventService";
import { getUser } from "../../services/authUtils";
import PublicNavbar from "../../components/public/PublicNavbar";
import Footer from "../../components/public/Footer";

function EventDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const user = getUser();

  const [evento, setEvento] = useState(null);

  useEffect(() => {

    loadEvento();

  }, []);

  const loadEvento = async () => {

    try {

      const response = await getEventoById(id);

      setEvento(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleComprar = () => {

    // sem login
    if (!user) {

      navigate("/login");

      return;

    }

    // apenas clientes podem comprar
    if (user.role !== "cliente") {

      alert(
        "Apenas clientes podem comprar bilhetes."
      );

      return;

    }

    // guardar evento escolhido
    localStorage.setItem(
      "eventoBilhete",
      evento.id_evento
    );

    // abrir perfil
    navigate("/profile");

  };
  if (!evento) {

    return (

      <div className="container py-5">

        <h2>Evento não encontrado</h2>

      </div>

    )

  }

  return (
    <div>
      <PublicNavbar />
        <div>

          {/* IMAGEM */}

          <div>

            <img
              src={
                evento.imagem
                  ? `http://localhost:3000${evento.imagem}`
                  : "https://placehold.co/1200x500"
              }
              alt={evento.nome}
              style={{
                width: "100%",
                height: "500px",
                objectFit: "cover"
              }}
            />

          </div>

          {/* CONTEÚDO */}

          <div className="container py-5">

            <h1 className="mb-4">
              {evento.nome}
            </h1>

            <div className="row">

              <div className="col-md-8">

                <div className="card border-0 shadow-sm p-4 h-100">

                  <h4 className="mb-4">
                    Sobre o evento
                  </h4>

                  <p
                    className="text-muted"
                    style={{
                      whiteSpace: "pre-line",
                      lineHeight: "1.8"
                    }}
                  >

                    {evento.descricao ||
                      "Sem descrição disponível."}

                  </p>

                </div>

              </div>
              <div className="col-md-4">

                <div className="card p-4 shadow">

                  <h4 className="mb-3">
                    Informações
                  </h4>

                  <p>
                    📍 {evento.local_evento}
                  </p>

                  <p>
                    📅 {evento.data}
                  </p>

                  <hr />

                  <p>
                    🎟 Visitante:
                    {" "}
                    {evento.preco_visitante}€
                  </p>

                  <p>
                    🚗 Participante:
                    {" "}
                    {evento.preco_participante}€
                  </p>

                  <button
                    className="btn btn-dark w-100 mt-3"
                    onClick={handleComprar}
                  >
                    Comprar Bilhete
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      <Footer />              
    </div>
  )

}

export default EventDetails;