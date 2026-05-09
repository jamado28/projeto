import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import PublicEventos from "../pages/public/PublicEventos";
import EventDetails from "../pages/public/EventDetails";

import Eventos from "../pages/private/Eventos";
import Pessoas from "../pages/private/Pessoas";
import Carros from "../pages/private/Carros";
import Bilhetes from "../pages/private/Bilhetes";
import Pagamentos from "../pages/private/Pagamentos";
import Profile from "../pages/private/Profile";

function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/eventos" element={<ProtectedRoute><Eventos /></ProtectedRoute>} />

        <Route path="/pessoas" element={<RoleProtectedRoute allowedRoles={["admin", "organizador", "cliente"]}><Pessoas /></RoleProtectedRoute>} />

        <Route path="/carros" element={<RoleProtectedRoute allowedRoles={["admin", "organizador", "cliente"]}><Carros /></RoleProtectedRoute>} />

        <Route path="/bilhetes" element={<ProtectedRoute><Bilhetes /></ProtectedRoute>} />

        <Route path="/pagamentos" element={<RoleProtectedRoute allowedRoles={["admin", "organizador" , "cliente"]}><Pagamentos /></RoleProtectedRoute>}/>

        <Route path="/eventos/:id" element={<EventDetails />}/>

        <Route path="/eventos-publicos" element={<PublicEventos />}/>

        <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>

      </Routes>

    </BrowserRouter>
  )

}

export default AppRoutes;