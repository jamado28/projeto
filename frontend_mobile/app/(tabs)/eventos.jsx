import { useEffect, useState } from "react";
import { router } from "expo-router";
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
import { getEventos } from "../../services/eventService";

import { COLORS } from "../../styles/colors";

export default function EventosScreen() {

  const [eventos, setEventos] = useState([]);

  const [search, setSearch] = useState("");

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

  const filteredEventos = eventos.filter(
    (evento) =>

      evento.nome
        .toLowerCase()
        .includes(search.toLowerCase())

  );

  return (

    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.background
      }}
      contentContainerStyle={{
        paddingBottom: 140
      }}
      showsVerticalScrollIndicator={false}
    >

      {/* HEADER */}

      <View
        style={{
          paddingTop: 70,
          paddingHorizontal: 20,
          marginBottom: 24
        }}
      >

        <Text
          style={{
            color: COLORS.text,
            fontSize: 34,
            fontWeight: "900",
            marginBottom: 8
          }}
        >

          Eventos

        </Text>

        <Text
          style={{
            color: COLORS.muted,
            fontSize: 15
          }}
        >

          Explore todos os eventos automóveis

        </Text>

      </View>

      {/* SEARCH */}

      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 24
        }}
      >

        <TextInput
          placeholder="Pesquisar evento..."
          placeholderTextColor={COLORS.muted}
          value={search}
          onChangeText={setSearch}
          style={{
            backgroundColor: COLORS.card,
            color: COLORS.text,
            padding: 18,
            borderRadius: 18,
            fontSize: 16
          }}
        />

      </View>

      {/* EVENTOS */}

      <View
        style={{
          paddingHorizontal: 20
        }}
      >

        {filteredEventos.map((evento) => (

          <TouchableOpacity
            key={evento.id_evento}
            onPress={() => router.push(`/evento/${evento.id_evento}`)}
            style={{
              backgroundColor: COLORS.card,
              borderRadius: 24,
              overflow: "hidden",
              marginBottom: 18,
              flexDirection: "row"
            }}
          >

            <Image
              source={{
                uri: evento.imagem
                  ? `http://10.192.149.179:3000${evento.imagem}`
                  : "https://placehold.co/300x300"
              }}
              style={{
                width: 120,
                height: 120
              }}
            />

            <View
              style={{
                flex: 1,
                padding: 16,
                justifyContent: "center"
              }}
            >

              <Text
                style={{
                  color: COLORS.text,
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 10
                }}
              >

                {evento.nome}

              </Text>

              <Text
                style={{
                  color: COLORS.muted,
                  marginBottom: 6
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
                  marginBottom: 14
                }}
              >

                <Ionicons
                  name="calendar"
                  size={16}
                  color={COLORS.muted}
                />

                <Text
                  style={{
                    color: COLORS.muted,
                    marginLeft: 6
                  }}
                >

                  {evento.data}

                </Text>

              </View>

              <View
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: COLORS.primary,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 12
                }}
              >

                <Text
                  style={{
                    color: "black",
                    fontWeight: "700",
                    fontSize: 12
                  }}
                >

                  VER EVENTO

                </Text>

              </View>

            </View>

          </TouchableOpacity>

        ))}

      </View>

    </ScrollView>

  );

}