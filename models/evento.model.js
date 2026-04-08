let eventos = [];

module.exports = {
  create: (evento) => {
    evento.id = eventos.length + 1;
    eventos.push(evento);
    return evento;
  },

  getAll: () => eventos
};