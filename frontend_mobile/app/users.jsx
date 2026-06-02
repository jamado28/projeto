import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getUsers, updateUser, deleteUser } from "../services/authUtils";

import { COLORS } from "../styles/colors";

export default function UsersScreen() {
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("cliente");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();

      setUsers(response.data);
    } catch (error) {
      console.log(error);
      setErro("Não foi possível carregar os utilizadores.");
    }
  };

  const handleEdit = (user) => {
    setErro("");
    setSucesso("");
    setEditingId(user.id);

    setEmail(user.email);

    setRole(user.role);

    setPassword("");
  };
  if (!email) {
    setErro("O email é obrigatório.");
    return;
  }
  if (!email.includes("@")) {
    setErro("Introduza um email válido.");
    return;
  }
  if (password && password.length < 6) {
    setErro("A password deve ter pelo menos 6 caracteres.");
    return;
  }
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await updateUser(editingId, {
        email,
        password,
        role,
      });

      setSucesso("Utilizador atualizado com sucesso.");

      setTimeout(() => {
        setSucesso("");
      }, 4000);

      setEditingId(null);

      setEmail("");

      setPassword("");

      setRole("cliente");

      loadUsers();
    } catch (error) {
      console.log(error);

      setErro(error.response?.data?.message || "Erro ao atualizar utilizador.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
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
            await deleteUser(id);

            setSucesso("Utilizador eliminado com sucesso.");

            loadUsers();
          } catch (error) {
            console.log(error);

            setErro("Erro ao eliminar utilizador.");
          }
        },
      },
    ]);
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
          Utilizadores
        </Text>

        <Text
          style={{
            color: COLORS.muted,
          }}
        >
          Gerir contas do sistema
        </Text>
      </View>

      {/* FORM */}
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
      {editingId && (
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: COLORS.card,
            borderRadius: 28,
            padding: 24,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              color: COLORS.text,
              fontSize: 24,
              fontWeight: "900",
              marginBottom: 22,
            }}
          >
            Editar Utilizador
          </Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#6b7280"
            value={email}
            onChangeText={setEmail}
            accessibilityLabel="Email"
            style={{
              backgroundColor: "#111827",
              color: COLORS.text,
              padding: 18,
              borderRadius: 18,
              marginBottom: 16,
              fontSize: 16,
            }}
          />

          <TextInput
            placeholder="Nova password"
            placeholderTextColor="#6b7280"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            accessibilityLabel="Nova password"
            style={{
              backgroundColor: "#111827",
              color: COLORS.text,
              padding: 18,
              borderRadius: 18,
              marginBottom: 16,
              fontSize: 16,
            }}
          />

          <TextInput
            placeholder="Role"
            placeholderTextColor="#6b7280"
            value={role}
            onChangeText={setRole}
            accessibilityLabel="Role"
            style={{
              backgroundColor: "#111827",
              color: COLORS.text,
              padding: 18,
              borderRadius: 18,
              marginBottom: 26,
              fontSize: 16,
            }}
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
              {loading ? "A atualizar..." : "Atualizar Utilizador"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* LISTA */}

      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        {users?.map((user) => (
          <View
            key={user.id}
            style={{
              backgroundColor: COLORS.card,
              borderRadius: 28,
              padding: 24,
              marginBottom: 20,
            }}
          >
            {/* TOPO */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 22,
              }}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    color: COLORS.text,
                    fontSize: 22,
                    fontWeight: "900",
                    marginBottom: 8,
                  }}
                >
                  {user.email}
                </Text>

                <Text
                  style={{
                    color: COLORS.muted,
                  }}
                >
                  Criado em {new Date(user.createdAt).toLocaleDateString()}
                </Text>
              </View>

              {/* BADGE */}

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
                    fontWeight: "900",
                  }}
                >
                  {user.role}
                </Text>
              </View>
            </View>

            {/* BOTÕES */}

            <View
              style={{
                flexDirection: "row",
                gap: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => handleEdit(user)}
                accessibilityRole="button"
                style={{
                  flex: 1,
                  backgroundColor: "#374151",
                  paddingVertical: 16,
                  borderRadius: 18,
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
                onPress={() => handleDelete(user.id)}
                accessibilityRole="button"
                style={{
                  flex: 1,
                  backgroundColor: "#7f1d1d",
                  paddingVertical: 16,
                  borderRadius: 18,
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
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
