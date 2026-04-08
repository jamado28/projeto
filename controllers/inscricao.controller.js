const inscricaoModel = require("../models/inscricao.model");
const bilheteModel = require("../models/bilhete.model");

exports.createInscricao = (req, res) => {
  const inscricao = inscricaoModel.create(req.body);

  // 🔥 cria bilhete automaticamente
  const bilhete = bilheteModel.create({
    inscricaoId: inscricao.id,
    tipo: inscricao.tipo
  });

  res.json({
    inscricao,
    bilhete
  });
};