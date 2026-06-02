import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { getUser } from "../../services/authUtils";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

import { COLORS } from "../../styles/colors";

import { getEventoById } from "../../services/eventService";
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
export default function EventDetails() {
  const { id } = useLocalSearchParams();

  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  useEffect(() => {
    loadEvento();
  }, []);

  const loadEvento = async () => {
    try {
      setLoading(true);

      const response = await getEventoById(id);

      setEvento(response.data);
    } catch (error) {
      console.log(error);

      setErro("Não foi possível carregar o evento.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
          A carregar evento...
        </Text>
      </View>
    );
  }
  if (erro) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.background,
          padding: 24,
        }}
      >
        <Text
          style={{
            color: "#ff8a8a",
            textAlign: "center",
          }}
        >
          {erro}
        </Text>
      </View>
    );
  }
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
          Evento não encontrado.
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
      setMensagem("Apenas clientes podem comprar bilhetes.");

      setTimeout(() => {
        setMensagem("");
      }, 4000);

      return;

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
            ? `${BASE_URL}${evento.imagem}`
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
              {new Date(evento.data).toLocaleDateString("pt-PT")}
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
        {mensagem ? (
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
              {mensagem}
            </Text>
          </View>
        ) : null}
        <TouchableOpacity
          onPress={handleComprar}
          accessibilityRole="button"
          accessibilityLabel="Comprar bilhete"
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
