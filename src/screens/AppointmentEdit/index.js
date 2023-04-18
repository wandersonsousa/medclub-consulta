import React, { useState } from "react";
import { Icon, Text, Box, Stack, CheckIcon, Button, useToast } from "native-base";
import { SafeAreaView, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Datetime } from "../../core/lib/Datetime";
import { Select } from "native-base";
import { AppService } from "../../core/services/app-service";
import { AppointmentRepository } from "../../core/repositories/appointment-repository";
import { AppointmentService } from "../../core/services/appointment-service";

const AppServiceImpl = new AppService();
const DISPONIBLE_DATE = AppServiceImpl.getConstants().DISPONIBLE_DATE;
const LOCALS = AppServiceImpl.getConstants().LOCALS;

const AppointmentRepositoryImpl = new AppointmentRepository();
const AppointmentServiceImpl = new AppointmentService(AppointmentRepositoryImpl);

export default function AppointmentEditScreen({ route, navigation }) {
  const toast = useToast();

  const { appointment } = route.params;

  const createdAt = Datetime.unix(appointment.createdAt)
    .toDate()
    .toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  const [selectedDate, setSelectedDate] = useState(appointment.date_id);
  const [selectedLocal, setSelectedLocal] = useState(appointment.local_id);

  const onSubmit = async () => {
    await AppointmentServiceImpl.save({
      id: appointment.id,
      date_id: selectedDate,
      local_id: selectedLocal,
    });
    toast.show({
      title: "Consulta atualizada",
      status: "success",
    });

    navigation.navigate("Agenda");
  };

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
              <Text bold>Alterar data da consulta</Text>
              <Select
                selectedValue={selectedDate}
                minWidth="200"
                accessibilityLabel="Mudar horário da consulta"
                placeholder="Mudar horário da consulta"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setSelectedDate(itemValue)}
              >
                {DISPONIBLE_DATE.map((date) => (
                  <Select.Item
                    key={date.id}
                    label={`
                  ${date.day}(${date.dayName}) - ${date.hour} de ${date.month}
                  `}
                    value={date.id}
                  />
                ))}
              </Select>
            </View>

            <View>
              <Text bold>Alterar local da consulta</Text>
              <Select
                selectedValue={selectedLocal}
                minWidth="200"
                accessibilityLabel="Mudar horário da consulta"
                placeholder="Mudar horário da consulta"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                  _text: {
                    color: "white",
                  },
                }}
                mt={1}
                onValueChange={(itemValue) => setSelectedLocal(itemValue)}
              >
                {LOCALS.map((local) => (
                  <Select.Item
                    key={local.id}
                    label={`${local.nm_bairro},\n${local.nm_local},\nMédico: ${local.specialist}`}
                    value={local.id}
                  />
                ))}
              </Select>
            </View>
            <View>
              <Text style={{ alignSelf: "flex-start" }} mt={4}>
                Criada em: {createdAt}
              </Text>
            </View>
          </View>
        </Stack>
        <Button
          style={{
            alignSelf: "center",
          }}
          size={"lg"}
          onPress={onSubmit}
        >
          Atualizar consulta
        </Button>
      </Stack>
    </SafeAreaView>
  );
}
