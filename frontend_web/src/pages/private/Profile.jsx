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
            return (<Bilhetes setSection={setSection}/>);

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

            case "pessoas":
            return <Pessoas />;

            case "carros":
            return <Carros />;

            case "bilhetes":
            return <Bilhetes />;

            case "pagamentos":
            return <Pagamentos />;

            case "users":
            return <Users />;

            default:
            return <Eventos />;

        }

        }

    };

    return (

        <div>

        <PublicNavbar />

        <div className="container-fluid">

            <div className="row">

            {/* SIDEBAR */}

            <div
            className="col-md-2 text-white p-0"
            style={{
                minHeight: "100vh",
                background:
                "linear-gradient(180deg, #111827 0%, #0f172a 100%)"
            }}
            >

            <div className="d-flex flex-column h-100">

                {/* TOPO */}

                <div className="p-4 text-center border-bottom border-secondary">

                <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    backgroundColor: "#f3f4f6",
                    color: "#111827",
                    fontWeight: "bold",
                    fontSize: "24px"
                    }}
                >

                    {user.email?.charAt(0).toUpperCase()}

                </div>

                <h5 className="mb-1">

                    {user.email}

                </h5>

                <small className="text-secondary">

                    {user.role}

                </small>

                </div>

                {/* MENU */}

                <div className="p-3 flex-grow-1">

                <small className="text-secondary">
                    ÁREA PESSOAL
                </small>

                <div className="d-flex flex-column gap-2 mt-3">

                    {/* CLIENTE */}

                    {user.role === "cliente" && (

                    <>

                        <button
                        className={`btn text-start ${
                            section === "dados"
                            ? "btn-danger"
                            : "btn-outline-light"
                        }`}
                        onClick={() => setSection("dados")}
                        >
                        Conta
                        </button>

                        <button
                        className={`btn text-start ${
                            section === "carros"
                            ? "btn-danger"
                            : "btn-outline-light"
                        }`}
                        onClick={() => setSection("carros")}
                        >
                        Veículos
                        </button>

                        <button
                        className={`btn text-start ${
                            section === "bilhetes"
                            ? "btn-danger"
                            : "btn-outline-light"
                        }`}
                        onClick={() => setSection("bilhetes")}
                        >
                        Bilhetes
                        </button>

                        <button
                        className={`btn text-start ${
                            section === "pagamentos"
                            ? "btn-danger"
                            : "btn-outline-light"
                        }`}
                        onClick={() => setSection("pagamentos")}
                        >
                        Pagamentos
                        </button>

                    </>

                    )}

                    {/* ORGANIZADOR */}

                    {user.role === "organizador" && (

                    <>

                        <button
                        className={`btn text-start ${
                            section === "eventos"
                            ? "btn-danger"
                            : "btn-outline-light"
                        }`}
                        onClick={() => setSection("eventos")}
                        >
                        Eventos
                        </button>

                        <button
                        className={`btn text-start ${
                            section === "pagamentos"
                            ? "btn-danger"
                            : "btn-outline-light"
                        }`}
                        onClick={() => setSection("pagamentos")}
                        >
                        Pagamentos
                        </button>

                    </>

                    )}

                    {/* ADMIN */}

                    {user.role === "admin" && (

                    <>

                        <button
                        className={`btn text-start ${
                            section === "eventos"
                            ? "btn-danger"
                            : "btn-outline-light"
                        }`}
                        onClick={() => setSection("eventos")}
                        >
                        Eventos
                        </button>

                        <button
                        className={`btn text-start ${
                            section === "users"
                            ? "btn-danger"
                            : "btn-outline-light"
                        }`}
                        onClick={() => setSection("users")}
                        >
                        Utilizadores
                        </button>

                        <button
                        className={`btn text-start ${
                            section === "pessoas"
                            ? "btn-danger"
                            : "btn-outline-light"
                        }`}
                        onClick={() => setSection("pessoas")}
                        >
                        Pessoas
                        </button>

                        <button
                        className={`btn text-start ${
                            section === "carros"
                            ? "btn-danger"
                            : "btn-outline-light"
                        }`}
                        onClick={() => setSection("carros")}
                        >
                        Carros
                        </button>

                        <button
                        className={`btn text-start ${
                            section === "bilhetes"
                            ? "btn-danger"
                            : "btn-outline-light"
                        }`}
                        onClick={() => setSection("bilhetes")}
                        >
                        Bilhetes
                        </button>

                        <button
                        className={`btn text-start ${
                            section === "pagamentos"
                            ? "btn-danger"
                            : "btn-outline-light"
                        }`}
                        onClick={() => setSection("pagamentos")}
                        >
                        Pagamentos
                        </button>

                    </>

                    )}

                </div>

                </div>

                {/* LOGOUT */}

                <div className="p-3 border-top border-secondary">

                <button
                    className="btn btn-outline-light w-100"
                    onClick={logout}
                >
                    Sair
                </button>

                </div>

            </div>

            </div>

            {/* CONTEÚDO */}

            <div className="col-md-10 p-5">

                {renderSection()}

            </div>

            </div>

        </div>

        <Footer />

        </div>

    )

    }

export default Profile;