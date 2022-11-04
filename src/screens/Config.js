import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
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

import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { useAudioContext } from "../hooks/useAudioContext";

import app from '../../app.json'
import { theme } from "../styles/theme";

const colors = [
  "#FFFFFF",
  "#000000",
  "#FF0000",
  "#FFFF00",
  "#00FFFF",
  "#0000FF",
]

export default function ConfigScreen({ navigation }) {
  const { padColor, showTiltButton, handleSetPadColor, handleChangeTiltState, padTextColor, handleSetPadTextColor, tema, handleChangeTema } = useAudioContext();

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
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme[tema].background }}>
      <View style={styles.statusBar}>
        <ExpoStatusBar backgroundColor={theme[tema].background} style={tema === "white" ? "dark" : "light"} />
      </View>
      <View style={{ ...styles.rowSpaced, borderBottomColor: theme[tema].activity }}>
        <View style={styles.row}>
          <Text style={{ ...styles.headerTextLabel, color: theme[tema].color }}>Configurações</Text>
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
          <FontAwesome name="navicon" size={22} color={theme[tema].color} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ width: "100%", paddingHorizontal: 16 }}>
        <View>
          <Text style={{ ...styles.title, color: theme[tema].color }}>Cor dos pads</Text>
          <ScrollView horizontal>
            {
              colors.map((color, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handleSetPadColor(color)}
                  style={[{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    marginVertical: 8,
                    marginHorizontal: 4,
                    alignItems: 'center',
                    justifyContent: "center",
                    backgroundColor: color,
                    borderWidth: 1, borderColor: "#000"
                  }, color === padColor && { borderWidth: 3, borderColor: "red" }]}
                />
              ))
            }

          </ScrollView>
        </View>
        <View>
          <Text style={{ ...styles.title, color: theme[tema].color }} >Cor do texto dos pads</Text>
          <ScrollView horizontal>
            {
              colors.map((color, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handleSetPadTextColor(color)}
                  style={[{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    marginVertical: 8,
                    marginHorizontal: 4,
                    alignItems: 'center',
                    justifyContent: "center",
                    backgroundColor: color,
                    borderWidth: 1, borderColor: "#000"
                  }, color === padTextColor && { borderWidth: 3, borderColor: "red" }]}
                />
              ))
            }
          </ScrollView>
        </View>


        <Button text="Editar seu pad" onPress={() => navigation.navigate("MyPadScreen")} />

        <TouchableOpacity
          accessible={true}
          accessibilityLabel={"Botão para habilitar ou desabilitar modo tilt no meu pad!"}
          accessibilityTraits={"button"}
          accessibilityComponentType={"button"}
          accessibilityViewIsModal={true}
          accessibilityElementsHidden={true}
          onPress={() => {
            handleChangeTiltState()
          }}
          style={{
            padding: 15,
            marginVertical: 8,
            borderRadius: 8,
            backgroundColor: theme[tema].color,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign color={theme[tema].background} name={"sound"} size={22} />
            <Text style={{ marginLeft: 10, color: theme[tema].background }}>{showTiltButton ? "Desabilitar Tilt" : "Habilitar Tilt"}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          accessible={true}
          accessibilityLabel={"Botão para mudar modo escuro claro!"}
          accessibilityTraits={"button"}
          accessibilityComponentType={"button"}
          accessibilityViewIsModal={true}
          accessibilityElementsHidden={true}
          onPress={() => {
            handleChangeTema(tema === 'dark' ? 'white' : 'dark')
          }}
          style={{
            padding: 15,
            marginVertical: 8,
            borderRadius: 8,
            backgroundColor: theme[tema].color,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons color={theme[tema].background} name={tema === 'white' ? "moon-outline" : "ios-sunny"} size={22} />
            <Text style={{ marginLeft: 10, color: theme[tema].background }}>{tema === 'white' ? "Modo padrão escuro" : "Modo Branco Opressor"}</Text>
          </View>
        </TouchableOpacity>

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
            backgroundColor: theme[tema].color,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons color={theme[tema].background} name="share-social-outline" size={22} />
            <Text style={{ marginLeft: 10, color: theme[tema].background }}>Compartilhe com amigos</Text>
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
            backgroundColor: theme[tema].color,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome color={theme[tema].background} name="qrcode" size={22} />
            <Text style={{ marginLeft: 10, color: theme[tema].background }}>Me pague um pastel 😉</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ width: "100%", textAlign: 'center', paddingVertical: 10, color: theme[tema].color, fontWeight: "bold" }}>Versão {app.expo.version}</Text>
      </ScrollView>


    </SafeAreaView >
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
  title: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
});
