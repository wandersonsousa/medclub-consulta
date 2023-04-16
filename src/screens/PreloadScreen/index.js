import React from "react";
import { View } from "react-native";
import { Heading, Button } from "native-base";
import MedicineIllustrationSVG from "../../assets/svg/MedicineIllustrationSVG.jsx";

export default function PreloadScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MedicineIllustrationSVG width="100%" height="40%" />
      <View>
        <Heading size="md" bold>
          MEDFACIL
        </Heading>
      </View>
      <View>
        <Button
          onPress={() => {
            navigation.navigate("Home");
          }}
          mt={1}
        >
          Agende agora sua consulta
        </Button>
      </View>
    </View>
  );
}
