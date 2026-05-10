import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";
import { jwtDecode } from "jwt-decode";

export const getUser = async () => {

  try {

    const token =
      await AsyncStorage.getItem("token");

    if (!token) {

      return null;

    }

    return jwtDecode(token);

  } catch (error) {

    return null;

  }

};

export const login = async (
  email,
  password
) => {

  const response = await api.post(
    "/auth/login",
    {
      email,
      password
    }
  );

  return response.data;

};

export const register = async (
  dados
) => {

  const response = await api.post(
    "/auth/register",
    dados
  );

  return response.data;

};

export const getUsers = async () => {

  const response =
    await api.get("/auth/users");

  return response.data;

};

export const updateUser = async (
  id,
  dados
) => {

  const response =
    await api.put(
      `/auth/users/${id}`,
      dados
    );

  return response.data;

};

export const deleteUser = async (
  id
) => {

  const response =
    await api.delete(
      `/auth/${id}`
    );

  return response.data;

};