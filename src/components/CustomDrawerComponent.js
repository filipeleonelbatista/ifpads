import { FontAwesome } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Alert, Image, ImageBackground, Share, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAudioContext } from "../hooks/useAudioContext";

export default function CustomDrawerComponent(props) {
  const { pads, selectedPad, loadPreset } = useAudioContext();

  const handleNavigate = () => {
    props.navigation.navigate("ConfigScreen");
    props.navigation.closeDrawer();
  }

  if (!pads || !selectedPad) {
    return <Text>Carregando... </Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#101010" }}
      >
        <ImageBackground
          accessible={true}
          accessibilityLabel={
            "Logo com as letras I F e Pads escrito em baixo do F em laranja"
          }
          style={{ padding: 20 }}
          source={require("../assets/images/banner.png")}
        >
          <Image
            accessible={true}
            accessibilityLabel={selectedPad.userName + " logo"}
            source={selectedPad.image}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginBottom: 18,
            }}
          />
          <Text style={{ color: "#FFF", fontWeight: "600" }}>
            {selectedPad.userName}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#FFF", paddingTop: 10 }}>
          {pads.map((pad, index) => {
            return (
              <TouchableOpacity
                key={index}
                accessible={true}
                accessibilityLabel={"Selecione os audios do " + pad.userName}
                accessibilityTraits={"button"}
                accessibilityComponentType={"button"}
                accessibilityViewIsModal={true}
                accessibilityElementsHidden={true}
                onPress={() => {
                  loadPreset(pad);
                  props.navigation.navigate("Home");
                  props.navigation.closeDrawer();
                }}
                style={{
                  padding: 15,
                  marginHorizontal: 12,
                  marginVertical: 2,
                  borderRadius: 8,
                  backgroundColor:
                    pad.userName === selectedPad.userName
                      ? "#ccc"
                      : "transparent",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    accessible={true}
                    accessibilityLabel={pad.userName + " logo"}
                    source={pad.image}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                    }}
                  />
                  <Text style={{ marginLeft: 10 }}>{pad.userName}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 4, borderTopWidth: 1, borderTopColor: "#CCC" }}>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel={
            "Criar seu pad"
          }
          accessibilityTraits={"button"}
          accessibilityComponentType={"button"}
          accessibilityViewIsModal={true}
          accessibilityElementsHidden={true}
          onPress={handleNavigate}
          style={{
            padding: 15,
            marginHorizontal: 12,
            marginVertical: 2,
            borderRadius: 8,
            backgroundColor: "transparent"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="cog" size={22} color="black" />
            <Text style={{ marginLeft: 10 }}>Criar seu pad</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
