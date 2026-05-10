import axios from "axios";

import AsyncStorage
from "@react-native-async-storage/async-storage";

const api = axios.create({
  
  baseURL: "http://10.192.149.179:3000/api"
  //baseURL: "http://192.168.1.175:3000/api"

});

// TOKEN AUTOMÁTICO

api.interceptors.request.use(

  async (config) => {

    const token =
      await AsyncStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  }

);

export default api;