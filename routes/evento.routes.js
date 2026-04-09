const express = require("express");
const router = express.Router();

const controller = require("../controllers/evento.controller");
const middlewareAuth = require("../middleware");

router.get("/", middlewareAuth.checkToken, controller.getAllEventos);
router.get("/:id", middlewareAuth.checkToken, controller.getEventoById);
router.post("/", middlewareAuth.checkToken, controller.createEvento);
router.put("/:id", middlewareAuth.checkToken, controller.updateEvento);
router.delete("/:id", middlewareAuth.checkToken, controller.deleteEvento);

module.exports = router;