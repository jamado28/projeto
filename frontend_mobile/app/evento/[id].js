import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { getUser } from "../../services/authUtils";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

import { COLORS } from "../../styles/colors";

import { getEventoById } from "../../services/eventService";

export default function EventDetails() {
  const { id } = useLocalSearchParams();

  const [evento, setEvento] = useState(null);

  useEffect(() => {
    loadEvento();
  }, []);

  const loadEvento = async () => {
    try {
      const response = await getEventoById(id);

      setEvento(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!evento) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
        }}
      >
        <Text
          style={{
            color: COLORS.text,
          }}
        >
          A carregar...
        </Text>
      </View>
    );
  }
  const handleComprar = async () => {
    const user = await getUser();

    // sem login

    if (!user) {
      router.push("/login");

      return;
    }

    // apenas cliente

    if (user.role !== "cliente") {
      alert("Apenas clientes podem comprar bilhetes.");

      return;
    }

    // guardar evento

    await AsyncStorage.setItem("eventoBilhete", evento.id_evento.toString());

    // abrir perfil

    router.push("/perfil");
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
      }}
      contentContainerStyle={{
        paddingBottom: 60,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* IMAGEM */}

      <Image
        source={{
          uri: evento.imagem
            ? `http://10.192.149.179:3000${evento.imagem}`
            : "https://placehold.co/1200x700",
        }}
        style={{
          width: "100%",
          height: 320,
        }}
      />

      {/* CONTEÚDO */}

      <View
        style={{
          padding: 24,
        }}
      >
        <Text
          style={{
            color: COLORS.text,
            fontSize: 34,
            fontWeight: "900",
            marginBottom: 16,
          }}
        >
          {evento.nome}
        </Text>

        {/* INFO */}

        <View
          style={{
            marginBottom: 30,
          }}
        >
          {/* LOCAL */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Ionicons name="location-sharp" size={18} color={COLORS.muted} />

            <Text
              style={{
                color: COLORS.muted,
                marginLeft: 8,
              }}
            >
              {evento.local_evento}
            </Text>
          </View>

          {/* DATA */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="calendar" size={18} color={COLORS.muted} />

            <Text
              style={{
                color: COLORS.muted,
                marginLeft: 8,
              }}
            >
              {evento.data}
            </Text>
          </View>
        </View>

        {/* DESCRIÇÃO */}

        <View
          style={{
            backgroundColor: COLORS.card,
            borderRadius: 24,
            padding: 22,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              color: COLORS.text,
              fontSize: 22,
              fontWeight: "700",
              marginBottom: 18,
            }}
          >
            Sobre o Evento
          </Text>

          <Text
            style={{
              color: COLORS.muted,
              lineHeight: 28,
              fontSize: 15,
            }}
          >
            {evento.descricao || "Sem descrição disponível."}
          </Text>
        </View>

        {/* PREÇOS */}

        <View
          style={{
            backgroundColor: COLORS.card,
            borderRadius: 24,
            padding: 22,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              color: COLORS.text,
              fontSize: 22,
              fontWeight: "700",
              marginBottom: 20,
            }}
          >
            Bilhetes
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <Ionicons name="ticket" size={18} color={COLORS.primary} />

            <Text
              style={{
                color: COLORS.muted,
                marginLeft: 10,
                fontSize: 16,
              }}
            >
              Visitante: {evento.preco_visitante}€
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="car-sport" size={18} color={COLORS.primary} />

            <Text
              style={{
                color: COLORS.muted,
                marginLeft: 10,
                fontSize: 16,
              }}
            >
              Participante: {evento.preco_participante}€
            </Text>
          </View>
        </View>

        {/* BOTÃO */}

        <TouchableOpacity
          onPress={handleComprar}
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
      </View>
    </ScrollView>
  );
}
