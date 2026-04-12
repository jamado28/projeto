const express = require("express");
const router = express.Router();

const controller = require("../controllers/evento.controller");
const middlewareAuth = require("../middleware");

router.get("/", controller.getAllEventos); // público
router.get("/:id",  middlewareAuth.checkToken, controller.getEventoById);

router.get("/user/:id", middlewareAuth.checkToken, controller.getEventosByUser); //Para cada organizador ver os seus de todos os anos

router.post("/", middlewareAuth.checkToken, controller.createEvento);

router.put("/:id", middlewareAuth.checkToken, controller.updateEvento);

router.delete("/:id", middlewareAuth.checkToken, controller.deleteEvento);

module.exports = router;