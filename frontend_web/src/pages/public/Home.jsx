import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { getEventos } from "../../services/eventService";

import PublicNavbar from "../../components/public/PublicNavbar";

import Footer from "../../components/public/Footer";

function Home() {

  const [eventos, setEventos] = useState([]);

  useEffect(() => {

    loadEventos();

  }, []);

  const loadEventos = async () => {

    try {

      const response = await getEventos();

      setEventos(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div>
      <PublicNavbar />

      {/* HERO */}

      <div className="bg-dark text-white text-center py-5">

        <div className="container">

          <h1 className="display-3 mb-4">
            Sistema de Gestão de Eventos
          </h1>

          <p className="lead mb-4">

            Descubra eventos automóveis,
            compre bilhetes e participe.

          </p>

        </div>

      </div>

      {/* EVENTOS */}

      <div className="container py-5">

        <h2 className="mb-5 text-center">
          Eventos Disponíveis
        </h2>

        <div className="row">

          {eventos.slice(0, 6).map((evento) => (

            <div
              key={evento.id_evento}
              className="col-md-4 mb-4"
            >

              <div className="card h-100 shadow">

                <img
                  src={
                    evento.imagem
                      ? `http://localhost:3000${evento.imagem}`
                      : "https://placehold.co/600x400"
                  }
                  className="card-img-top"
                  alt={evento.nome}
                  style={{
                    height: "250px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body d-flex flex-column">

                  <h4 className="card-title">
                    {evento.nome}
                  </h4>

                  <p className="mb-2">
                    📍 {evento.local_evento}
                  </p>

                  <p className="mb-3">
                    📅 {evento.data}
                  </p>

                  <div className="mt-auto">

                    <Link
                      to={`/eventos/${evento.id_evento}`}
                      className="btn btn-dark w-100"
                    >
                      Ver Evento
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>
        <div className="text-center mt-4">

        <Link
          to="/eventos-publicos"
          className="btn btn-outline-dark btn-lg"
        >
          Ver Mais Eventos
        </Link>

      </div>

      </div>

      {/* CTA */}

      <div className="bg-light py-5">

        <div className="container text-center">

          <h2 className="mb-3">

            Quer ajuda a gerir o seu evento?

          </h2>

          <p className="mb-4">

            Organizamos e gerimos eventos
            automóveis consigo.

          </p>

          <button className="btn btn-dark btn-lg">

            Contacte-nos

          </button>

        </div>

      </div>
      <Footer />
    </div>

  )

}

export default Home;