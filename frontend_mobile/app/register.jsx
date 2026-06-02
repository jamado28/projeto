import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { register } from "../services/authUtils";

import { COLORS } from "../styles/colors";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("cliente");

  const handleRegister = async () => {
    setErro("");
    setSucesso("");

    if (!email || !password) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!email.includes("@")) {
      setErro("Introduza um email válido.");
      return;
    }

    if (password.length < 6) {
      setErro("A password deve ter pelo menos 6 caracteres.");
      return;
    }
    try {
      setLoading(true);
      await register({
        email,
        password,
        role,
      });

      setSucesso("Conta criada com sucesso.");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.log(error);

      setErro(error.response?.data?.message || "Erro ao criar conta.");
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
      {/* TÍTULO */}

      <Text
        style={{
          color: COLORS.text,
          fontSize: 38,
          fontWeight: "900",
          marginBottom: 10,
        }}
      >
        Criar Conta
      </Text>

      <Text
        style={{
          color: COLORS.muted,
          fontSize: 16,
          marginBottom: 40,
        }}
      >
        Registe-se para participar em eventos
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
      <TextInput
        placeholder="Email"
        placeholderTextColor={COLORS.muted}
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
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor: COLORS.card,
          color: COLORS.text,
          padding: 18,
          borderRadius: 18,
          marginBottom: 24,
          fontSize: 16,
        }}
      />

      {/* ROLE */}

      <Text
        style={{
          color: COLORS.muted,
          marginBottom: 12,
          fontWeight: "600",
        }}
      >
        Tipo de conta
      </Text>

      <View
        style={{
          flexDirection: "row",
          gap: 14,
          marginBottom: 34,
        }}
      >
        {/* CLIENTE */}

        <TouchableOpacity
          onPress={() => setRole("cliente")}
          style={{
            flex: 1,
            backgroundColor: role === "cliente" ? COLORS.primary : COLORS.card,
            paddingVertical: 18,
            borderRadius: 18,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: role === "cliente" ? "black" : COLORS.text,
              fontWeight: "700",
            }}
          >
            Cliente
          </Text>
        </TouchableOpacity>

        {/* ORGANIZADOR */}

        <TouchableOpacity
          onPress={() => setRole("organizador")}
          style={{
            flex: 1,
            backgroundColor:
              role === "organizador" ? COLORS.primary : COLORS.card,
            paddingVertical: 18,
            borderRadius: 18,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: role === "organizador" ? "black" : COLORS.text,
              fontWeight: "700",
            }}
          >
            Organizador
          </Text>
        </TouchableOpacity>
      </View>

      {/* BOTÃO */}

      <TouchableOpacity
        onPress={handleRegister}
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
          {loading ? "A criar..." : "Criar Conta"}
        </Text>
      </TouchableOpacity>

      {/* LOGIN */}

      <TouchableOpacity
        onPress={() => router.push("/login")}
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
          Já tem conta?{" "}
          <Text
            style={{
              color: COLORS.primary,
              fontWeight: "700",
            }}
          >
            Entrar
          </Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
