import { useEffect, useState } from "react";
import { getCarros } from "../services/carroService";

export function useCarros() {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const loadCarros = async () => {
    try {
      setLoading(true);

      const response = await getCarros();

      setCarros(response.data);
    } catch (error) {
      setErro("Não foi possível carregar os veículos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCarros();
  }, []);

  return {
    carros,
    setCarros,
    loading,
    erro,
    loadCarros,
  };
}
