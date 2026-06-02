import { useEffect, useState } from "react";
import { getBilhetes } from "../services/bilheteService";

export function useBilhetes() {
  const [bilhetes, setBilhetes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const loadBilhetes = async () => {
    try {
      setLoading(true);

      const response = await getBilhetes();

      setBilhetes(response.data);

      setErro("");
    } catch (error) {
      setErro("Não foi possível carregar os bilhetes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBilhetes();
  }, []);

  return {
    bilhetes,
    setBilhetes,
    loading,
    erro,
    loadBilhetes,
  };
}
