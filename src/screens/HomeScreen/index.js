import React from "react";
import { Fab, Icon, VStack, HStack, Center, Text } from "native-base";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", paddingTop: 16 }}>
      <VStack space={4} alignItems="center">
        <HStack space={4} alignItems="center">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Agenda");
            }}
          >
            <Center w="32" h="32" bg="indigo.400" rounded="md" shadow={3}>
              <Icon color="white" as={AntDesign} name="medicinebox" size="6xl" />
              <Text color="white" bold>
                Minha agenda
              </Text>
            </Center>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AppointmentSchedule");
            }}
          >
            <Center w="32" h="32" bg="indigo.400" rounded="md" shadow={3}>
              <Icon color="white" as={AntDesign} name="contacts" size="6xl" />
              <Text color="white" bold>
                Marcar consulta
              </Text>
            </Center>
          </TouchableOpacity>
        </HStack>
      </VStack>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={AntDesign} name="wechat" size="sm" />}
        label="Suporte"
      />
    </View>
  );
}
