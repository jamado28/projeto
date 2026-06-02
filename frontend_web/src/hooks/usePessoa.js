import { useEffect, useState } from "react";
import { getPessoas } from "../services/pessoaService";

export function usePessoas(role) {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const loadPessoas = async () => {
    try {
      setLoading(true);

      const response = await getPessoas();

      if (role === "cliente") {
        setPessoas([response.data]);
      } else {
        setPessoas(response.data);
      }

      setErro("");
    } catch (error) {
      setErro("Não foi possível carregar os utilizadores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPessoas();
  }, []);

  return {
    pessoas,
    setPessoas,
    loading,
    erro,
    setErro,
    loadPessoas,
  };
}
