import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  Alert,
  Dimensions, Platform,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text, TouchableOpacity,
  View
} from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import * as Clipboard from "expo-clipboard";
import { useAudioContext } from "../hooks/useAudioContext";
import { useState } from "react";

export default function ConfigScreen({ navigation }) {
  const { padColor, handleSetPadColor, padTextColor, handleSetPadTextColor } = useAudioContext();

  const [currentPadColor, setCurrentPadColor] = useState(padColor);
  const [currentPadTextColor, setCurrentPadTextColor] = useState(padTextColor);

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
          "Gostei deste app de pads da IF, da uma olhada ae: https://play.google.com/store/apps/details?id=com.instinctfamily.ifpads",
      });
    } catch (error) {
      Alert.alert(
        "Erro ao compartilhar",
        "Houve um problema ao tentar compartilhar o conteudo"
      );
      console.error(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <ExpoStatusBar backgroundColor="#000" style="light" />
      </View>
      <View style={styles.rowSpaced}>
        <View style={styles.row}>
          <Text style={styles.headerTextLabel}>Configurações</Text>
        </View>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel={"Botão para abrir o menu lateral de opções!"}
          accessibilityTraits={"button"}
          accessibilityComponentType={"button"}
          accessibilityViewIsModal={true}
          accessibilityElementsHidden={true}
          onPress={() => navigation.toggleDrawer()}
          style={styles.imageTouchable}
        >
          <FontAwesome name="navicon" size={22} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ width: "100%", paddingHorizontal: 16 }}>
        <Input
          label="Cor dos pads"
          tip="Use o formato hexadecimal #FFFFFF"
          maxLength={7}
          value={currentPadColor}
          onChangeText={(text) => { setCurrentPadColor(text); handleSetPadColor(text) }}
          placeholder={"#FFFFFF"}
        />
        <Input
          label="Cor dos textos no pads"
          tip="Use o formato hexadecimal #FFFFFF"
          maxLength={7}
          value={currentPadTextColor}
          onChangeText={(text) => { setCurrentPadTextColor(text); handleSetPadTextColor(text) }}
          placeholder={"#FFFFFF"}
        />
        <Button text="Editar seu pad" onPress={() => navigation.navigate("MyPadScreen")} />

        <TouchableOpacity
          accessible={true}
          accessibilityLabel={"Botão para compartilhar com os amigos o app!"}
          accessibilityTraits={"button"}
          accessibilityComponentType={"button"}
          accessibilityViewIsModal={true}
          accessibilityElementsHidden={true}
          onPress={handleShare}
          style={{
            padding: 15,
            marginVertical: 8,
            borderRadius: 8,
            backgroundColor: "#FFF"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text style={{ marginLeft: 10 }}>Compartilhe com amigos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel={
            "Botão para copiar a chave pix para fazer uma doação!"
          }
          accessibilityTraits={"button"}
          accessibilityComponentType={"button"}
          accessibilityViewIsModal={true}
          accessibilityElementsHidden={true}
          onPress={handlePix}
          style={{
            padding: 15,
            marginVertical: 8,
            borderRadius: 8,
            backgroundColor: "#FFF"
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="qrcode" size={22} color="black" />
            <Text style={{ marginLeft: 10 }}>Me pague um pastel 😉</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ width: "100%", textAlign: 'center', paddingVertical: 10, color: "#FFF", fontWeight: "bold" }}>Versão 1.2</Text>
      </ScrollView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    marginBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
    backgroundColor: "#181818",
  },
  rowSpaced: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTextLabel: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 24,
  },
  headerTextValue: {
    color: "#FFF",
    fontWeight: "normal",
    fontSize: 24,
  },
  imageTouchable: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    borderRadius: 24,
  },
});
