const express = require("express");
const router = express.Router();

const controller = require("../controllers/evento.controller");
const middlewareAuth = require("../middleware");

// TODOS autenticados podem ver
router.get("/", middlewareAuth.checkToken, controller.getAllEventos);
router.get("/:id", middlewareAuth.checkToken, controller.getEventoById);

// SÓ ADMIN pode criar
router.post("/", middlewareAuth.checkToken, middlewareAuth.checkAdmin, controller.createEvento);

// SÓ ADMIN pode editar
router.put("/:id", middlewareAuth.checkToken, middlewareAuth.checkAdmin, controller.updateEvento);

// SÓ ADMIN pode apagar
router.delete("/:id", middlewareAuth.checkToken, middlewareAuth.checkAdmin, controller.deleteEvento);

module.exports = router;