import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { getEventos } from "../services/eventService";
import { Ionicons } from "@expo/vector-icons";
import { getCarros } from "../services/carroService";
import {
  getBilhetes,
  createBilhete,
  deleteBilhete,
} from "../services/bilheteService";

import { getUser } from "../services/authUtils";

import { COLORS } from "../styles/colors";

export default function BilhetesScreen() {
  const [user, setUser] = useState(null);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);
  const [bilhetes, setBilhetes] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [carros, setCarros] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [tipo, setTipo] = useState("visitante");
  const [idEvento, setIdEvento] = useState("");
  const [matriculaCarro, setMatriculaCarro] = useState("");

  useEffect(() => {
    loadUser();

    loadBilhetes();
    loadEventos();
    loadCarros();
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

  const loadEventos = async () => {
    try {
      const response = await getEventos();

      setEventos(response.data);
    } catch (error) {
      console.log(error);
      setErro("Não foi possível carregar os eventos.");
    }
  };

  const loadCarros = async () => {
    try {
      const response = await getCarros();

      setCarros(response.data);
    } catch (error) {
      console.log(error);
      setErro("Não foi possível carregar os veículos.");
    }
  };
  const handleSubmit = async () => {
    setErro("");
    setSucesso("");
    if (!idEvento) {
      setErro("Selecione um evento.");
      return;
    }
    if (tipo === "participante" && !matriculaCarro) {
      setErro("Selecione um veículo.");
      return;
    }
    try {
      setLoading(true);
      await createBilhete({
        tipo,
        id_evento: idEvento,
        matricula_carro: tipo === "participante" ? matriculaCarro : null,
      });

      setSucesso("Bilhete criado com sucesso.");

      setTimeout(() => {
        setSucesso("");
      }, 4000);

      setShowForm(false);

      loadBilhetes();
    } catch (error) {
      console.log(error);

      setErro(error.response?.data?.message || "Erro ao criar bilhete.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = (id) => {
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
            await deleteBilhete(id);

            loadBilhetes();
          } catch (error) {
            console.log(error);
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
          Bilhetes
        </Text>

        <Text
          style={{
            color: COLORS.muted,
          }}
        >
          Gerir os seus bilhetes
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
            onPress={() => setShowForm(!showForm)}
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
              Comprar Bilhete
            </Text>
          </TouchableOpacity>
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
                    fontSize: 26,
                    fontWeight: "900",
                    marginBottom: 22,
                  }}
                >
                  Comprar Bilhete
                </Text>

                {/* TIPO */}

                <View
                  style={{
                    backgroundColor: "#111827",
                    borderRadius: 18,
                    marginBottom: 16,
                    overflow: "hidden",
                  }}
                >
                  <Picker
                    selectedValue={tipo}
                    accessibilityLabel="Tipo de bilhete"
                    onValueChange={(itemValue) => setTipo(itemValue)}
                    dropdownIconColor="white"
                    style={{
                      color: "white",
                    }}
                  >
                    <Picker.Item label="Visitante" value="visitante" />

                    <Picker.Item label="Participante" value="participante" />
                  </Picker>
                </View>

                {/* EVENTO */}

                <View
                  style={{
                    backgroundColor: "#111827",
                    borderRadius: 18,
                    marginBottom: 16,
                    overflow: "hidden",
                  }}
                >
                  <Picker
                    selectedValue={idEvento}
                    accessibilityLabel="Evento"
                    onValueChange={(itemValue) => setIdEvento(itemValue)}
                    dropdownIconColor="white"
                    style={{
                      color: "white",
                    }}
                  >
                    <Picker.Item label="Escolher Evento" value="" />

                    {eventos.map((evento) => (
                      <Picker.Item
                        key={evento.id_evento}
                        label={evento.nome}
                        value={evento.id_evento}
                      />
                    ))}
                  </Picker>
                </View>

                {/* MATRÍCULA */}

                {tipo === "participante" && (
                  <View
                    style={{
                      backgroundColor: "#111827",
                      borderRadius: 18,
                      marginBottom: 16,
                      overflow: "hidden",
                    }}
                  >
                    <Picker
                      selectedValue={matriculaCarro}
                      accessibilityLabel="Carro"
                      onValueChange={(itemValue) =>
                        setMatriculaCarro(itemValue)
                      }
                      dropdownIconColor="white"
                      style={{
                        color: "white",
                      }}
                    >
                      <Picker.Item label="Escolher Carro" value="" />

                      {carros.map((carro) => (
                        <Picker.Item
                          key={carro.matricula}
                          label={`${carro.marca} ${carro.modelo}`}
                          value={carro.matricula}
                        />
                      ))}
                    </Picker>
                  </View>
                )}

                <TouchableOpacity
                  onPress={handleSubmit}
                  accessibilityRole="button"
                  accessibilityLabel="Confirmar Compra"
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
                    {loading ? "A processar..." : "Confirmar Compra"}
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
        {bilhetes.length === 0 && (
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
              Ainda não possui bilhetes.
            </Text>
          </View>
        )}
        {bilhetes.map((bilhete) => (
          <View
            key={bilhete.id_bilhete}
            style={{
              backgroundColor: COLORS.card,
              borderRadius: 24,
              padding: 22,
              marginBottom: 18,
            }}
          >
            {/* EVENTO */}

            <Text
              style={{
                color: COLORS.text,
                fontSize: 22,
                fontWeight: "800",
                marginBottom: 14,
              }}
            >
              {bilhete.evento?.nome}
            </Text>

            <Text
              style={{
                color: COLORS.muted,
                marginBottom: 6,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="location-sharp" size={18} color="#9ca3af" />

                <Text
                  style={{
                    color: COLORS.muted,
                    marginLeft: 6,
                  }}
                >
                  {bilhete.evento?.local_evento}
                </Text>
              </View>
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Ionicons name="calendar" size={18} color={COLORS.muted} />

              <Text
                style={{
                  color: COLORS.muted,
                  marginLeft: 8,
                }}
              >
                {bilhete.evento?.data}
              </Text>
            </View>

            {/* BADGES */}

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 18,
              }}
            >
              <View
                style={{
                  backgroundColor:
                    bilhete.tipo === "participante" ? "#1d4ed8" : "#374151",
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 12,
                  }}
                >
                  {bilhete.tipo}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: bilhete.pagamento ? "#166534" : "#991b1b",
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 12,
                  }}
                >
                  {bilhete.pagamento ? "PAGO" : "NÃO PAGO"}
                </Text>
              </View>
            </View>

            {/* CARRO */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Ionicons name="car-sport" size={18} color={COLORS.primary} />

              <Text
                style={{
                  color: COLORS.muted,
                  marginLeft: 8,
                }}
              >
                {bilhete.matricula_carro || "-"}
              </Text>
            </View>

            {/* BOTÕES */}

            <View
              style={{
                flexDirection: "row",
                gap: 12,
              }}
            >
              {!bilhete.pagamento && (
                <TouchableOpacity
                  onPress={() => {
                    router.push("/pagamentos");
                  }}
                  accessibilityRole="button"
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.primary,
                    paddingVertical: 16,
                    borderRadius: 16,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "800",
                    }}
                  >
                    Pagar
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={() => handleDelete(bilhete.id_bilhete)}
                accessibilityRole="button"
                style={{
                  flex: 1,
                  backgroundColor: "#7f1d1d",
                  paddingVertical: 16,
                  borderRadius: 16,
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
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
