const express = require("express");
const router = express.Router();

const controller = require("../controllers/pagamento.controller");
const middlewareAuth = require("../middleware");

// Só empresa OU admin vê pagamentos
router.get("/", middlewareAuth.checkToken, middlewareAuth.checkEmpresa, controller.getAllPagamentos);

router.get("/:id", middlewareAuth.checkToken, middlewareAuth.checkEmpresa, controller.getPagamentoById);

// Qualquer user pode pagar
router.post("/", middlewareAuth.checkToken, controller.createPagamento);

// Só empresa/admin altera
router.put("/:id", middlewareAuth.checkToken, middlewareAuth.checkEmpresa, controller.updatePagamento);

// Só admin apaga
router.delete("/:id", middlewareAuth.checkToken, middlewareAuth.checkAdmin, controller.deletePagamento);

module.exports = router;