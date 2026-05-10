import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { getEventosPublicos } from "../../services/eventService";

import PublicNavbar from "../../components/public/PublicNavbar";
import heroImg from "../../assets/hero.jpg";
import ctaImg from "../../assets/cta.jpg";
import Footer from "../../components/public/Footer";

// ÍCONES
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaCarSide,
} from "react-icons/fa";

function Home() {
  const [eventos, setEventos] = useState([]);

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

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
      }}
    >
      <PublicNavbar />

      {/* HERO */}
      <div
        style={{
          background: `
            linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
            url(${heroImg})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container text-center text-white">
          <div>
            <h1 className="display-2 fw-bold mb-4">AutoEventos</h1>

            <p
              className="lead mb-5"
              style={{
                maxWidth: "700px",
                margin: "0 auto",
                fontSize: "1.3rem",
              }}
            >
              Descubra eventos automóveis, compre bilhetes e participe nos
              melhores encontros e exposições.
            </p>

            <Link
              to="/eventos-publicos"
              className="btn btn-lg d-inline-flex align-items-center gap-3"
              style={{
                backgroundColor: "#df9425",
                color: "#111",
                borderRadius: "14px",
                padding: "15px 30px",
                fontWeight: "700",
                border: "none",
              }}
            >
              Explorar Eventos
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* EVENTOS */}

      <div className="container py-5">
        <div className="text-center mb-5">
          <h2
            className="fw-bold"
            style={{
              fontSize: "2.5rem",
            }}
          >
            Eventos Disponíveis
          </h2>

          <p className="text-muted">
            Veja alguns dos próximos eventos automóveis
          </p>
        </div>

        <div className="row">
          {eventos.slice(0, 6).map((evento) => (
            <div key={evento.id_evento} className="col-lg-4 col-md-6 mb-4">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "22px",
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
                        borderRadius: "14px",
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

        <div className="text-center mt-4">
          <Link
            to="/eventos-publicos"
            className="btn btn-lg"
            style={{
              border: "2px solid #111",
              borderRadius: "14px",
              padding: "12px 28px",
              fontWeight: "600",
            }}
          >
            Ver Mais Eventos
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div
        className="py-5"
        style={{
          background: `
            linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)),
            url(${ctaImg})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container text-center text-white">
          <div
            className="mb-4"
            style={{
              fontSize: "4rem",
              color: "#df9425",
            }}
          >
            <FaCarSide />
          </div>

          <h2 className="mb-3 fw-bold">Quer ajuda a gerir o seu evento?</h2>

          <p
            className="mb-4 text-light"
            style={{
              maxWidth: "650px",
              margin: "0 auto",
            }}
          >
            Organizamos e gerimos eventos automóveis consigo, desde inscrições,
            bilhetes, pagamentos e participantes.
          </p>

          <button
            className="btn btn-lg"
            style={{
              backgroundColor: "#df9425",
              color: "#111",
              borderRadius: "14px",
              padding: "14px 30px",
              fontWeight: "700",
              border: "none",
            }}
          >
            Contacte-nos
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
