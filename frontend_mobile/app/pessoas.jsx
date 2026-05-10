import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { getPessoas, updatePessoa } from "../services/pessoaService";

import { getUser } from "../services/authUtils";

import { COLORS } from "../styles/colors";

export default function PessoasScreen() {
  const [user, setUser] = useState(null);

  const [pessoas, setPessoas] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [nome, setNome] = useState("");

  const [email, setEmail] = useState("");

  const [telemovel, setTelemovel] = useState("");

  const [dataNascimento, setDataNascimento] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const loggedUser = await getUser();
    console.log(loggedUser);

    setUser(loggedUser);

    loadPessoas(loggedUser);
  };

  const loadPessoas = async (loggedUser) => {
    try {
      const response = await getPessoas();

      const pessoas = response.data;

      // CLIENTE

      if (loggedUser?.role === "cliente") {
        const pessoa = pessoas.find((p) => p.user_id === loggedUser.id);

        if (!pessoa) {
          return;
        }

        setPessoas([pessoa]);

        setEditingId(pessoa.id_pessoa);

        setNome(pessoa.nome || "");

        setEmail(pessoa.email || "");

        setTelemovel(pessoa.telemovel || "");

        setDataNascimento(pessoa.data_nascimento || "");
      } else {
        setPessoas(pessoas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      await updatePessoa(editingId, {
        nome,
        email,
        telemovel,
        data_nascimento: dataNascimento,
      });

      alert("Dados atualizados");

      loadPessoas(user);
    } catch (error) {
      console.log(error);
    }
  };
  if (!user) {
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
          Perfil
        </Text>

        <Text
          style={{
            color: COLORS.muted,
          }}
        >
          Gerir os seus dados
        </Text>
      </View>

      {/* CLIENTE */}

      {user?.role === "cliente" && (
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          {/* CARD */}

          <View
            style={{
              backgroundColor: COLORS.card,
              borderRadius: 30,
              padding: 28,
            }}
          >
            {/* AVATAR */}

            <View
              style={{
                width: 90,
                height: 90,
                borderRadius: 999,
                backgroundColor: COLORS.primary,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontSize: 36,
                  fontWeight: "900",
                }}
              >
                {nome?.charAt(0)?.toUpperCase()}
              </Text>
            </View>

            {/* TITULO */}

            <Text
              style={{
                color: COLORS.text,
                fontSize: 30,
                fontWeight: "900",
                marginBottom: 8,
              }}
            >
              {nome}
            </Text>

            <Text
              style={{
                color: COLORS.muted,
                marginBottom: 28,
              }}
            >
              Conta pessoal
            </Text>

            {/* INPUTS */}

            <TextInput
              placeholder="Nome"
              placeholderTextColor="#6b7280"
              value={nome}
              onChangeText={setNome}
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
              placeholder="Email"
              placeholderTextColor="#6b7280"
              value={email}
              onChangeText={setEmail}
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
              placeholder="Telemóvel"
              placeholderTextColor="#6b7280"
              value={telemovel}
              onChangeText={setTelemovel}
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
              placeholder="Data nascimento"
              placeholderTextColor="#6b7280"
              value={dataNascimento}
              onChangeText={setDataNascimento}
              style={{
                backgroundColor: "#111827",
                color: COLORS.text,
                padding: 18,
                borderRadius: 18,
                marginBottom: 26,
                fontSize: 16,
              }}
            />

            {/* BOTÃO */}

            <TouchableOpacity
              onPress={handleSubmit}
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
                Guardar Alterações
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* FORM ADMIN */}

      {user?.role === "admin" && editingId && (
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 30,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.card,
              borderRadius: 30,
              padding: 28,
            }}
          >
            <Text
              style={{
                color: COLORS.text,
                fontSize: 26,
                fontWeight: "900",
                marginBottom: 24,
              }}
            >
              Editar Pessoa
            </Text>

            <TextInput
              placeholder="Nome"
              placeholderTextColor="#6b7280"
              value={nome}
              onChangeText={setNome}
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
              placeholder="Email"
              placeholderTextColor="#6b7280"
              value={email}
              onChangeText={setEmail}
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
              placeholder="Telemóvel"
              placeholderTextColor="#6b7280"
              value={telemovel}
              onChangeText={setTelemovel}
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
              placeholder="Data nascimento"
              placeholderTextColor="#6b7280"
              value={dataNascimento}
              onChangeText={setDataNascimento}
              style={{
                backgroundColor: "#111827",
                color: COLORS.text,
                padding: 18,
                borderRadius: 18,
                marginBottom: 24,
                fontSize: 16,
              }}
            />

            <TouchableOpacity
              onPress={handleSubmit}
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
                Atualizar Pessoa
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* ADMIN */}

      {user?.role === "admin" && (
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          {pessoas.map((pessoa) => (
            <View
              key={pessoa.id_pessoa}
              style={{
                backgroundColor: COLORS.card,
                borderRadius: 28,
                padding: 24,
                marginBottom: 20,
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
                {pessoa.nome || "Sem nome"}
              </Text>

              <Text
                style={{
                  color: COLORS.muted,
                  marginBottom: 6,
                }}
              >
                {pessoa.email}
              </Text>

              <Text
                style={{
                  color: COLORS.muted,
                  marginBottom: 6,
                }}
              >
                {pessoa.telemovel || "Sem telemóvel"}
              </Text>

              <Text
                style={{
                  color: COLORS.muted,
                  marginBottom: 18,
                }}
              >
                {pessoa.data_nascimento || "Sem data nascimento"}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setEditingId(pessoa.id_pessoa);

                  setNome(pessoa.nome || "");

                  setEmail(pessoa.email || "");

                  setTelemovel(pessoa.telemovel || "");

                  setDataNascimento(pessoa.data_nascimento || "");
                }}
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
                    fontWeight: "900",
                  }}
                >
                  Editar
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
