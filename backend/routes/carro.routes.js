const express = require("express");
const router = express.Router();

const controller = require("../controllers/carro.controller");
const middlewareAuth = require("../../middleware");

router.get("/", middlewareAuth.checkToken, controller.getAllCarros);
router.get("/:id", middlewareAuth.checkToken, controller.getCarroById);
router.post("/", middlewareAuth.checkToken, middlewareAuth.upload.single("imagem"), controller.createCarro);
router.put("/:id", middlewareAuth.checkToken, middlewareAuth.upload.single("imagem"), controller.updateCarro);
router.delete("/:id", middlewareAuth.checkToken, controller.deleteCarro);

module.exports = router;