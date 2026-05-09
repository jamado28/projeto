import api from "./api";

export const getEventos = async () => {

  const response = await api.get("/eventos");

  return response.data;

}
export const createEvento = async (dados) => {

  const response = await api.post("/eventos", dados);

  return response.data;

}
export const deleteEvento = async (id) => {

  const response = await api.delete(`/eventos/${id}`);

  return response.data;

}

export const updateEvento = async (id, dados) => {

  const response = await api.put(`/eventos/${id}`, dados);

  return response.data;

}

export const getEventoById = async (id) => {

  const response = await api.get(`/eventos/${id}`);

  return response.data;

}