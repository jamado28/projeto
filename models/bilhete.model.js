let bilhetes = [];

module.exports = {
  create: (bilhete) => {
    bilhete.id = bilhetes.length + 1;
    bilhetes.push(bilhete);
    return bilhete;
  }
};