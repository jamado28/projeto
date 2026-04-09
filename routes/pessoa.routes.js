const express = require("express");
const router = express.Router();

const controller = require("../controllers/pessoa.controller");
const middlewareAuth = require("../middleware");

router.get("/", middlewareAuth.checkToken, controller.getAllPessoas);
router.get("/:id", middlewareAuth.checkToken, controller.getPessoaById);
router.post("/", middlewareAuth.checkToken, controller.createPessoa);
router.put("/:id", middlewareAuth.checkToken, controller.updatePessoa);
router.delete("/:id", middlewareAuth.checkToken, controller.deletePessoa);

module.exports = router;