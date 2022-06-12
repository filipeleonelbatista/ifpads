import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Alert, Image, ImageBackground, Share, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAudioContext } from "../hooks/useAudioContext";
import * as Clipboard from "expo-clipboard";

export default function CustomDrawerComponent(props) {
  const { pads, selectedPad, loadPreset } = useAudioContext();

  const handlePix = () => {
    Clipboard.setStringAsync(
      "00020126580014BR.GOV.BCB.PIX013649b3aa64-47eb-47a3-b439-b765a4d0f22c5204000053039865802BR5925FILIPE DE LEONEL BATISTA 6009SAO PAULO61080540900062250521hGjPosyoJ4dswj614vgvd63046514"
    );
    Alert.alert(
      "Chave Pix Copiada",
      "Agora basta ir no app do seu banco favorito e fazer um pix em qualquer valor 😉"
    );
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Gostei deste app de pads da IF, da uma olhada ae: https://google.com.br",
      });
    } catch (error) {
      Alert.alert(
        "Erro ao compartilhar",
        "Houve um problema ao tentar compartilhar o conteudo"
      );
      console.error(error.message);
    }
  };

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
          style={{ padding: 20 }}
          source={require("../assets/images/banner.png")}
        >
          <Image
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
                keu={index}
                onPress={() => {
                  loadPreset(pad);
                  props.navigation.toggleDrawer();
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
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#CCC" }}>
        <TouchableOpacity onPress={handleShare} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text style={{ marginLeft: 10 }}>Compartilhe com amigos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePix} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="qrcode" size={22} color="black" />
            <Text style={{ marginLeft: 10 }}>Me pague um pastel 😉</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
