import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import { Audio } from "expo-av";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Pads } from "./src";

const adUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-7791002101264737/3172383623";

const numColumns = 4;

export default function App() {
  const [sound, setSound] = useState();
  const [data, setData] = useState();

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
          style={styles.button}
        >
          <Text>{item.title}</Text>
        </TouchableOpacity>
      );
    }
  };

  async function playSound(source) {
    if (!source) return;
    const { sound } = await Audio.Sound.createAsync(source);
    setSound(sound);
    await sound.playAsync();
  }

  const loadPreset = (userPreset) => {
    setData(userPreset.sounds);
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    loadPreset(Pads[0]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <ExpoStatusBar backgroundColor="#000" style="light" />
      </View>
      <Image
        source={require("./src/assets/logo.png")}
        style={styles.imageTitle}
      />

      <View style={styles.scrollPads}>
        <ScrollView horizontal>
          {Pads.map((userPad, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  loadPreset(Pads[index]);
                }}
                style={styles.userpads}
              >
                <Image source={userPad.image} style={styles.image} />
                <Text style={styles.nametag}>{userPad.userName}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        style={styles.gridContainer}
        data={data}
        renderItem={renderItem}
        numColumns={numColumns}
      />
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
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
  imageTitle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginVertical: 12,
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
    backgroundColor: "red",
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
