import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { getEventoById } from "../../services/eventService";

import { getUser } from "../../services/authUtils";

import PublicNavbar from "../../components/public/PublicNavbar";

import Footer from "../../components/public/Footer";

// ÍCONES
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTicketAlt,
  FaCar,
  FaArrowRight,
} from "react-icons/fa";

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
      alert("Apenas clientes podem comprar bilhetes.");

      return;
    }

    // guardar evento escolhido
    localStorage.setItem("eventoBilhete", evento.id_evento);

    // abrir perfil
    navigate("/profile");
  };

  if (!evento) {
    return (
      <div className="container py-5">
        <h2>Evento não encontrado</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <PublicNavbar />

      <div>
        {/* IMAGEM */}

        <div
          style={{
            position: "relative",
          }}
        >
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
              objectFit: "cover",
            }}
          />

          {/* overlay escuro */}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
            }}
          />

          {/* título sobre imagem */}

          <div
            className="container"
            style={{
              position: "absolute",
              bottom: "40px",
              left: 0,
              right: 0,
            }}
          >
            <h1
              style={{
                color: "#fff",
                fontSize: "3rem",
                fontWeight: "700",
              }}
            >
              {evento.nome}
            </h1>
          </div>
        </div>

        {/* CONTEÚDO */}

        <div className="container py-5">
          <div className="row g-4">
            {/* DESCRIÇÃO */}

            <div className="col-lg-8">
              <div
                className="card border-0 shadow-sm p-4 h-100"
                style={{
                  borderRadius: "20px",
                }}
              >
                <h4 className="mb-4 fw-bold">Sobre o evento</h4>

                <p
                  className="text-muted"
                  style={{
                    whiteSpace: "pre-line",
                    lineHeight: "1.9",
                    fontSize: "1.05rem",
                  }}
                >
                  {evento.descricao || "Sem descrição disponível."}
                </p>
              </div>
            </div>

            {/* SIDEBAR */}

            <div className="col-lg-4">
              <div
                className="card border-0 shadow-sm p-4"
                style={{
                  borderRadius: "20px",
                }}
              >
                <h4 className="mb-4 fw-bold">Informações</h4>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    style={{
                      backgroundColor: "#df9425",
                      width: "45px",
                      height: "45px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaMapMarkerAlt color="#111" />
                  </div>

                  <div>
                    <small className="text-muted">Local</small>

                    <p className="mb-0 fw-semibold">{evento.local_evento}</p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    style={{
                      backgroundColor: "#df9425",
                      width: "45px",
                      height: "45px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FaCalendarAlt color="#111" />
                  </div>

                  <div>
                    <small className="text-muted">Data</small>

                    <p className="mb-0 fw-semibold">{evento.data}</p>
                  </div>
                </div>

                <hr />

                {/* PREÇOS */}

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <FaTicketAlt color="#df9425" />

                      <span>Visitante</span>
                    </div>

                    <strong>{evento.preco_visitante}€</strong>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <FaCar color="#df9425" />

                      <span>Participante</span>
                    </div>

                    <strong>{evento.preco_participante}€</strong>
                  </div>
                </div>

                <button
                  className="btn w-100 mt-4 d-flex align-items-center justify-content-center gap-2"
                  onClick={handleComprar}
                  style={{
                    backgroundColor: "#111",
                    color: "#fff",
                    borderRadius: "14px",
                    padding: "14px",
                    fontWeight: "600",
                  }}
                >
                  Comprar Bilhete
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default EventDetails;
