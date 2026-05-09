import api from "./api";

export const login = async (email, password) => {

  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;

}

export const register = async (dados) => {

  const response = await api.post(
    "/auth/register",
    dados
  );

  return response.data;

}