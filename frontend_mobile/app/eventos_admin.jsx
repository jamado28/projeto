import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  Ionicons
} from "@expo/vector-icons";
import {
  getEventos,
  createEvento,
  updateEvento,
  deleteEvento
} from "../services/eventService";

import {
  getUser
} from "../services/authUtils";

import { COLORS } from "../styles/colors";

export default function EventosAdminScreen() {

  const [user, setUser] = useState(null);

  const [eventos, setEventos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [localEvento,setLocalEvento] = useState("");
  const [descricao,setDescricao] = useState("");
  const [precoVisitante,setPrecoVisitante] = useState("");
  const [precoParticipante,setPrecoParticipante] = useState("");
  const [limiteParticipantes, setLimiteParticipantes] = useState("");

  useEffect(() => {

    loadUser();

    loadEventos();

  }, []);

  const loadUser = async () => {

    const loggedUser =
      await getUser();

    setUser(loggedUser);

  };

  const loadEventos = async () => {

    try {

      const response =
        await getEventos();

      setEventos(response.data);

    } catch (error) {

      console.log(error);

    }

  };
  const handleEdit = (evento) => {

    setEditingId(
        evento.id_evento
    );

    setNome(
        evento.nome || ""
    );

    setData(
        evento.data || ""
    );

    setLocalEvento(
        evento.local_evento || ""
    );

    setDescricao(
        evento.descricao || ""
    );

    setPrecoVisitante(
        String(
        evento.preco_visitante || ""
        )
    );

    setPrecoParticipante(
        String(
        evento.preco_participante || ""
        )
    );

    setLimiteParticipantes(
        String(
        evento.limite_participantes || ""
        )
    );

    setShowForm(true);
  };
  const handleSubmit = async () => {

        try {

            const dados = {

            nome,
            data,

            local_evento:
                localEvento,

            descricao,

            preco_visitante:
                precoVisitante,

            preco_participante:
                precoParticipante,

            limite_participantes:
                limiteParticipantes

            };

            if (editingId) {

            await updateEvento(
                editingId,
                dados
            );

            alert(
                "Evento atualizado"
            );

            } else {

            await createEvento(
                dados
            );

            alert(
                "Evento criado"
            );

            }

            setShowForm(false);

            setEditingId(null);

            loadEventos();

        } catch (error) {

            console.log(error);

            alert(
            "Erro ao guardar evento"
            );

        }

  };
  const handleDelete = async (id) => {

    Alert.alert(
        "Eliminar",
        "Tem a certeza?",
        [
        {
            text: "Cancelar",
            style: "cancel"
        },
        {
            text: "Eliminar",
            style: "destructive",
            onPress: async () => {

            try {

                await deleteEvento(id);

                loadEventos();

            } catch (error) {

                console.log(error);

            }

            }
        }
        ]
    );

    };
  const inputStyle = {

    backgroundColor:
        "#111827",

    color: COLORS.text,

    padding: 18,

    borderRadius: 18,

    marginBottom: 16,

    fontSize: 16

    };
  return (

    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.background
      }}
      contentContainerStyle={{
        paddingBottom: 120
      }}
    >

      {/* HEADER */}

      <View
        style={{
          paddingTop: 80,
          paddingHorizontal: 24,
          marginBottom: 30
        }}
      >

        <Text
          style={{
            color: COLORS.text,
            fontSize: 34,
            fontWeight: "900",
            marginBottom: 10
          }}
        >

          Eventos

        </Text>

        <Text
          style={{
            color: COLORS.muted
          }}
        >

          Gerir eventos da plataforma

        </Text>

      </View>

      {/* BOTÃO */}

      {(user?.role === "admin" ||
        user?.role === "organizador") && (

        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 30
          }}
        >

          <TouchableOpacity
            onPress={() => {setShowForm(!showForm); setEditingId(null); }}
            style={{
              backgroundColor: COLORS.primary,
              paddingVertical: 18,
              borderRadius: 20,
              alignItems: "center"
            }}
          >

            <Text
              style={{
                color: "black",
                fontWeight: "800",
                fontSize: 16
              }}
            >

              Criar Evento

            </Text>
            
          </TouchableOpacity>
          {showForm && (

            <View
            style={{
                paddingHorizontal: 20,
                marginBottom: 30
            }}
            >

            <View
                style={{
                backgroundColor: COLORS.card,
                borderRadius: 28,
                padding: 24
                }}
            >

                <Text
                style={{
                    color: COLORS.text,
                    fontSize: 26,
                    fontWeight: "900",
                    marginBottom: 22
                }}
                >

                {editingId
                    ? "Editar Evento"
                    : "Novo Evento"}

                </Text>

                <TextInput
                placeholder="Nome"
                placeholderTextColor="#6b7280"
                value={nome}
                onChangeText={setNome}
                style={inputStyle}
                />

                <TextInput
                placeholder="Data"
                placeholderTextColor="#6b7280"
                value={data}
                onChangeText={setData}
                style={inputStyle}
                />

                <TextInput
                placeholder="Local"
                placeholderTextColor="#6b7280"
                value={localEvento}
                onChangeText={setLocalEvento}
                style={inputStyle}
                />

                <TextInput
                placeholder="Preço visitante"
                placeholderTextColor="#6b7280"
                value={precoVisitante}
                onChangeText={setPrecoVisitante}
                style={inputStyle}
                />

                <TextInput
                placeholder="Preço participante"
                placeholderTextColor="#6b7280"
                value={precoParticipante}
                onChangeText={setPrecoParticipante}
                style={inputStyle}
                />

                <TextInput
                placeholder="Limite participantes"
                placeholderTextColor="#6b7280"
                value={limiteParticipantes}
                onChangeText={
                    setLimiteParticipantes
                }
                style={inputStyle}
                />

                <TextInput
                placeholder="Descrição"
                placeholderTextColor="#6b7280"
                multiline
                value={descricao}
                onChangeText={setDescricao}
                style={[
                    inputStyle,
                    {
                    height: 120,
                    textAlignVertical: "top"
                    }
                ]}
                />

                <TouchableOpacity
                onPress={handleSubmit}
                style={{
                    backgroundColor:
                    COLORS.primary,
                    paddingVertical: 18,
                    borderRadius: 20,
                    alignItems: "center"
                }}
                >

                <Text
                    style={{
                    color: "black",
                    fontWeight: "900",
                    fontSize: 16
                    }}
                >

                    Guardar Evento

                </Text>

                </TouchableOpacity>

            </View>

            </View>

            )}
        </View>

      )}

      {/* EVENTOS */}

      <View
        style={{
          paddingHorizontal: 20
        }}
      >

        {eventos.map((evento) => (

          <View
            key={evento.id_evento}
            style={{
              backgroundColor: COLORS.card,
              borderRadius: 28,
              overflow: "hidden",
              marginBottom: 26
            }}
          >

            {/* IMAGEM */}

            <Image
              source={{
                uri: evento.imagem
                  ? `http://10.192.149.179:3000${evento.imagem}`
                  : "https://placehold.co/800x500"
              }}
              style={{
                width: "100%",
                height: 240
              }}
            />

            {/* CONTEÚDO */}

            <View
              style={{
                padding: 24
              }}
            >

              {/* NOME */}

              <Text
                style={{
                  color: COLORS.text,
                  fontSize: 28,
                  fontWeight: "900",
                  marginBottom: 14
                }}
              >

                {evento.nome}

              </Text>

              {/* INFO */}

              <Text
                style={{
                  color: COLORS.muted,
                  marginBottom: 8,
                  fontSize: 15
                }}
              >

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                    >

                    <Ionicons
                        name="location-sharp"
                        size={18}
                        color="#9ca3af"
                    />

                    <Text
                        style={{
                        color: COLORS.muted,
                        marginLeft: 6
                        }}
                    >

                        {evento.local_evento}

                    </Text>

                    </View>

              </Text>

              <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10
                }}
                >

                <Ionicons
                    name="calendar"
                    size={18}
                    color={COLORS.muted}
                />

                <Text
                    style={{
                    color: COLORS.muted,
                    marginLeft: 8,
                    fontSize: 15
                    }}
                >

                    {evento.data}

                </Text>

                </View>

              <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10
                }}
                >

                <Ionicons
                    name="people"
                    size={18}
                    color={COLORS.muted}
                />

                <Text
                    style={{
                    color: COLORS.muted,
                    marginLeft: 8,
                    fontSize: 15
                    }}
                >

                    {evento.total_participantes} participantes

                </Text>

                </View>

              <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20
                }}
                >

                <Ionicons
                    name="ticket"
                    size={18}
                    color={COLORS.primary}
                />

                <Text
                    style={{
                    color: COLORS.muted,
                    marginLeft: 8,
                    fontSize: 15
                    }}
                >

                    {evento.preco_visitante}€ visitante

                </Text>

                </View>

              {/* DESCRIÇÃO */}

              <Text
                style={{
                  color: COLORS.muted,
                  lineHeight: 24,
                  marginBottom: 28
                }}
              >

                {evento.descricao
                  ?.slice(0, 140)}

                {evento.descricao?.length > 140
                  ? "..."
                  : ""}

              </Text>

              {/* BOTÕES */}

              {(user?.role === "admin" ||
                evento.user_id === user?.id) && (

                <View
                  style={{
                    flexDirection: "row",
                    gap: 12
                  }}
                >

                  <TouchableOpacity
                    onPress={() => handleEdit(evento)}
                    style={{
                      flex: 1,
                      backgroundColor: "#374151",
                      paddingVertical: 16,
                      borderRadius: 18,
                      alignItems: "center"
                    }}
                  >

                    <Text
                      style={{
                        color: COLORS.text,
                        fontWeight: "800"
                      }}
                    >

                      Editar

                    </Text>

                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleDelete(evento.id_evento)}
                    style={{
                      flex: 1,
                      backgroundColor: "#7f1d1d",
                      paddingVertical: 16,
                      borderRadius: 18,
                      alignItems: "center"
                    }}
                  >

                    <Text
                      style={{
                        color: "white",
                        fontWeight: "800"
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