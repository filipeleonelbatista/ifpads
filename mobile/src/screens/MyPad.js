import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Dimensions, Image, Platform,
  SafeAreaView,
  ScrollView, StatusBar,
  StyleSheet,
  Text, TouchableOpacity,
  View
} from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useAudioContext } from "../hooks/useAudioContext";
import Pads from '../sets/index';
import { theme } from "../styles/theme";

export default function MyPadScreen({ navigation }) {

  const isFocused = useIsFocused();

  const { setPads, loadPreset, tema, playSound } = useAudioContext();

  const [padName, setPadName] = useState('');
  const [soundList, setSoundList] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [myPadAccordeon, setMyPadAcordeon] = useState(true)
  const [padsAccordeon, setPadsAcordeon] = useState(true)
  
  function handleAddSoundToMyPad(sound) {
    setSoundList([...soundList, sound])
  }

  function handleRemoveSoundToMyPad(sound) {
    const filteredList = soundList.filter((item => item.title !== sound.title))
    setSoundList(filteredList)
  }

  async function handleOnSave() {
    const myPad = {
      userName: padName == "" ? "Meu pad" : padName,
      image: selectedImage == null ? require("../assets/images/user.png") : selectedImage,
      sounds: [...soundList]
    }
    await AsyncStorage.setItem('@my_pad', JSON.stringify(myPad))

    const padList = [
      myPad,
      ...Pads
    ]
    setPads(padList)
    loadPreset(padList[0])
    navigation.navigate("Home")
  }

  useEffect(() => {
    if (isFocused) {
      const getData = async () => {
        let value = await AsyncStorage.getItem('@my_pad')

        if (value != null) {
          value = JSON.parse(value)
          setPadName(value.userName == "" ? "Meu pad" : value.userName)
          setSoundList(value.sounds)
          setSelectedImage(value.image)
        } else {
          setPadName("Meu Pad")
          setSoundList([])
          setSelectedImage(require("../assets/images/user.png"))
        }
      }
      getData();
    }
  }, [isFocused])

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme[tema].background }}>
      <View style={styles.statusBar}>
        <ExpoStatusBar backgroundColor={theme[tema].background} style={tema === "white" ? "dark" : "light"} />
      </View>
      <View style={{ ...styles.rowSpaced, borderBottomColor: theme[tema].activity }}>
        <View style={styles.row}>
          <Text style={{ ...styles.headerTextLabel, color: theme[tema].color }}>Editar meu pad</Text>
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
        <Input
          label="Nome do Pad"
          value={padName}
          onChangeText={(text) => setPadName(text)}
        />

        <ScrollView horizontal>

          {Pads.map((pad, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(pad.image)}
                style={[{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  marginVertical: 8,
                  marginHorizontal: 4,
                  alignItems: 'center',
                  justifyContent: "center",
                  backgroundColor: "#333"
                }, selectedImage === pad.image && { borderWidth: 3, borderColor: 'red' }]}
              >
                <Image
                  accessible={true}
                  accessibilityLabel={pad.userName + " logo"}
                  source={pad.image}
                  style={[
                    {
                      width: 48,
                      height: 48,
                      borderRadius: 24,
                    },
                    selectedImage === pad.image && {
                      width: 40,
                      height: 40,
                      padding: 1,
                      borderRadius: 20,
                    }
                  ]}
                />
              </TouchableOpacity>
            )
          })}
        </ScrollView>


        <View>
          <View style={{
            width: "100%",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 8,
          }}>
            <Text
              style={{ color: theme[tema].color, fontWeight: 'bold', fontSize: 24, marginVertical: 8 }}
            >
              Meu Pad
            </Text>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel={"Botão para abrir o menu lateral de opções!"}
              accessibilityTraits={"button"}
              accessibilityComponentType={"button"}
              accessibilityViewIsModal={true}
              accessibilityElementsHidden={true}
              onPress={() => setMyPadAcordeon(!myPadAccordeon)}
              style={styles.imageTouchable}
            >
              <FontAwesome name={myPadAccordeon ? "chevron-up" : "chevron-down"} size={22} color={theme[tema].color} />
            </TouchableOpacity>
          </View>

          {myPadAccordeon && (
            <View>
              {
                soundList.length > 0 ? soundList.map((sound, sound_index) => (
                  <View
                    key={sound_index}
                    style={{
                      width: "100%",
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginVertical: 8,
                    }}>
                    <Text
                      style={{ color: theme[tema].color, fontWeight: 'bold', fontSize: 14 }}
                    >
                      {sound.title}
                    </Text>
                    <TouchableOpacity
                      accessible={true}
                      accessibilityLabel={
                        "Remover"
                      }
                      accessibilityTraits={"button"}
                      accessibilityComponentType={"button"}
                      accessibilityViewIsModal={true}
                      accessibilityElementsHidden={true}
                      onPress={() => handleRemoveSoundToMyPad(sound)}
                      style={{
                        padding: 15,
                        borderRadius: 8,
                        backgroundColor: "#FF0000",
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <FontAwesome name="trash" size={22} color={theme[tema].background} />
                      </View>
                    </TouchableOpacity>
                  </View>
                )) : (
                  <View style={{
                    width: "100%",
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text
                      style={{ color: theme[tema].color, fontWeight: 'bold', fontSize: 16, marginVertical: 2 }}
                    >
                      Sem sons no momento
                    </Text>
                  </View>
                )
              }
            </View>
          )}
        </View>

        <View>
          <View style={{
            width: "100%",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 8,
          }}>
            <Text
              style={{ color: theme[tema].color, fontWeight: 'bold', fontSize: 24, marginVertical: 8 }}
            >
              Pads
            </Text>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel={"Botão para abrir o menu lateral de opções!"}
              accessibilityTraits={"button"}
              accessibilityComponentType={"button"}
              accessibilityViewIsModal={true}
              accessibilityElementsHidden={true}
              onPress={() => setPadsAcordeon(!padsAccordeon)}
              style={styles.imageTouchable}
            >
              <FontAwesome name={padsAccordeon ? "chevron-up" : "chevron-down"} size={22} color={theme[tema].color} />
            </TouchableOpacity>
          </View>

          {padsAccordeon && (
            <>
              {Pads.map((pad, index) => {
                return (
                  <View key={index}>
                    {
                      pad.sounds.map((sound, sound_index) => (
                        <View key={sound_index} style={{
                          width: "100%",
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginVertical: 8,
                          backgroundColor: theme[tema].background_secondary,
                          padding: 8,
                          borderRadius: 8,
                        }}>
                          <View style={{
                            flexDirection: 'row'
                          }}>
                            <TouchableOpacity
                              accessible={true}
                              accessibilityLabel={
                                "Tocar"
                              }
                              accessibilityTraits={"button"}
                              accessibilityComponentType={"button"}
                              accessibilityViewIsModal={true}
                              accessibilityElementsHidden={true}
                              onPress={() => playSound(sound.source)}
                              style={{
                                width: 48,
                                height: 48,
                                borderRadius: 24,
                                backgroundColor: "#28a745",
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 8,
                              }}
                            >
                              <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <FontAwesome name="play" size={22} color={theme[tema].background} />
                              </View>
                            </TouchableOpacity>
                            <View>
                              <Text
                                style={{ color: theme[tema].color, fontWeight: 'bold', fontSize: 14 }}
                              >
                                {pad.userName}
                              </Text>
                              <Text
                                style={{ color: theme[tema].color, fontWeight: 'normal', fontSize: 16 }}
                              >
                                {sound.title}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            accessible={true}
                            accessibilityLabel={
                              "Adicionar"
                            }
                            accessibilityTraits={"button"}
                            accessibilityComponentType={"button"}
                            accessibilityViewIsModal={true}
                            accessibilityElementsHidden={true}
                            onPress={() => handleAddSoundToMyPad(sound)}
                            style={{
                              padding: 15,
                              borderRadius: 8,
                              backgroundColor: "#28a745",
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                              <FontAwesome name="plus" size={22} color={theme[tema].background} />
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))
                    }
                  </View>
                )
              })}
            </>
          )}
        </View>

        <Button text="Salvar" onPress={handleOnSave} />

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
