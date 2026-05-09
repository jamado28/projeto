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

export const getUsers = () => {

  return api.get("/auth/users");

};

export const updateUser = (id, dados) => {

  return api.put(
    `/auth/users/${id}`,
    dados
  );

};

export const deleteUser = (id) => {

  return api.delete(
    `/auth/${id}`
  );

};