// ÍCONES
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaCarSide,
} from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="text-white"
      style={{
        background: "linear-gradient(180deg, #111827 0%, #0f172a 100%)",
      }}
    >
      <div className="container py-5">
        <div className="row gy-5">
          {/* LOGO */}

          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <h3 className="fw-bold mb-0">AutoEventos</h3>
            </div>

            <p
              className="text-light"
              style={{
                lineHeight: "1.8",
              }}
            >
              Plataforma moderna de gestão de eventos automóveis, inscrições,
              bilhetes e pagamentos.
            </p>
          </div>

          {/* CONTACTOS */}

          <div className="col-lg-4">
            <h5 className="fw-bold mb-4">Contactos</h5>

            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <FaEnvelope color="#df9425" />
                </div>

                <span>geral@autoeventos.pt</span>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <FaMapMarkerAlt color="#df9425" />
                </div>

                <span>Coimbra, Portugal</span>
              </div>
            </div>
          </div>

          {/* REDES */}

          <div className="col-lg-4">
            <h5 className="fw-bold mb-4">Redes Sociais</h5>

            <div className="d-flex gap-3">
              <button
                className="btn"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: "none",
                }}
              >
                <FaInstagram />
              </button>

              <button
                className="btn"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: "none",
                }}
              >
                <FaFacebookF />
              </button>
            </div>
          </div>
        </div>

        {/* LINHA */}

        <hr
          className="my-5"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
          }}
        />

        {/* COPYRIGHT */}

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="mb-0 text-light">
            © 2026 AutoEventos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
