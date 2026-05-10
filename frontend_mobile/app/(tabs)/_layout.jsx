import { Tabs } from "expo-router";

import {
  Ionicons
} from "@expo/vector-icons";

import { COLORS } from "../../styles/colors";

export default function TabLayout() {

  return (

    <Tabs

      screenOptions={{

        headerShown: false,

        tabBarStyle: {

          backgroundColor: COLORS.card,

          borderTopWidth: 0,

          height: 85,

          paddingBottom: 12,

          paddingTop: 10,

          position: "absolute",

          marginHorizontal: 16,

          marginBottom: 16,

          borderRadius: 24

        },

        tabBarActiveTintColor: COLORS.primary,

        tabBarInactiveTintColor: COLORS.muted,

        tabBarLabelStyle: {

          fontSize: 12,

          fontWeight: "600"

        }

      }}

    >

      <Tabs.Screen
        name="index"
        options={{

          title: "Home",

          tabBarIcon: ({ color, size }) => (

            <Ionicons
              name="home"
              size={size}
              color={color}
            />

          )

        }}
      />

      <Tabs.Screen
        name="eventos"
        options={{

          title: "Eventos",

          tabBarIcon: ({ color, size }) => (

            <Ionicons
              name="car-sport"
              size={size}
              color={color}
            />

          )

        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{

          title: "Perfil",

          tabBarIcon: ({ color, size }) => (

            <Ionicons
              name="person"
              size={size}
              color={color}
            />

          )

        }}
      />

    </Tabs>

  );

}