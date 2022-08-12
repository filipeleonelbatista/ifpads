import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useLayoutEffect, useState } from "react";
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

export default function MyPadScreen({ navigation }) {

  const { setPads, loadPreset } = useAudioContext();

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
      userName: padName,
      image: selectedImage,
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

  useLayoutEffect(() => {
    const getData = async () => {
      let value = await AsyncStorage.getItem('@my_pad')

      if (value != null) {
        value = JSON.parse(value)
        
        setPadName(value.userName)
        setSoundList(value.sounds)
        setSelectedImage(value.image)
      }
    }
    getData();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <ExpoStatusBar backgroundColor="#000" style="light" />
      </View>
      <View style={styles.rowSpaced}>
        <View style={styles.row}>
          <Text style={styles.headerTextLabel}>Editar meu pad</Text>
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
                }, selectedImage === pad.image && { borderWidth: 3, borderColor: '#FFFF00' }]}
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
              style={{ color: "#FFF", fontWeight: 'bold', fontSize: 24, marginVertical: 8 }}
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
              <FontAwesome name={myPadAccordeon ? "chevron-up" : "chevron-down"} size={22} color="white" />
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
                      style={{ color: "#FFF", fontWeight: 'bold', fontSize: 18 }}
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
                        <FontAwesome name="trash" size={22} color="white" />
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
                      style={{ color: "#FFF", fontWeight: 'bold', fontSize: 16, marginVertical: 2 }}
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
              style={{ color: "#FFF", fontWeight: 'bold', fontSize: 24, marginVertical: 8 }}
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
              <FontAwesome name={padsAccordeon ? "chevron-up" : "chevron-down"} size={22} color="white" />
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
                        }}>
                          <Text
                            style={{ color: "#FFF", fontWeight: 'bold', fontSize: 18 }}
                          >
                            {pad.userName}{"\n"}{sound.title}
                          </Text>
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
                              <FontAwesome name="plus" size={22} color="white" />
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
