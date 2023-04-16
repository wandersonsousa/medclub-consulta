import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { extendTheme, NativeBaseProvider } from "native-base";
import HomeScreen from "../screens/HomeScreen";
import PreloadScreen from "../screens/PreloadScreen";
import AgendaScreen from "../screens/AgendaScreen";
import AppointmentScheduleScreen from "../screens/AppointmentScheduleScreen";
import AppointmentScheduleDateScreen from "../screens/AppointmentScheduleDateScreen";
import AppointmentScreen from "../screens/Appointment";

const colors = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};

const Stack = createNativeStackNavigator();
const theme = extendTheme({ colors });

export default function MainStack() {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Preload"
            component={PreloadScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "MedFacil" }} />
          <Stack.Screen name="Agenda" component={AgendaScreen} />
          <Stack.Screen
            name="AppointmentSchedule"
            component={AppointmentScheduleScreen}
            options={{ title: "Agendar Consulta" }}
          />
          <Stack.Screen
            name="AppointmentScheduleDate"
            component={AppointmentScheduleDateScreen}
            options={{ title: "Agendar Consulta" }}
          />
          <Stack.Screen name="Appointment" component={AppointmentScreen} options={{ title: "Consulta" }} />
        </Stack.Navigator>
      </NativeBaseProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
