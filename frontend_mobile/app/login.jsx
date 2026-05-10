import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { login } from "../services/authUtils";

import { COLORS } from "../styles/colors";

export default function LoginScreen() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response =
        await login(email, password);

      await AsyncStorage.setItem(
        "token",
        response.AccessToken
      );

      router.push("/perfil");

    } catch (error) {

      console.log(error);

      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Erro no login"
      );

    }

  };

  return (

    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        padding: 24
      }}
    >

      <Text
        style={{
          color: COLORS.text,
          fontSize: 38,
          fontWeight: "900",
          marginBottom: 10
        }}
      >

        Bem-vindo

      </Text>

      <Text
        style={{
          color: COLORS.muted,
          fontSize: 16,
          marginBottom: 40
        }}
      >

        Entre na sua conta para continuar

      </Text>

      {/* EMAIL */}

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
          fontSize: 16
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
          marginBottom: 30,
          fontSize: 16
        }}
      />

      {/* BOTÃO */}

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: COLORS.primary,
          paddingVertical: 18,
          borderRadius: 18,
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

          Entrar

        </Text>

      </TouchableOpacity>

      {/* REGISTO */}

      <TouchableOpacity
        onPress={() =>
          router.push("/register")
        }
        style={{
          marginTop: 24,
          alignItems: "center"
        }}
      >

        <Text
          style={{
            color: COLORS.muted
          }}
        >

          Não tem conta?
          {" "}

          <Text
            style={{
              color: COLORS.primary,
              fontWeight: "700"
            }}
          >

            Registar

          </Text>

        </Text>

      </TouchableOpacity>

    </KeyboardAvoidingView>

  );

}