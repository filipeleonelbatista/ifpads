import { Asset } from 'expo-asset';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  Alert,
  Dimensions,
  FlatList,
  Image, Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity, View
} from "react-native";
import { useAudioContext } from "../hooks/useAudioContext";
import { theme } from "../styles/theme";

const numColumns = 4;

export default function Home({ navigation }) {
  const { selectedPad, isMyPad, showTiltButton, playRandomAudio, playSound, padColor, padTextColor, tema } = useAudioContext();

  const saveAudio = async (audio) => {

    const audioFileAssetObject = await Asset.loadAsync(audio.source);

    let perm = await MediaLibrary.getPermissionsAsync();

    if (perm.status != 'granted') {
      let perm = await MediaLibrary.requestPermissionsAsync();
      if (perm.status != 'granted') {
        Alert.alert(
          "Audio não foi salvo",
          "Precisa liberar as permissões de acesso aos arquivos",
        )
        return;
      }
    }

    try {

      const asset = await MediaLibrary.createAssetAsync(audioFileAssetObject[0].localUri);
      // const album = await MediaLibrary.getAlbumAsync('IFPads');

      // if (album == null) {
      //   await MediaLibrary.createAlbumAsync('IFPads', asset, false);
      // } else {
      //   await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      // }

      Alert.alert(
        "Audio salvo",
        "O audio foi salvo em " + asset.uri.replace("file://", "").replace(asset.filename, ""),
      )
    } catch (e) {
      Alert.alert(
        "Erro",
        "Houve um problema ao salvar, verifique as permissões do app.",
      )
    }
  }

  const renderItem = ({ item, index }) => {
    if (item.empty) {
      return <View styles={[styles.button, styles.buttonInvisible]}></View>;
    } else {
      return (
        <TouchableOpacity
          key={index}
          onLongPress={() => {
            Alert.alert(
              "Deseja baixar este audio?",
              "O audio será salvo na sua memoria do celular",
              [
                {
                  text: "Sim",
                  onPress: () => saveAudio(item),
                },
                { text: "Não", onPress: () => console.log("Não Pressed") }
              ]
            )
          }}
          onPress={() => {
            playSound(item.source);
          }}
          style={[styles.button, { backgroundColor: padColor }]}
        >
          <Text style={{ color: padTextColor }}>{item.title}</Text>
        </TouchableOpacity>
      );
    }
  };


  if (!selectedPad)
    return (
      <SafeAreaView style={{ ...styles.container, backgroundColor: theme[tema].background }}>
        <View style={styles.statusBar}>
          <ExpoStatusBar backgroundColor={theme[tema].background} style={tema === "white" ? "dark" : "light"} />
        </View>
        <Text style={{ ...styles.headerTextValue, color: theme[tema].color }}>Carregando... </Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme[tema].background }}>
      <View style={styles.statusBar}>
        <ExpoStatusBar backgroundColor={theme[tema].background} style={tema === "white" ? "dark" : "light"} />
      </View>
      <View style={{ ...styles.rowSpaced, borderBottomColor: theme[tema].activity }}>
        <View style={styles.row}>
          <Text style={{ ...styles.headerTextLabel, color: theme[tema].color }}>Pad: </Text>
          <Text style={{ ...styles.headerTextValue, color: theme[tema].color }}>{selectedPad.userName} </Text>
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
          <Image
            accessible={true}
            accessibilityLabel={selectedPad.userName + " logo"}
            source={selectedPad.image}
            style={styles.imageTitle}
          />
        </TouchableOpacity>
      </View>
      {
        (isMyPad && showTiltButton) && (
          <View
            style={{
              width: Dimensions.get("screen").width,
              height: 100,
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              onPress={() => {
                playRandomAudio()
              }}
              style={{
                ...styles.button,
                backgroundColor: padColor,
                width: Dimensions.get("screen").width - 20,
              }}
            >
              <Text style={{ color: padTextColor }}>TILT!</Text>
            </TouchableOpacity>
          </View>
        )
      }
      {
        selectedPad.sounds.length > 0
          ? (
            <FlatList
              style={styles.gridContainer}
              data={selectedPad.sounds}
              renderItem={renderItem}
              numColumns={numColumns}
            />
          ) : (
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: "100%" }}
            >
              <Text style={[styles.headerTextValue, { color: theme[tema].color, width: "100%", textAlign: 'center' }]}>Este pad não possui sons ainda.</Text>
            </View>
          )

      }
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
