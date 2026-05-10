import { useEffect, useState } from "react";
import { COLORS } from "../../styles/colors";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { getEventos } from "../../services/eventService";
import { Ionicons } from "@expo/vector-icons";
export default function HomeScreen() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    loadEventos();
  }, []);

  const loadEventos = async () => {
    try {
      const response = await getEventos();

      setEventos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
      contentContainerStyle={{
        paddingBottom: 75,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}

      <View
        style={{
          paddingTop: 70,
          paddingHorizontal: 22,
          marginBottom: 25,
        }}
      >
        <Text
          style={{
            color: COLORS.text,
            fontSize: 34,
            fontWeight: "900",
          }}
        >
          AutoEventos
        </Text>

        <Text
          style={{
            color: COLORS.muted,
            marginTop: 6,
            fontSize: 15,
          }}
        >
          Descubra os melhores eventos automóveis
        </Text>
      </View>
      {/* FEATURED EVENT */}
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 34,
        }}
      >
        <Text
          style={{
            color: COLORS.muted,
            fontSize: 13,
            fontWeight: "700",
            marginBottom: 14,
            letterSpacing: 1,
          }}
        >
          EVENTO EM DESTAQUE
        </Text>
        <View
          style={{
            backgroundColor: COLORS.card,
            borderRadius: 28,
            overflow: "hidden",
          }}
        >
          <Image
            source={{
              uri: eventos[0]?.imagem
                ? `http://10.192.149.179:3000${eventos[0].imagem}`
                : "https://placehold.co/800x500",
            }}
            style={{
              width: "100%",
              height: 250,
            }}
          />
          <View
            style={{
              padding: 22,
            }}
          >
            <Text
              style={{
                color: COLORS.text,
                fontSize: 28,
                fontWeight: "800",
                marginBottom: 10,
              }}
            >
              {eventos[0]?.nome || "Evento Automóvel"}
            </Text>
            <Text
              style={{
                color: COLORS.muted,
                fontSize: 15,
                lineHeight: 24,
                marginBottom: 20,
              }}
            >
              {eventos[0]?.descricao ||
                "Participe na melhor experiência automóvel."}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 18,
                }}
              >
                <Ionicons
                  name="location-sharp"
                  size={16}
                  color={COLORS.muted}
                />

                <Text
                  style={{
                    color: COLORS.muted,
                    marginLeft: 6,
                  }}
                >
                  {eventos[0]?.local_evento}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="calendar" size={16} color={COLORS.muted} />

                <Text
                  style={{
                    color: COLORS.muted,
                    marginLeft: 6,
                  }}
                >
                  {eventos[0]?.data}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => router.push(`/evento/${eventos[0]?.id_evento}`)}
              style={{
                backgroundColor: COLORS.primary,
                paddingVertical: 16,
                borderRadius: 18,
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
                Ver Evento
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* EVENTOS */}

      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: COLORS.text,
              fontSize: 26,
              fontWeight: "800",
            }}
          >
            Próximos Eventos
          </Text>

          <TouchableOpacity onPress={() => router.push("/eventos")}>
            <Text
              style={{
                color: COLORS.primary,
                fontWeight: "700",
              }}
            >
              Ver todos
            </Text>
          </TouchableOpacity>
        </View>

        {eventos.slice(0, 4).map((evento) => (
          <TouchableOpacity
            key={evento.id_evento}
            onPress={() => router.push(`/evento/${evento.id_evento}`)}
            style={{
              backgroundColor: COLORS.card,
              borderRadius: 22,
              marginBottom: 18,
              overflow: "hidden",
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: evento.imagem
                  ? `http://10.192.149.179:3000${evento.imagem}`
                  : "https://placehold.co/300x300",
              }}
              style={{
                width: 120,
                height: 120,
              }}
            />

            <View
              style={{
                flex: 1,
                padding: 16,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.text,
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 10,
                }}
              >
                {evento.nome}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Ionicons
                  name="location-sharp"
                  size={16}
                  color={COLORS.muted}
                />

                <Text
                  style={{
                    color: COLORS.muted,
                    marginLeft: 6,
                  }}
                >
                  {evento.local_evento}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons name="calendar" size={16} color={COLORS.muted} />

                <Text
                  style={{
                    color: COLORS.muted,
                    marginLeft: 6,
                  }}
                >
                  {evento.data}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
