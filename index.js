const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./backend/config/database");

const port = 3000;

// CONFIG
app.set("port", process.env.PORT || port);
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


// LIGAÇÃO À BD
sequelize.authenticate()
  .then(() => console.log("Ligado à base de dados"))
  .catch((err) => console.log("Erro na ligação:", err));

//sequelize.sync();


// ROUTES
app.use("/api/pessoas", require("./backend/routes/pessoa.routes"));
app.use("/api/carros", require("./backend/routes/carro.routes"));
app.use("/api/eventos", require("./backend/routes/evento.routes"));
app.use("/api/bilhetes", require("./backend/routes/bilhete.routes"));
app.use("/api/pagamentos", require("./backend/routes/pagamento.routes"));
app.use("/api/auth", require("./backend/routes/auth.routes"));
app.use("/uploads",express.static("backend/uploads"));

// SERVER
app.listen(app.get("port"), () => {
  console.log("Servidor a correr na porta " + app.get("port"));
});