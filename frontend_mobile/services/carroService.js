import api from "./api";

export const getCarros = async () => {
  const response = await api.get("/carros");

  return response.data;
};

export const createCarro = async (dados) => {
  const response = await api.post("/carros", dados);

  return response.data;
};

export const updateCarro = async (id, dados) => {
  const response = await api.put(`/carros/${id}`, dados);

  return response.data;
};

export const deleteCarro = async (id) => {
  const response = await api.delete(`/carros/${id}`);

  return response.data;
};
