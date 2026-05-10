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
    }
  };

  const loadEventos = async () => {
    try {
      const response = await getEventos();

      setEventos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCarros = async () => {
    try {
      const response = await getCarros();

      setCarros(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    try {
      await createBilhete({
        tipo,
        id_evento: idEvento,
        matricula_carro: tipo === "participante" ? matriculaCarro : null,
      });

      alert("Bilhete criado");

      setShowForm(false);

      loadBilhetes();
    } catch (error) {
      console.log(error);

      alert("Erro ao criar bilhete");
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
                    Confirmar Compra
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
