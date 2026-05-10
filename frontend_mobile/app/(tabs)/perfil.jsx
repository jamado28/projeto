import { useEffect, useState } from "react";

import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from "expo-router";

import { getUser } from "../../services/authUtils";

import { COLORS } from "../../styles/colors";

export default function PerfilScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const loggedUser = await getUser();

    setUser(loggedUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");

    setUser(null);

    router.replace("/login");
  };

  // SEM LOGIN

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Text
          style={{
            color: COLORS.text,
            fontSize: 38,
            fontWeight: "900",
            marginBottom: 10,
          }}
        >
          Perfil
        </Text>

        <Text
          style={{
            color: COLORS.muted,
            fontSize: 16,
            marginBottom: 40,
          }}
        >
          Entre na sua conta para aceder à sua área pessoal.
        </Text>

        {/* LOGIN */}

        <TouchableOpacity
          onPress={() => router.push("/login")}
          style={{
            backgroundColor: COLORS.primary,
            paddingVertical: 18,
            borderRadius: 18,
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "800",
              fontSize: 16,
            }}
          >
            Entrar
          </Text>
        </TouchableOpacity>

        {/* REGISTER */}

        <TouchableOpacity
          onPress={() => router.push("/register")}
          style={{
            backgroundColor: COLORS.card,
            paddingVertical: 18,
            borderRadius: 18,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.text,
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Criar Conta
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // COM LOGIN

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
        {/* AVATAR */}

        <View
          style={{
            width: 85,
            height: 85,
            borderRadius: 100,
            backgroundColor: COLORS.primary,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 34,
              fontWeight: "900",
              color: "black",
            }}
          >
            {user.email?.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text
          style={{
            color: COLORS.text,
            fontSize: 28,
            fontWeight: "800",
            marginBottom: 8,
          }}
        >
          {user.email}
        </Text>

        <Text
          style={{
            color: COLORS.muted,
            textTransform: "capitalize",
          }}
        >
          {user.role}
        </Text>
      </View>

      {/* MENU */}

      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        {/* CLIENTE */}

        {user.role === "cliente" && (
          <>
            <MenuButton title="Conta" route="/pessoas" />

            <MenuButton title="Veículos" route="/carros" />

            <MenuButton title="Bilhetes" route="/bilhetes" />

            <MenuButton title="Pagamentos" route="/pagamentos" />
          </>
        )}

        {/* ORGANIZADOR */}

        {user.role === "organizador" && (
          <>
            <MenuButton title="Eventos" route="/eventos-admin" />

            <MenuButton title="Carros" route="/carros" />

            <MenuButton title="Pagamentos" route="/pagamentos" />
          </>
        )}

        {/* ADMIN */}

        {user.role === "admin" && (
          <>
            <MenuButton title="Eventos" route="/eventos_admin" />

            <MenuButton title="Utilizadores" route="/users" />

            <MenuButton title="Pessoas" route="/pessoas" />

            <MenuButton title="Carros" route="/carros" />

            <MenuButton title="Bilhetes" route="/bilhetes" />

            <MenuButton title="Pagamentos" route="/pagamentos" />
          </>
        )}

        {/* LOGOUT */}

        <TouchableOpacity
          onPress={logout}
          style={{
            backgroundColor: "#7f1d1d",
            paddingVertical: 20,
            borderRadius: 20,
            alignItems: "center",
            marginTop: 14,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "800",
              fontSize: 16,
            }}
          >
            Terminar Sessão
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function MenuButton({ title, route }) {
  return (
    <TouchableOpacity
      onPress={() => router.push(route)}
      style={{
        backgroundColor: COLORS.card,
        padding: 22,
        borderRadius: 22,
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          color: COLORS.text,
          fontSize: 17,
          fontWeight: "700",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
