import React, { useState } from "react";
import { Icon, Stack, Heading, Text, Box, Button } from "native-base";
import { View, Image, SafeAreaView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { AppService } from "../../core/services/app-service";
import { ScrollView } from "react-native";

const AppServiceImpl = new AppService();
const SPECIALITIES = AppServiceImpl.getConstants().SPECIALITIES;

export default function AppointmentScheduleScreen({ navigation }) {
  const [brokenImages, setBrokenImages] = useState([]);

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
            const isThisSpecialityImageBroken = brokenImages.find((brokenImage) => brokenImage === speciality.aq_foto);

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
                    {!isThisSpecialityImageBroken ? (
                      <Image
                        fadeDuration={0}
                        style={{ width: 50, height: 50 }}
                        source={{
                          uri: speciality.aq_foto,
                        }}
                        onError={() => {
                          setBrokenImages((prev) => {
                            return [...prev, speciality.aq_foto];
                          });
                        }}
                      />
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
