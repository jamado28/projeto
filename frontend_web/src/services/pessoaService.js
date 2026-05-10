import api from "./api";

export const getPessoas = async () => {
  const response = await api.get("/pessoas");

  return response.data;
};

export const updatePessoa = async (id, dados) => {
  const response = await api.put(`/pessoas/${id}`, dados);

  return response.data;
};
