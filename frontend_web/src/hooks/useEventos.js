import { useEffect, useState } from "react";
import { getEventos } from "../services/eventService";

export function useEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const loadEventos = async () => {
    try {
      setLoading(true);

      const response = await getEventos();

      setEventos(response.data);

      setErro("");
    } catch (error) {
      setErro("Não foi possível carregar os eventos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEventos();
  }, []);

  return {
    eventos,
    setEventos,
    loading,
    erro,
    setErro,
    loadEventos,
  };
}
