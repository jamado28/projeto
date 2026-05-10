import api from "./api";

export const getPagamentos = async () => {
  const response = await api.get("/pagamentos");

  return response.data;
};

export const createPagamento = async (dados) => {
  const response = await api.post("/pagamentos", dados);

  return response.data;
};

export const deletePagamento = async (id) => {
  const response = await api.delete(`/pagamentos/${id}`);

  return response.data;
};
