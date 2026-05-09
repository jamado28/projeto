import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { getEventos } from "../../services/eventService";

import PublicNavbar from "../../components/public/PublicNavbar";

import Footer from "../../components/public/Footer";

function PublicEventos() {

  const [eventos, setEventos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const eventosPerPage = 9;

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

  // paginação

  const lastIndex =
    currentPage * eventosPerPage;

  const firstIndex =
    lastIndex - eventosPerPage;

  const currentEventos =
    eventos.slice(firstIndex, lastIndex);

  const totalPages =
    Math.ceil(eventos.length / eventosPerPage);

  return (

    <div>

      <PublicNavbar />

      <div className="container py-5">

        <h1 className="mb-5 text-center">
          Todos os Eventos
        </h1>

        <div className="row">

          {currentEventos.map((evento) => (

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

                  <h4>
                    {evento.nome}
                  </h4>

                  <p>
                    📍 {evento.local_evento}
                  </p>

                  <p>
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

        {/* PAGINAÇÃO */}

        <div className="d-flex justify-content-center mt-4 gap-2">

          {[...Array(totalPages)].map((_, index) => (

            <button
              key={index}
              className={`btn ${
                currentPage === index + 1
                  ? "btn-dark"
                  : "btn-outline-dark"
              }`}
              onClick={() =>
                setCurrentPage(index + 1)
              }
            >

              {index + 1}

            </button>

          ))}

        </div>

      </div>

      <Footer />

    </div>

  )

}

export default PublicEventos;