import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";

import Dashboard from "../pages/private/Dashboard";
import Eventos from "../pages/private/Eventos";
import Pessoas from "../pages/private/Pessoas";
import Carros from "../pages/private/Carros";
import Bilhetes from "../pages/private/Bilhetes";
import Pagamentos from "../pages/private/Pagamentos";
import EventDetails from "../pages/public/EventDetails";

function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard"element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>

        <Route path="/eventos" element={<ProtectedRoute><Eventos /></ProtectedRoute>} />

        <Route path="/pessoas" element={<RoleProtectedRoute allowedRoles={["admin", "organizador", "cliente"]}><Pessoas /></RoleProtectedRoute>} />

        <Route path="/carros" element={<RoleProtectedRoute allowedRoles={["admin", "organizador", "cliente"]}><Carros /></RoleProtectedRoute>} />

        <Route path="/bilhetes" element={<ProtectedRoute><Bilhetes /></ProtectedRoute>} />

        <Route path="/pagamentos" element={<RoleProtectedRoute allowedRoles={["admin", "organizador" , "cliente"]}><Pagamentos /></RoleProtectedRoute>}/>

        <Route path="/eventos/:id" element={<EventDetails />}/>
      </Routes>

    </BrowserRouter>
  )

}

export default AppRoutes;