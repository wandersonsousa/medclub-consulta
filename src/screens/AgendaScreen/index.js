import React, { useEffect, useState } from "react";
import { Icon, Text, Box, Stack, Button } from "native-base";
import { SafeAreaView, View, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

import { AppointmentRepository } from "../../core/repositories/appointment-repository";
import { AppointmentService } from "../../core/services/appointment-service";
import { AppService } from "../../core/services/app-service";

const AppointmentRepositoryImpl = new AppointmentRepository();
const AppointmentServiceImpl = new AppointmentService(AppointmentRepositoryImpl);
const AppServiceImpl = new AppService();

const LOCALS = AppServiceImpl.getConstants().LOCALS;
const DISPONIBLE_DATE = AppServiceImpl.getConstants().DISPONIBLE_DATE;

function fetchAppointments() {
  return AppointmentServiceImpl.list();
}
export default function AgendaScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);

  const isFocused = useIsFocused();

  const refetchAppointments = () => {
    fetchAppointments().then((res) => {
      const appointments = res.map((ap) => {
        const date = DISPONIBLE_DATE.find((dDate) => dDate.id == ap.date_id);
        const local = LOCALS.find((l) => l.id == ap.local_id);
        return { ...date, ...local, ...ap };
      });

      setAppointments(appointments);
    });
  };

  useEffect(() => {
    refetchAppointments();
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", paddingTop: 16 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack space={2} w="100%">
          {appointments.map((ap) => {
            return (
              <Box key={ap.id} bg={"indigo.50"} p={2}>
                <Stack direction="row" p={4} space={4}>
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
                        Para: {ap.day}({ap.dayName}) - {ap.hour} de {ap.month}
                      </Text>
                    </View>
                  </View>
                </Stack>
                <Stack alignItems="center" justifyContent="center" space={4} direction="row">
                  <Button
                    alignSelf="flex-start"
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
                    alignSelf="flex-start"
                    colorScheme="secondary"
                    onPress={async () => {
                      navigation.navigate("AppointmentEdit", {
                        appointment: ap,
                      });
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    alignSelf="flex-start"
                    colorScheme="error"
                    onPress={async () => {
                      await AppointmentServiceImpl.delete(ap.id);
                      refetchAppointments();
                    }}
                  >
                    Deletar
                  </Button>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}
