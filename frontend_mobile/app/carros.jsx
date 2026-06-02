import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  getCarros,
  createCarro,
  updateCarro,
  deleteCarro,
} from "../services/carroService";

import { getUser } from "../services/authUtils";

import { COLORS } from "../styles/colors";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
export default function CarrosScreen() {
  const [user, setUser] = useState(null);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);
  const [carros, setCarros] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMatricula, setEditingMatricula] = useState(null);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [matricula, setMatricula] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    loadUser();

    loadCarros();
  }, []);

  const loadUser = async () => {
    const loggedUser = await getUser();

    setUser(loggedUser);
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
  const handleEdit = (carro) => {
    setEditingMatricula(carro.matricula);

    setMarca(carro.marca || "");

    setModelo(carro.modelo || "");

    setAno(String(carro.ano || ""));

    setMatricula(carro.matricula || "");

    setImgUrl(carro.img_url || "");

    setShowForm(true);
  };
  const handleSubmit = async () => {
    setErro("");
    setSucesso("");
    if (!marca || !modelo || !ano || !matricula) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }
    if (isNaN(ano)) {
      setErro("Introduza um ano válido.");
      return;
    }
    if (matricula.length < 6) {
      setErro("Introduza uma matrícula válida.");
      return;
    }
    try {
      const dados = {
        marca,
        modelo,
        ano,
        matricula,
        img_url: imgUrl,
      };
      setLoading(true);
      if (editingMatricula) {
        await updateCarro(editingMatricula, dados);
      } else {
        await createCarro(dados);
      }
      setSucesso(
        editingMatricula
          ? "Veículo atualizado com sucesso."
          : "Veículo criado com sucesso.",
      );

      setTimeout(() => {
        setSucesso("");
      }, 4000);
      setShowForm(false);

      setEditingMatricula(null);

      loadCarros();
    } catch (error) {
      console.log(error);

      setErro(error.response?.data?.message || "Erro ao guardar veículo.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = (matricula) => {
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
            await deleteCarro(matricula);
            setSucesso("Veículo eliminado com sucesso.");

            setTimeout(() => {
              setSucesso("");
            }, 4000);
            loadCarros();
          } catch (error) {
            console.log(error);
            setErro("Erro ao eliminar veículo.");
          }
        },
      },
    ]);
  };
  const inputStyle = {
    backgroundColor: "#111827",

    color: COLORS.text,

    padding: 18,

    borderRadius: 18,

    marginBottom: 16,

    fontSize: 16,
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
          Carros
        </Text>

        <Text
          style={{
            color: COLORS.muted,
          }}
        >
          Gerir os seus veículos
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
            onPress={() => {
              setShowForm(!showForm);
              setEditingMatricula(null);
            }}
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
              Adicionar Carro
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
                  {editingMatricula ? "Editar Carro" : "Novo Carro"}
                </Text>

                <TextInput
                  placeholder="Marca"
                  placeholderTextColor="#6b7280"
                  accessibilityLabel="Marca"
                  value={marca}
                  onChangeText={setMarca}
                  style={inputStyle}
                />

                <TextInput
                  placeholder="Modelo"
                  placeholderTextColor="#6b7280"
                  accessibilityLabel="Modelo"
                  value={modelo}
                  onChangeText={setModelo}
                  style={inputStyle}
                />

                <TextInput
                  placeholder="Ano"
                  placeholderTextColor="#6b7280"
                  accessibilityLabel="Ano"
                  value={ano}
                  onChangeText={setAno}
                  style={inputStyle}
                />

                <TextInput
                  placeholder="Matrícula"
                  placeholderTextColor="#6b7280"
                  accessibilityLabel="Matrícula"
                  value={matricula}
                  onChangeText={setMatricula}
                  style={inputStyle}
                />

                <TextInput
                  placeholder="Imagem URL"
                  placeholderTextColor="#6b7280"
                  accessibilityLabel="Imagem URL"
                  value={imgUrl}
                  onChangeText={setImgUrl}
                  style={inputStyle}
                />

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
                    {loading ? "A guardar..." : "Guardar Carro"}
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
        {carros.length === 0 && (
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
              Ainda não possui veículos registados.
            </Text>
          </View>
        )}
        {carros.map((carro) => (
          <View
            key={carro.matricula}
            style={{
              backgroundColor: COLORS.card,
              borderRadius: 26,
              overflow: "hidden",
              marginBottom: 24,
            }}
          >
            {/* IMAGEM */}

            <Image
              source={{
                uri: carro.img_url
                  ? `${BASE_URL}${carro.img_url}`
                  : "https://placehold.co/600x400",
              }}
              style={{
                width: "100%",
                height: 230,
              }}
            />

            {/* CONTEÚDO */}

            <View
              style={{
                padding: 22,
              }}
            >
              {/* TOP */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <View>
                  <Text
                    style={{
                      color: COLORS.text,
                      fontSize: 24,
                      fontWeight: "800",
                      marginBottom: 6,
                    }}
                  >
                    {carro.marca}
                  </Text>

                  <Text
                    style={{
                      color: COLORS.muted,
                      fontSize: 16,
                    }}
                  >
                    {carro.modelo}
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 14,
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "800",
                    }}
                  >
                    {carro.ano}
                  </Text>
                </View>
              </View>

              {/* MATRÍCULA */}

              <View
                style={{
                  backgroundColor: "#1f2937",
                  paddingVertical: 14,
                  borderRadius: 16,
                  alignItems: "center",
                  marginBottom: 22,
                }}
              >
                <Text
                  style={{
                    color: COLORS.text,
                    fontSize: 20,
                    fontWeight: "900",
                    letterSpacing: 2,
                  }}
                >
                  {carro.matricula}
                </Text>
              </View>

              {/* BOTÕES */}

              {user?.role === "cliente" && (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 12,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => handleEdit(carro)}
                    accessibilityRole="button"
                    style={{
                      flex: 1,
                      backgroundColor: "#374151",
                      paddingVertical: 16,
                      borderRadius: 16,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.text,
                        fontWeight: "800",
                      }}
                    >
                      Editar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDelete(carro.matricula)}
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
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
