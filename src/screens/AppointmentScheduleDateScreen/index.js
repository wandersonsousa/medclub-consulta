import React, { useState } from "react";
import { Icon, Stack, Heading, Text, Box, Button } from "native-base";
import { View, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { AppService } from "../../core/services/app-service";
import { ScrollView } from "react-native";
import { AppointmentRepository } from "../../core/repositories/appointment-repository";
import { AppointmentService } from "../../core/services/appointment-service";

const AppServiceImpl = new AppService();
const LOCALS = AppServiceImpl.getConstants().LOCALS;
const DISPONIBLE_DATE = AppServiceImpl.getConstants().DISPONIBLE_DATE;

const AppointmentRepositoryImpl = new AppointmentRepository();
const AppointmentServiceImpl = new AppointmentService(AppointmentRepositoryImpl);

export default function AppointmentScheduleDateScreen({ navigation, route }) {
  const { speciality } = route.params;

  const [appointment, setAppointment] = useState({
    date: null,
    local: null,
    step: 0,
  });

  const onSubmit = async () => {
    await AppointmentServiceImpl.save({
      local_id: appointment.local.id,
      date_id: appointment.date.id,
      speciality: speciality,
    });

    navigation.navigate("Agenda");
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", paddingTop: 16 }}>
      <Text mb={-1}>Próximo passo:</Text>
      <Heading mb={4} color={"indigo.800"}>
        {appointment.step == 0 && "Escolha o local da sua consulta"}
        {appointment.step == 1 && "Horários disponíveis pra consulta"}
        {appointment.step == 2 && "Confirmar consulta"}
      </Heading>

      <ScrollView showsVerticalScrollIndicator={false}>
        {appointment.step === 0 && (
          <Stack
            flexWrap="wrap"
            direction="row"
            space={2}
            alignItems="center"
            style={{
              width: "100%",
              height: "100%",
              gap: 8,
              paddingHorizontal: 8,
            }}
          >
            {LOCALS.map((local) => {
              return (
                <TouchableOpacity
                  key={local.id}
                  onPress={() => {
                    setAppointment((prev) => ({
                      ...prev,
                      local,
                      step: 1,
                    }));
                  }}
                >
                  <Box
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      overflow: "hidden",
                      gap: 16,
                    }}
                    paddingX={4}
                    w="300"
                    h="120"
                    bg="white"
                    rounded="md"
                    shadow={3}
                  >
                    <Box bg={"indigo.100"} borderRadius={8} p={3}>
                      <Icon as={Feather} name="map" size={50} />
                    </Box>
                    <View style={{ flexGrow: 1, gap: 8 }}>
                      <View>
                        <Text style={{ alignSelf: "flex-start" }}>{local.nm_local}</Text>

                        <Text style={{ alignSelf: "flex-start" }}>{local.nm_bairro}</Text>
                      </View>
                      <View>
                        <Text style={{ alignSelf: "flex-start" }} bold>
                          Especialista: {local.specialist}
                        </Text>
                        <Text style={{ alignSelf: "flex-start" }} bold>
                          Valor: {local.price}
                        </Text>
                      </View>
                    </View>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </Stack>
        )}
        {appointment.step === 1 && (
          <Stack
            flexWrap="wrap"
            direction="row"
            space={2}
            alignItems="center"
            style={{
              width: "100%",
              height: "100%",
              gap: 8,
            }}
            paddingX={4}
          >
            {DISPONIBLE_DATE.map((dispobibleDate) => {
              return (
                <TouchableOpacity
                  key={dispobibleDate.id}
                  onPress={() => {
                    setAppointment((prev) => ({
                      ...prev,
                      date: dispobibleDate,
                      step: 2,
                    }));
                  }}
                >
                  <Box
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      overflow: "hidden",
                      gap: 16,
                    }}
                    paddingX={2}
                    w="300"
                    h="100"
                    bg="white"
                    rounded="md"
                    shadow={3}
                  >
                    <Box bg={"indigo.100"} borderRadius={8} p={3}>
                      <Icon as={Feather} name="clock" size={50} />
                    </Box>
                    <View>
                      <View>
                        <Text bold>
                          {dispobibleDate.day}({dispobibleDate.dayName}) - {dispobibleDate.hour}
                        </Text>
                        <Text bold fontSize={"2xl"}>
                          {dispobibleDate.month}
                        </Text>
                      </View>
                    </View>
                    <View></View>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </Stack>
        )}

        {appointment.step === 2 && (
          <Stack>
            <View style={{ flexGrow: 1 }}>
              <View>
                <Text bold style={{ alignSelf: "flex-start" }} fontSize="md">
                  Paciente
                </Text>
                <Text fontSize="xl">João da Silva</Text>

                <Text bold style={{ alignSelf: "flex-start" }} fontSize="md">
                  Especialista
                </Text>
                <Text fontSize="xl">
                  {appointment.local.specialist} em {speciality.nm_especialidade}
                </Text>
                <Text bold style={{ alignSelf: "flex-start" }} fontSize="md">
                  Data
                </Text>
                <Text fontSize="xl">
                  {appointment.date.day} de {appointment.date.month} - {appointment.date.hour}
                </Text>
                <Text bold style={{ alignSelf: "flex-start" }} fontSize="md">
                  Preço
                </Text>
                <Text fontSize="xl">{appointment.local.price}</Text>

                <Text bold style={{ alignSelf: "flex-start" }} fontSize="md">
                  Local de atendimento
                </Text>
                <Text fontSize="xl">{appointment.local.nm_local}</Text>
                <Text fontSize="xl">{appointment.local.nm_bairro}</Text>

                <Button mt={4} onPress={onSubmit}>
                  Confirmar
                </Button>
              </View>
            </View>
          </Stack>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
