import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAudioContext } from "../hooks/useAudioContext";

const numColumns = 4;

export default function Home({ navigation }) {
  const { selectedPad, playSound, padColor, padTextColor } = useAudioContext();

  const renderItem = ({ item, index }) => {
    if (item.empty) {
      return <View styles={[styles.button, styles.buttonInvisible]}></View>;
    } else {
      return (
        <TouchableOpacity
          key={index}
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
      <SafeAreaView style={styles.container}>
        <View style={styles.statusBar}>
          <ExpoStatusBar backgroundColor="#000" style="light" />
        </View>
        <Text style={styles.headerTextValue}>Carregando... </Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <ExpoStatusBar backgroundColor="#000" style="light" />
      </View>
      <View style={styles.rowSpaced}>
        <View style={styles.row}>
          <Text style={styles.headerTextLabel}>Pad: </Text>
          <Text style={styles.headerTextValue}>{selectedPad.userName} </Text>
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
              <Text style={[styles.headerTextValue, {width: "100%", textAlign: 'center'}]}>Este pad não possui sons ainda.</Text>
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
