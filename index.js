const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");

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
app.use("/api", require("./routes/evento.routes"));
app.use("/api", require("./routes/pessoa.routes"));
app.use("/api", require("./routes/carro.routes"));
app.use("/api", require("./routes/bilhete.routes"));
app.use("/api", require("./routes/pagamento.routes"));
app.use("/api/auth", require("./routes/auth.routes"));


// SERVER
app.listen(app.get("port"), () => {
  console.log("Servidor a correr na porta " + app.get("port"));
});