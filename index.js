const express = require("express");
const app = express();

// Middleware para ler JSON
app.use(express.json());

/* =========================
   IMPORTAR CONTROLLERS
========================= */

const userController = require("./controllers/user.controller");
const authController = require("./controllers/auth.controller");
const carroController = require("./controllers/carro.controller"); // 🔥 corrigido
const inscricaoController = require("./controllers/inscricao.controller");
const bilheteController = require("./controllers/bilhete.controller");
const pagamentoController = require("./controllers/pagamento.controller");

/* =========================
   ROTAS (API)
========================= */

// 👤 USERS
app.get("/users", userController.getAllUsers);
app.post("/users", userController.createUser);

// 🔐 LOGIN
app.post("/login", authController.login);

// 🚗 CARROS (🔥 tudo em português agora)
app.post("/carros", carroController.createCarro);
app.get("/carros/:pessoaId", carroController.getCarrosByPessoa);

// 📝 INSCRIÇÕES
app.post("/inscricoes", inscricaoController.createInscricao);

// 🎟️ BILHETES
if (bilheteController.getAllBilhetes) {
  app.get("/bilhetes", bilheteController.getAllBilhetes);
}

// 💳 PAGAMENTOS
app.post("/pagamentos", pagamentoController.createPagamento);

/* =========================
   TESTE RÁPIDO
========================= */

app.get("/", (req, res) => {
  res.send("API a funcionar 🚀");
});

/* =========================
   INICIAR SERVIDOR
========================= */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});