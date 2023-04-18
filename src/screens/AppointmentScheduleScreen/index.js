import React from "react";
import { Icon, Stack, Heading, Text, Box, Button } from "native-base";
import { View, SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { AppService } from "../../core/services/app-service";

const AppServiceImpl = new AppService();
const SPECIALITIES = AppServiceImpl.getConstants().SPECIALITIES;

export default function AppointmentScheduleScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", paddingTop: 16 }}>
      <Text mb={-1}>Próximo passo:</Text>
      <Heading mb={4} color={"indigo.800"}>
        Selecionar especialidade
      </Heading>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack
          flexWrap="wrap"
          direction="row"
          space={2}
          alignItems="center"
          style={{
            width: "100%",
            height: "100%",
            gap: 8,
            paddingHorizontal: 16,
          }}
        >
          {SPECIALITIES.map((speciality) => {
            return (
              <TouchableOpacity
                key={speciality.id}
                onPress={() => {
                  navigation.navigate("AppointmentScheduleDate", {
                    speciality,
                  });
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
                  paddingX={2}
                  w="300"
                  h="100"
                  bg="white"
                  rounded="md"
                  shadow={3}
                >
                  <Box bg={"indigo.100"} borderRadius={8} p={3}>
                    {Object.keys(SPECIALITIES_IMAGES).find((key) => key === speciality.slug) ? (
                      <Image style={{ width: 50, height: 50 }} source={SPECIALITIES_IMAGES[speciality.slug]} />
                    ) : (
                      <Icon as={AntDesign} name="unknowfile1" size={50} color="black" />
                    )}
                  </Box>
                  <View style={{ flexGrow: 1, gap: 8 }}>
                    <View>
                      <Text style={{ alignSelf: "flex-start" }}>{speciality.nm_especialidade}</Text>
                    </View>
                    <View>
                      <Button
                        variant="outline"
                        style={{ alignSelf: "flex-start" }}
                        onPress={() => {
                          navigation.navigate("AppointmentScheduleDate", {
                            speciality,
                          });
                        }}
                      >
                        Selecionar
                      </Button>
                    </View>
                  </View>
                </Box>
              </TouchableOpacity>
            );
          })}
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
}

const SPECIALITIES_IMAGES = {
  "alergia-e-imunologia": require("../../assets/img/specialities/alergia-e-imunologia.png"),
  andrologia: require("../../assets/img/specialities/andrologia.png"),
  anestesiologia: require("../../assets/img/specialities/anestesiologia.png"),
  angiologia: require("../../assets/img/specialities/angiologia.png"),
  cardiologia: require("../../assets/img/specialities/cardiologia.png"),
  "cirurgia-buco-maxilo-facial": require("../../assets/img/specialities/cirurgia-buco-maxilo-facial.png"),
  "cirurgia-de-cabeca-e-pescoco": require("../../assets/img/specialities/cirurgia-de-cabeca-e-pescoco.png"),
  "cirurgia-do-aparelho-digestivo": require("../../assets/img/specialities/cirurgia-do-aparelho-digestivo.png"),
  "cirurgia-geral": require("../../assets/img/specialities/cirurgia-geral.png"),
  "cirurgia-pediatrica": require("../../assets/img/specialities/cirurgia-pediatrica.png"),
  "cirurgia-plastica": require("../../assets/img/specialities/cirurgia-plastica.png"),
  "cirurgia-toracica": require("../../assets/img/specialities/cirurgia-toracica.png"),
  "clinica-geral": require("../../assets/img/specialities/clinica-geral.png"),
  coloproctologia: require("../../assets/img/specialities/coloproctologia.png"),
  dermatologia: require("../../assets/img/specialities/dermatologia.png"),
  endocrinologia: require("../../assets/img/specialities/endocrinologia.png"),
  fonoaudiologia: require("../../assets/img/specialities/fonoaudiologia.png"),
  gastroenterologia: require("../../assets/img/specialities/gastroenterologia.png"),
  geriatria: require("../../assets/img/specialities/geriatria.png"),
  ginecologia: require("../../assets/img/specialities/ginecologia.png"),
  hematologia: require("../../assets/img/specialities/hematologia.png"),
  hepatologia: require("../../assets/img/specialities/hepatologia.png"),
  homeopatia: require("../../assets/img/specialities/homeopatia.png"),
  infectologia: require("../../assets/img/specialities/infectologia.png"),
  mastologia: require("../../assets/img/specialities/mastologia.png"),
  nefrologia: require("../../assets/img/specialities/nefrologia.png"),
  neurocirurgia: require("../../assets/img/specialities/neurocirurgia.png"),
  "neurologia-clinica": require("../../assets/img/specialities/neurologia-clinica.png"),
  neuropediatria: require("../../assets/img/specialities/neuropediatria.png"),
  nutricionista: require("../../assets/img/specialities/nutricionista.png"),
  nutrologo: require("../../assets/img/specialities/nutrologo.png"),
  obstetricia: require("../../assets/img/specialities/obstetricia.png"),
  oftalmologia: require("../../assets/img/specialities/oftalmologia.png"),
  ortopedia: require("../../assets/img/specialities/ortopedia.png"),
  otorrinolaringologia: require("../../assets/img/specialities/otorrinolaringologia.png"),
  pediatria: require("../../assets/img/specialities/pediatria.png"),
  pneumologia: require("../../assets/img/specialities/pneumologia.png"),
  psicologia: require("../../assets/img/specialities/psicologia.png"),
  psicopedagogia: require("../../assets/img/specialities/psicopedagogia.png"),
  psiquiatria: require("../../assets/img/specialities/psiquiatria.png"),
  "reproducao-humana": require("../../assets/img/specialities/reproducao-humana.png"),
  reumatologia: require("../../assets/img/specialities/reumatologia.png"),
  urologia: require("../../assets/img/specialities/urologia.png"),
  "andrologia.png": require("../../assets/img/specialities/andrologia.png"),
  "anestesiologia.png": require("../../assets/img/specialities/anestesiologia.png"),
};
