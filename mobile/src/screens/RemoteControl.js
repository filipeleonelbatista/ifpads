import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useState } from 'react';
import {
  ActivityIndicator, Alert, Dimensions,
  FlatList, Image, Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity, View
} from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { useAudioContext } from "../hooks/useAudioContext";
import api from '../services';
import { theme } from "../styles/theme";

const numColumns = 4;

export default function RemoteControl({ navigation }) {
  const { padColor, twitchUser, selectedRemoteControl, setSelectedRemoteControl, remoteControls, padTextColor, tema } = useAudioContext();

  const [selectedTab, setSelectedTab] = useState("commands")

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        sendCommand(item)
      }}
      style={[styles.button, { backgroundColor: padColor }]}
    >
      <Text style={{ color: padTextColor }}>{item}</Text>
    </TouchableOpacity>
  )

  const sendCommand = async (command) => {
    try {
      const serverStatusResponse = await api.get("/status")

      if (serverStatusResponse.data.status) {
        const response = await api.post("/audio", {
          twitchUser,
          command,
          channel: selectedRemoteControl.name
        })
      } else {
        Alert.alert(
          "Houve um erro",
          "Erro ao enviar dados para o servidor."
        );
      }
    } catch (err) {
      console.log(err)
      Alert.alert(
        "Houve um erro",
        "Erro ao conectar no servidor."
      );
    }
  }

  if (!remoteControls)
    return (
      <SafeAreaView style={{ ...styles.container, backgroundColor: theme[tema].background }}>
        <View style={styles.statusBar}>
          <ExpoStatusBar backgroundColor={theme[tema].background} style={tema === "white" ? "dark" : "light"} />
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size={32} color={theme[tema].color} />
        </View>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme[tema].background }}>
      <View style={styles.statusBar}>
        <ExpoStatusBar backgroundColor={theme[tema].background} style={tema === "white" ? "dark" : "light"} />
      </View>
      <View style={{ ...styles.rowSpaced, borderBottomColor: theme[tema].activity }}>
        <View style={styles.row}>
          <Text style={{ ...styles.headerTextValue, color: theme[tema].color }}>Controle Remoto</Text>
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
          <FontAwesome5 name="align-justify" size={24} color={theme[tema].color} />
        </TouchableOpacity>
      </View>
      <View style={{
        height: 64,
        paddingVertical: 8,
        alignItems: 'center'
      }}>

        <ScrollView horizontal contentContainerStyle={{
          height: 48,
          width: Dimensions.get("screen").width,
        }}>
          {
            remoteControls.map((rc, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedRemoteControl(rc)}
                style={[{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  marginHorizontal: 4,
                  alignItems: 'center',
                  justifyContent: "center",
                  backgroundColor: "#333"
                }, selectedRemoteControl.name === rc.name && { borderWidth: 3, borderColor: 'red' }]}
              >
                <Image
                  accessible={true}
                  accessibilityLabel={"logo"}
                  source={rc.image}
                  style={[
                    {
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                    }, selectedRemoteControl.image === rc.image && {
                      width: 40,
                      height: 40,
                      padding: 1,
                      borderRadius: 20,
                    }
                  ]}
                />
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>

      {
        selectedTab === 'commands' && (
          <>
            {
              selectedRemoteControl.commandList.commands.length > 0
                ? (
                  <FlatList
                    style={styles.gridContainer}
                    data={selectedRemoteControl.commandList.commands}
                    renderItem={renderItem}
                    numColumns={numColumns}
                  />
                ) : (
                  <View
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%" }}
                  >
                    <Text style={[styles.headerTextValue, { color: theme[tema].color, width: "100%", textAlign: 'center' }]}>Este controle não possui comandos ainda.</Text>
                  </View>
                )

            }
          </>
        )
      }

      {
        selectedTab === 'audios' && (
          <>
            {
              selectedRemoteControl.commandList.audios.length > 0
                ? (
                  <FlatList
                    style={styles.gridContainer}
                    data={selectedRemoteControl.commandList.audios}
                    renderItem={renderItem}
                    numColumns={numColumns}
                  />
                ) : (
                  <View
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%" }}
                  >
                    <Text style={[styles.headerTextValue, { color: theme[tema].color, width: "100%", textAlign: 'center' }]}>Este controle não possui audios ainda.</Text>
                  </View>
                )

            }
          </>
        )
      }

      <View style={{
        width: Dimensions.get("window").width,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: "#666",
        borderTopColor: theme[tema].activity
      }}>
        <TouchableOpacity
          onPress={() => setSelectedTab("commands")}
          style={[
            {
              width: "50%",
              height: 60,
              alignItems: "center",
              justifyContent: "center",
            }, selectedTab === "commands" && { backgroundColor: theme[tema].activity }
          ]}>
          <MaterialIcons name='settings-remote' size={24} color={theme[tema].color} />
          <Text style={{
            color: theme[tema].color
          }}>Comandos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedTab("audios")}
          style={[
            {
              width: "50%",
              height: 60,
              alignItems: "center",
              justifyContent: "center",
            }, selectedTab === "audios" && { backgroundColor: theme[tema].activity }
          ]}>
          <AntDesign name='sound' size={24} color={theme[tema].color} />
          <Text style={{
            color: theme[tema].color
          }}>Audios</Text>
        </TouchableOpacity>
      </View>
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
  },
  imageTitle: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  scrollPads: {
    width: Dimensions.get("window").width,
    height: 120,
    marginBottom: 12,
  },
  userpads: {
    height: 120,
    padding: 8,
    marginHorizontal: 2,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#666",
  },
  nametag: {
    color: "#F2f2f2",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 4,
  },
  gridContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 4,
    borderRadius: 8,
    height: Dimensions.get("window").width / numColumns,
  },
  buttonInvisible: {
    backgroundColor: "transparent",
  },
});
