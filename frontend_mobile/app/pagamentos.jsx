import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  getPagamentos,
  createPagamento,
  deletePagamento,
} from "../services/pagamentoService";
import { Ionicons } from "@expo/vector-icons";
import { getBilhetes } from "../services/bilheteService";

import { getUser } from "../services/authUtils";

import { COLORS } from "../styles/colors";

export default function PagamentosScreen() {
  const [erro, setErro] = useState("");
const [sucesso, setSucesso] = useState("");
const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [pagamentos, setPagamentos] = useState([]);
  const [bilhetes, setBilhetes] = useState([]);
  const [iban, setIban] = useState("");

  const [idBilhete, setIdBilhete] = useState("");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadUser();

    loadPagamentos();
    loadBilhetes();
  }, []);

  const loadUser = async () => {
    const loggedUser = await getUser();

    setUser(loggedUser);
  };

  const loadBilhetes = async () => {
    try {
      const response = await getBilhetes();

      setBilhetes(response.data);
    } catch (error) {
      console.log(error);
      setErro("Não foi possível carregar os bilhetes.");
    }
  };
  const loadPagamentos = async () => {
    try {
      const response = await getPagamentos();

      setPagamentos(response.data);
    } catch (error) {
      console.log(error);
      setErro("Não foi possível carregar os pagamentos.");
    }
  };

  const handleSubmit = async () => {
    setErro("");
setSucesso("");
if (!iban) {
  setErro("Introduza um IBAN.");
  return;
}
if (!iban) {
  setErro("Introduza um IBAN.");
  return;
}
    try {
      setLoading(true);
      await createPagamento({
        iban,
        estado: true,
        id_bilhete: idBilhete,
      });

      setSucesso("Pagamento criado com sucesso.");

setTimeout(() => {
  setSucesso("");
}, 4000);

      setIban("");

      setIdBilhete("");

      setShowForm(false);

      loadPagamentos();
    } catch (error) {
      console.log(error);

      setErro(
  error.response?.data?.message ||
  "Erro ao criar pagamento."
);
    }
    finally {
  setLoading(false);
}
  };
  const handleDelete = async (id) => {
    Alert.alert("Eliminar", "Tem a certeza?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          try {
            setSucesso("Pagamento eliminado com sucesso.");

setTimeout(() => {
  setSucesso("");
}, 4000);

            loadPagamentos();
          } catch (error) {
            console.log(error);
            setErro("Erro ao eliminar pagamento.");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
    >
      {/* HEADER */}

      <View
        style={{
          paddingTop: 80,
          paddingHorizontal: 24,
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            color: COLORS.text,
            fontSize: 34,
            fontWeight: "900",
            marginBottom: 10,
          }}
        >
          Pagamentos
        </Text>

        <Text
          style={{
            color: COLORS.muted,
          }}
        >
          Gerir os seus pagamentos
        </Text>
      </View>

      {/* BOTÃO */}

      {user?.role === "cliente" && (
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => setShowForm(true)}
            accessibilityRole="button"
            style={{
              backgroundColor: COLORS.primary,
              paddingVertical: 18,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                fontWeight: "800",
                fontSize: 16,
              }}
            >
              Criar Pagamento
            </Text>
          </TouchableOpacity>
          {showForm && (
            <View
              style={{
                paddingHorizontal: 20,
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.card,
                  borderRadius: 28,
                  padding: 24,
                }}
              >
                <Text
                  style={{
                    color: COLORS.text,
                    fontSize: 24,
                    fontWeight: "900",
                    marginBottom: 20,
                  }}
                >
                  Novo Pagamento
                </Text>
                {erro ? (
  <View
    style={{
      backgroundColor: "#3a1616",
      padding: 14,
      borderRadius: 14,
      marginBottom: 20,
    }}
  >
    <Text
      style={{
        color: "#ff8a8a",
        fontWeight: "600",
      }}
    >
      {erro}
    </Text>
  </View>
) : null}

{sucesso ? (
  <View
    style={{
      backgroundColor: "#17361f",
      padding: 14,
      borderRadius: 14,
      marginBottom: 20,
    }}
  >
    <Text
      style={{
        color: "#7dff9b",
        fontWeight: "600",
      }}
    >
      {sucesso}
    </Text>
  </View>
) : null}  
                <TextInput
                  placeholder="IBAN"
                  placeholderTextColor="#6b7280"
                  accessibilityLabel="IBAN"
                  value={iban}
                  onChangeText={setIban}
                  style={{
                    backgroundColor: "#111827",
                    color: COLORS.text,
                    padding: 18,
                    borderRadius: 18,
                    marginBottom: 16,
                    fontSize: 16,
                  }}
                />

                <View
                  style={{
                    backgroundColor: "#111827",
                    borderRadius: 18,
                    marginBottom: 16,
                    overflow: "hidden",
                  }}
                >
                  <Picker
                    selectedValue={idBilhete}
                    accessibilityLabel="Bilhete"
                    onValueChange={(itemValue) => setIdBilhete(itemValue)}
                    dropdownIconColor="white"
                    style={{
                      color: "white",
                    }}
                  >
                    <Picker.Item label="Escolher Bilhete" value="" />

                    {bilhetes.map((bilhete) => (
                      <Picker.Item
                        key={bilhete.id_bilhete}
                        label={`${bilhete.evento?.nome} - ${bilhete.tipo}`}
                        value={bilhete.id_bilhete}
                      />
                    ))}
                  </Picker>
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  accessibilityRole="button"
                  style={{
                    backgroundColor: COLORS.primary,
                    paddingVertical: 18,
                    borderRadius: 20,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "900",
                      fontSize: 16,
                    }}
                  >
                     {loading
    ? "A processar..."
    : "Criar Pagamento"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}

      {/* LISTA */}

      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        {pagamentos.length === 0 && (
  <View
    style={{
      backgroundColor: COLORS.card,
      padding: 24,
      borderRadius: 20,
    }}
  >
    <Text
      style={{
        color: COLORS.muted,
        textAlign: "center",
      }}
    >
      Ainda não existem pagamentos registados.
    </Text>
  </View>
)}
        {pagamentos.map((pagamento) => (
          <View
            key={pagamento.id_pagamento}
            style={{
              backgroundColor: COLORS.card,
              borderRadius: 28,
              padding: 24,
              marginBottom: 22,
            }}
          >
            {/* TOPO */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 22,
              }}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    color: COLORS.text,
                    fontSize: 24,
                    fontWeight: "900",
                    marginBottom: 8,
                  }}
                >
                  {pagamento.bilhete?.evento?.nome}
                </Text>

                <Text
                  style={{
                    color: COLORS.muted,
                    fontSize: 15,
                  }}
                >
                  Bilhete #{pagamento.id_bilhete}
                </Text>
              </View>

              {/* BADGE */}

              <View
                style={{
                  backgroundColor: pagamento.estado ? "#166534" : "#92400e",
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  borderRadius: 14,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "800",
                    fontSize: 12,
                  }}
                >
                  {pagamento.estado ? "PAGO" : "PENDENTE"}
                </Text>
              </View>
            </View>

            {/* PREÇO */}

            <View
              style={{
                backgroundColor: "#111827",
                borderRadius: 20,
                padding: 22,
                marginBottom: 22,
              }}
            >
              <Text
                style={{
                  color: COLORS.muted,
                  marginBottom: 8,
                }}
              >
                Valor
              </Text>

              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: 34,
                  fontWeight: "900",
                }}
              >
                {pagamento.preco}€
              </Text>
            </View>

            {/* INFO */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Ionicons name="card-outline" size={18} color={COLORS.primary} />

              <Text
                style={{
                  color: COLORS.muted,
                  marginLeft: 8,
                }}
              >
                {pagamento.iban}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Ionicons name="calendar" size={18} color={COLORS.muted} />

              <Text
                style={{
                  color: COLORS.muted,
                  marginLeft: 8,
                }}
              >
                {new Date(pagamento.createdAt).toLocaleDateString()}
              </Text>
            </View>

            {/* BOTÃO */}

            {user?.role === "admin" && (
              <TouchableOpacity
                onPress={() => handleDelete(pagamento.id_pagamento)}
                accessibilityRole="button"
                style={{
                  backgroundColor: "#7f1d1d",
                  paddingVertical: 16,
                  borderRadius: 18,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "800",
                  }}
                >
                  Apagar
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
