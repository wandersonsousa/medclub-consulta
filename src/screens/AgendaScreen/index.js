import React, { useEffect, useState } from "react";
import { Icon, Text, Box, Stack, Button } from "native-base";
import { SafeAreaView, View } from "react-native";
import { AppointmentRepository } from "../../core/repositories/appointment-repository";
import { AppointmentService } from "../../core/services/appointment-service";
import { AntDesign } from "@expo/vector-icons";
import { Datetime } from "../../core/lib/Datetime";

const AppointmentRepositoryImpl = new AppointmentRepository();
const AppointmentServiceImpl = new AppointmentService(AppointmentRepositoryImpl);

function fetchAppointments() {
  return AppointmentServiceImpl.list();
}
export default function AgendaScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);
  const refetchAppointments = () => {
    fetchAppointments().then((res) => setAppointments(res));
  };

  useEffect(() => {
    refetchAppointments();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", paddingTop: 16 }}>
      <Stack space={4} w="100%">
        {appointments.map((ap) => {
          const createdAt = Datetime.unix(ap.createdAt)
            .toDate()
            .toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

          return (
            <Stack direction="row" bg={"indigo.50"} key={ap.id} p={4} space={4}>
              <Box bg={"indigo.100"} borderRadius={8} p={3} alignItems="center" justifyContent="center">
                <Icon as={AntDesign} name="medicinebox" size={50} />
              </Box>
              <View style={{ flexGrow: 1, gap: 8 }}>
                <View>
                  <Text style={{ alignSelf: "flex-start" }}>{ap.nm_local}</Text>

                  <Text style={{ alignSelf: "flex-start" }}>{ap.nm_bairro}</Text>
                </View>
                <View>
                  <Text style={{ alignSelf: "flex-start" }} bold>
                    Especialista: {ap.specialist}
                  </Text>
                  <Text style={{ alignSelf: "flex-start" }} bold>
                    Valor: {ap.price}
                  </Text>

                  <Text style={{ alignSelf: "flex-start" }} bold>
                    Em: {createdAt}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center", gap: 4 }}>
                <Button
                  colorScheme="primary"
                  onPress={async () => {
                    navigation.navigate("Appointment", {
                      appointment: ap,
                    });
                  }}
                >
                  Visualizar
                </Button>
                <Button
                  colorScheme={"error"}
                  onPress={async () => {
                    await AppointmentServiceImpl.delete(ap.id);
                    refetchAppointments();
                  }}
                >
                  Deletar
                </Button>
              </View>
            </Stack>
          );
        })}
      </Stack>
    </SafeAreaView>
  );
}