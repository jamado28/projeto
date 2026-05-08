const express = require("express");
const router = express.Router();

const controller = require("../controllers/pagamento.controller");
const middlewareAuth = require("../middleware");

router.get("/", middlewareAuth.checkToken, controller.getAllPagamentos);

router.get("/:id", middlewareAuth.checkToken, controller.getPagamentoById);

router.post("/", middlewareAuth.checkToken, controller.createPagamento);

router.delete("/:id", middlewareAuth.checkToken, middlewareAuth.checkAdmin,controller.deletePagamento);

module.exports = router;