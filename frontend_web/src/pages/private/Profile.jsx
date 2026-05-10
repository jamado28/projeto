import { useState } from "react";

import PublicNavbar from "../../components/public/PublicNavbar";

import Footer from "../../components/public/Footer";

import { getUser } from "../../services/authUtils";

import Pessoas from "./Pessoas";

import Carros from "./Carros";

import Bilhetes from "./Bilhetes";

import Pagamentos from "./Pagamentos";

import Eventos from "./Eventos";

import Users from "./Users";

import { useNavigate } from "react-router-dom";

// ÍCONES
import {
  FaUser,
  FaCarSide,
  FaTicketAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUsers,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  const user = getUser();

  const [section, setSection] = useState("dados");

  const renderSection = () => {
    // CLIENTE

    if (user.role === "cliente") {
      switch (section) {
        case "dados":
          return <Pessoas />;

        case "carros":
          return <Carros />;

        case "bilhetes":
          return <Bilhetes setSection={setSection} />;

        case "pagamentos":
          return <Pagamentos />;

        default:
          return <Pessoas />;
      }
    }

    // ORGANIZADOR

    if (user.role === "organizador") {
      switch (section) {
        case "eventos":
          return <Eventos />;

        case "carros":
          return <Carros />;

        case "pagamentos":
          return <Pagamentos />;

        default:
          return <Eventos />;
      }
    }

    // ADMIN

    if (user.role === "admin") {
      switch (section) {
        case "eventos":
          return <Eventos />;

        case "users":
          return <Users />;

        case "pessoas":
          return <Pessoas />;

        case "carros":
          return <Carros />;

        case "bilhetes":
          return <Bilhetes />;

        case "pagamentos":
          return <Pagamentos />;

        default:
          return <Eventos />;
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
      }}
    >
      <PublicNavbar />

      <div className="container-fluid">
        <div className="row">
          {/* SIDEBAR */}

          <div
            className="col-lg-2 col-md-3 p-0"
            style={{
              minHeight: "100vh",
              background: "linear-gradient(180deg, #111827 0%, #0f172a 100%)",
            }}
          >
            <div className="d-flex flex-column h-100 text-white">
              {/* TOPO */}

              <div className="p-4 text-center border-bottom border-secondary">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#df9425",
                    color: "#111",
                    fontWeight: "bold",
                    fontSize: "30px",
                  }}
                >
                  {user.email?.charAt(0).toUpperCase()}
                </div>

                <h5 className="fw-bold mb-1">{user.email}</h5>

                <div
                  className="d-inline-flex align-items-center gap-2 mt-2 px-3 py-2"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                  }}
                >
                  <FaUserShield />

                  {user.role}
                </div>
              </div>

              {/* MENU */}

              <div className="p-3 flex-grow-1">
                <small className="text-secondary fw-semibold">
                  ÁREA PESSOAL
                </small>

                <div className="d-flex flex-column gap-2 mt-4">
                  {/* CLIENTE */}

                  {user.role === "cliente" && (
                    <>
                      <button
                        className={`btn text-start d-flex align-items-center gap-3 ${
                          section === "dados" ? "" : "btn-outline-light"
                        }`}
                        onClick={() => setSection("dados")}
                        style={{
                          backgroundColor:
                            section === "dados" ? "#df9425" : "transparent",
                          color: section === "dados" ? "#111" : "#fff",
                          borderRadius: "14px",
                          padding: "12px 16px",
                          fontWeight: "600",
                          border: section === "dados" ? "none" : "",
                        }}
                      >
                        <FaUser />
                        Conta
                      </button>

                      <button
                        className={`btn text-start d-flex align-items-center gap-3 ${
                          section === "carros" ? "" : "btn-outline-light"
                        }`}
                        onClick={() => setSection("carros")}
                        style={{
                          backgroundColor:
                            section === "carros" ? "#df9425" : "transparent",
                          color: section === "carros" ? "#111" : "#fff",
                          borderRadius: "14px",
                          padding: "12px 16px",
                          fontWeight: "600",
                          border: section === "carros" ? "none" : "",
                        }}
                      >
                        <FaCarSide />
                        Veículos
                      </button>

                      <button
                        className={`btn text-start d-flex align-items-center gap-3 ${
                          section === "bilhetes" ? "" : "btn-outline-light"
                        }`}
                        onClick={() => setSection("bilhetes")}
                        style={{
                          backgroundColor:
                            section === "bilhetes" ? "#df9425" : "transparent",
                          color: section === "bilhetes" ? "#111" : "#fff",
                          borderRadius: "14px",
                          padding: "12px 16px",
                          fontWeight: "600",
                          border: section === "bilhetes" ? "none" : "",
                        }}
                      >
                        <FaTicketAlt />
                        Bilhetes
                      </button>

                      <button
                        className={`btn text-start d-flex align-items-center gap-3 ${
                          section === "pagamentos" ? "" : "btn-outline-light"
                        }`}
                        onClick={() => setSection("pagamentos")}
                        style={{
                          backgroundColor:
                            section === "pagamentos"
                              ? "#df9425"
                              : "transparent",
                          color: section === "pagamentos" ? "#111" : "#fff",
                          borderRadius: "14px",
                          padding: "12px 16px",
                          fontWeight: "600",
                          border: section === "pagamentos" ? "none" : "",
                        }}
                      >
                        <FaMoneyBillWave />
                        Pagamentos
                      </button>
                    </>
                  )}

                  {/* ORGANIZADOR */}

                  {user.role === "organizador" && (
                    <>
                      <button
                        className={`btn text-start d-flex align-items-center gap-3 ${
                          section === "eventos" ? "" : "btn-outline-light"
                        }`}
                        onClick={() => setSection("eventos")}
                        style={{
                          backgroundColor:
                            section === "eventos" ? "#df9425" : "transparent",
                          color: section === "eventos" ? "#111" : "#fff",
                          borderRadius: "14px",
                          padding: "12px 16px",
                          fontWeight: "600",
                          border: section === "eventos" ? "none" : "",
                        }}
                      >
                        <FaCalendarAlt />
                        Eventos
                      </button>

                      <button
                        className={`btn text-start d-flex align-items-center gap-3 ${
                          section === "carros" ? "" : "btn-outline-light"
                        }`}
                        onClick={() => setSection("carros")}
                        style={{
                          backgroundColor:
                            section === "carros" ? "#df9425" : "transparent",
                          color: section === "carros" ? "#111" : "#fff",
                          borderRadius: "14px",
                          padding: "12px 16px",
                          fontWeight: "600",
                          border: section === "carros" ? "none" : "",
                        }}
                      >
                        <FaCarSide />
                        Carros
                      </button>

                      <button
                        className={`btn text-start d-flex align-items-center gap-3 ${
                          section === "pagamentos" ? "" : "btn-outline-light"
                        }`}
                        onClick={() => setSection("pagamentos")}
                        style={{
                          backgroundColor:
                            section === "pagamentos"
                              ? "#df9425"
                              : "transparent",
                          color: section === "pagamentos" ? "#111" : "#fff",
                          borderRadius: "14px",
                          padding: "12px 16px",
                          fontWeight: "600",
                          border: section === "pagamentos" ? "none" : "",
                        }}
                      >
                        <FaMoneyBillWave />
                        Pagamentos
                      </button>
                    </>
                  )}

                  {/* ADMIN */}

                  {user.role === "admin" && (
                    <>
                      <button
                        className={`btn text-start d-flex align-items-center gap-3 ${
                          section === "eventos" ? "" : "btn-outline-light"
                        }`}
                        onClick={() => setSection("eventos")}
                        style={{
                          backgroundColor:
                            section === "eventos" ? "#df9425" : "transparent",
                          color: section === "eventos" ? "#111" : "#fff",
                          borderRadius: "14px",
                          padding: "12px 16px",
                          fontWeight: "600",
                          border: section === "eventos" ? "none" : "",
                        }}
                      >
                        <FaCalendarAlt />
                        Eventos
                      </button>

                      <button
                        className={`btn text-start d-flex align-items-center gap-3 ${
                          section === "users" ? "" : "btn-outline-light"
                        }`}
                        onClick={() => setSection("users")}
                        style={{
                          backgroundColor:
                            section === "users" ? "#df9425" : "transparent",
                          color: section === "users" ? "#111" : "#fff",
                          borderRadius: "14px",
                          padding: "12px 16px",
                          fontWeight: "600",
                          border: section === "users" ? "none" : "",
                        }}
                      >
                        <FaUsers />
                        Utilizadores
                      </button>

                      <button
                        className={`btn text-start d-flex align-items-center gap-3 ${
                          section === "pessoas" ? "" : "btn-outline-light"
                        }`}
                        onClick={() => setSection("pessoas")}
                        style={{
                          backgroundColor:
                            section === "pessoas" ? "#df9425" : "transparent",
                          color: section === "pessoas" ? "#111" : "#fff",
                          borderRadius: "14px",
                          padding: "12px 16px",
                          fontWeight: "600",
                          border: section === "pessoas" ? "none" : "",
                        }}
                      >
                        <FaUser />
                        Pessoas
                      </button>

                      <button
                        className={`btn text-start d-flex align-items-center gap-3 ${
                          section === "carros" ? "" : "btn-outline-light"
                        }`}
                        onClick={() => setSection("carros")}
                        style={{
                          backgroundColor:
                            section === "carros" ? "#df9425" : "transparent",
                          color: section === "carros" ? "#111" : "#fff",
                          borderRadius: "14px",
                          padding: "12px 16px",
                          fontWeight: "600",
                          border: section === "carros" ? "none" : "",
                        }}
                      >
                        <FaCarSide />
                        Carros
                      </button>

                      <button
                        className={`btn text-start d-flex align-items-center gap-3 ${
                          section === "bilhetes" ? "" : "btn-outline-light"
                        }`}
                        onClick={() => setSection("bilhetes")}
                        style={{
                          backgroundColor:
                            section === "bilhetes" ? "#df9425" : "transparent",
                          color: section === "bilhetes" ? "#111" : "#fff",
                          borderRadius: "14px",
                          padding: "12px 16px",
                          fontWeight: "600",
                          border: section === "bilhetes" ? "none" : "",
                        }}
                      >
                        <FaTicketAlt />
                        Bilhetes
                      </button>

                      <button
                        className={`btn text-start d-flex align-items-center gap-3 ${
                          section === "pagamentos" ? "" : "btn-outline-light"
                        }`}
                        onClick={() => setSection("pagamentos")}
                        style={{
                          backgroundColor:
                            section === "pagamentos"
                              ? "#df9425"
                              : "transparent",
                          color: section === "pagamentos" ? "#111" : "#fff",
                          borderRadius: "14px",
                          padding: "12px 16px",
                          fontWeight: "600",
                          border: section === "pagamentos" ? "none" : "",
                        }}
                      >
                        <FaMoneyBillWave />
                        Pagamentos
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* LOGOUT */}

              <div className="p-3 border-top border-secondary">
                <button
                  className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2"
                  onClick={logout}
                  style={{
                    borderRadius: "14px",
                    padding: "12px",
                    fontWeight: "600",
                  }}
                >
                  <FaSignOutAlt />
                  Sair
                </button>
              </div>
            </div>
          </div>

          {/* CONTEÚDO */}

          <div className="col-lg-10 col-md-9 p-4 p-lg-5">{renderSection()}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
