const express = require("express");
const router = express.Router();

const controller = require("../controllers/pessoa.controller");
const middlewareAuth = require("../middleware");

// autenticado pode ver
router.get("/", middlewareAuth.checkToken, controller.getAllPessoas);
router.get("/:id", middlewareAuth.checkToken, controller.getPessoaById);

// qualquer user pode criar (registo)
router.post("/", middlewareAuth.checkToken, controller.createPessoa);

// pode atualizar (simples)
router.put("/:id", middlewareAuth.checkToken, controller.updatePessoa);

// SÓ ADMIN pode apagar
router.delete("/:id", middlewareAuth.checkToken, middlewareAuth.checkAdmin, controller.deletePessoa);

module.exports = router;