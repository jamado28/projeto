const express = require("express");
const router = express.Router();

const controller = require("../controllers/carro.controller");
const middlewareAuth = require("../middleware");

router.get("/", middlewareAuth.checkToken, controller.getAllCarros);
router.get("/:id", middlewareAuth.checkToken, controller.getCarroById);
router.post("/", middlewareAuth.checkToken, controller.createCarro);
router.put("/:id", middlewareAuth.checkToken, controller.updateCarro);
router.delete("/:id", middlewareAuth.checkToken, controller.deleteCarro);

module.exports = router;