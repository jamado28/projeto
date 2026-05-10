import api from "./api";

export const getBilhetes = async () => {

  const response = await api.get("/bilhetes");

  return response.data;

}

export const createBilhete = async (dados) => {

  const response = await api.post("/bilhetes", dados);

  return response.data;

}

export const deleteBilhete = async (id) => {

  const response = await api.delete(`/bilhetes/${id}`);

  return response.data;

}