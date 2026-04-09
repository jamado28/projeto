const express = require("express");
const router = express.Router();

const controller = require("../controllers/bilhete.controller");
const middlewareAuth = require("../middleware");

router.get("/", middlewareAuth.checkToken, controller.getAllBilhetes);
router.get("/:id", middlewareAuth.checkToken, controller.getBilheteById);
router.post("/", middlewareAuth.checkToken, controller.createBilhete);
router.put("/:id", middlewareAuth.checkToken, controller.updateBilhete);
router.delete("/:id", middlewareAuth.checkToken, controller.deleteBilhete);

module.exports = router;