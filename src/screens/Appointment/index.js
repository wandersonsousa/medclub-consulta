import React from "react";
import { Icon, Text, Box, Stack } from "native-base";
import { SafeAreaView, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Datetime } from "../../core/lib/Datetime";

export default function AppointmentScreen({ route }) {
  const { appointment } = route.params;
  const createdAt = Datetime.unix(appointment.createdAt)
    .toDate()
    .toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", paddingTop: 16 }}>
      <Stack space={4} w="100%">
        <Stack direction="row" bg={"indigo.50"} key={appointment.id} p={4} space={4}>
          <Box bg={"indigo.100"} borderRadius={8} p={3} alignItems="center" justifyContent="center">
            <Icon as={AntDesign} name="medicinebox" size={50} />
          </Box>
          <View style={{ flexGrow: 1, gap: 8 }}>
            <View>
              <Text bold>Paciente</Text>
              <Text style={{ alignSelf: "flex-start" }}>João da Silva</Text>
            </View>

            <View>
              <Text bold>Agendada para</Text>
              <Text style={{ alignSelf: "flex-start" }}>
                {appointment.day}({appointment.dayName}) - {appointment.hour} de {appointment.month}
              </Text>
            </View>

            <View>
              <Text bold>Endereço</Text>
              <Text style={{ alignSelf: "flex-start" }}>{appointment.nm_local}</Text>

              <Text style={{ alignSelf: "flex-start" }}>{appointment.nm_bairro}</Text>
            </View>
            <View>
              <Text style={{ alignSelf: "flex-start" }} bold>
                {appointment.specialist} -
              </Text>
              <Text style={{ alignSelf: "flex-start" }} bold>
                Especialista em {appointment.speciality.nm_especialidade}
              </Text>
            </View>
            <View>
              <Text style={{ alignSelf: "flex-start" }} bold>
                Valor: {appointment.price}
              </Text>

              <Text style={{ alignSelf: "flex-start" }} mt={4}>
                Criada em: {createdAt}
              </Text>
            </View>
          </View>
        </Stack>
      </Stack>
    </SafeAreaView>
  );
}
