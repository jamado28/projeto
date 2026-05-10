import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { getEventosPublicos } from "../../services/eventService";

import PublicNavbar from "../../components/public/PublicNavbar";

import Footer from "../../components/public/Footer";

// ÍCONES
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

function PublicEventos() {
  const [eventos, setEventos] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const eventosPerPage = 9;

  useEffect(() => {
    loadEventos();
  }, []);

  const loadEventos = async () => {
    try {
      const response = await getEventosPublicos();

      setEventos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // paginação

  const lastIndex = currentPage * eventosPerPage;

  const firstIndex = lastIndex - eventosPerPage;

  const currentEventos = eventos.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(eventos.length / eventosPerPage);

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <PublicNavbar />

      <div className="container py-5">
        <h1
          className="mb-5 text-center fw-bold"
          style={{
            fontSize: "3rem",
          }}
        >
          Todos os Eventos
        </h1>

        <div className="row">
          {currentEventos.map((evento) => (
            <div key={evento.id_evento} className="col-lg-4 col-md-6 mb-4">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "0.3s",
                }}
              >
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
                    objectFit: "cover",
                  }}
                />

                <div className="card-body d-flex flex-column p-4">
                  <h4 className="fw-bold mb-3">{evento.nome}</h4>

                  <p className="d-flex align-items-center gap-2 text-muted">
                    <FaMapMarkerAlt color="#df9425" />
                    {evento.local_evento}
                  </p>

                  <p className="d-flex align-items-center gap-2 text-muted">
                    <FaCalendarAlt color="#df9425" />
                    {evento.data}
                  </p>

                  <div className="mt-auto">
                    <Link
                      to={`/eventos/${evento.id_evento}`}
                      className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{
                        backgroundColor: "#111",
                        color: "#fff",
                        borderRadius: "12px",
                        padding: "12px",
                        fontWeight: "600",
                      }}
                    >
                      Ver Evento
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINAÇÃO */}

        <div className="d-flex justify-content-center mt-5 gap-2 flex-wrap">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn ${
                currentPage === index + 1 ? "btn-dark" : "btn-outline-dark"
              }`}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "12px",
                fontWeight: "600",
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PublicEventos;
