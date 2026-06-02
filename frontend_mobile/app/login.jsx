import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { login } from "../services/authUtils";

import { COLORS } from "../styles/colors";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setErro("");

    if (!email || !password) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!email.includes("@")) {
      setErro("Introduza um email válido.");
      return;
    }
    try {
      setLoading(true);
      const response = await login(email, password);

      await AsyncStorage.setItem("token", response.AccessToken);

      router.push("/perfil");
    } catch (error) {
      console.log(error);

      console.log(error.response?.data);

      setErro(error.response?.data?.message || "Erro no login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
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
        Bem-vindo
      </Text>

      <Text
        style={{
          color: COLORS.muted,
          fontSize: 16,
          marginBottom: 40,
        }}
      >
        Entre na sua conta para continuar
      </Text>

      {/* EMAIL */}
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
      <TextInput
        placeholder="Email"
        placeholderTextColor={COLORS.muted}
        accessibilityLabel="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: COLORS.card,
          color: COLORS.text,
          padding: 18,
          borderRadius: 18,
          marginBottom: 16,
          fontSize: 16,
        }}
      />

      {/* PASSWORD */}

      <TextInput
        placeholder="Password"
        placeholderTextColor={COLORS.muted}
        secureTextEntry
        accessibilityLabel="Password"
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: COLORS.card,
          color: COLORS.text,
          padding: 18,
          borderRadius: 18,
          marginBottom: 30,
          fontSize: 16,
        }}
      />

      {/* BOTÃO */}

      <TouchableOpacity
        onPress={handleLogin}
        accessibilityRole="button"
        accessibilityLabel="Entrar"
        style={{
          backgroundColor: COLORS.primary,
          paddingVertical: 18,
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
          {loading ? "A entrar..." : "Entrar"}
        </Text>
      </TouchableOpacity>

      {/* REGISTO */}

      <TouchableOpacity
        onPress={() => router.push("/register")}
        style={{
          marginTop: 24,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.muted,
          }}
        >
          Não tem conta?{" "}
          <Text
            style={{
              color: COLORS.primary,
              fontWeight: "700",
            }}
          >
            Registar
          </Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
