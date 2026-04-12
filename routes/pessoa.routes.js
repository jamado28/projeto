const express = require("express");
const router = express.Router();

const controller = require("../controllers/pessoa.controller");
const middlewareAuth = require("../middleware");

// ver pessoas
router.get("/", middlewareAuth.checkToken, controller.getAllPessoas);
router.get("/:id", middlewareAuth.checkToken, controller.getPessoaById);

// editar o próprio perfil
router.put("/:id", middlewareAuth.checkToken, controller.updatePessoa);

module.exports = router;