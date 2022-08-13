import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';

export default function Onboarding({ navigation }) {

  const isFocused = useIsFocused();

  const slides = [
    {
      id: 1,
      image: require('../assets/images/onboarding/1.png'),
      title: "Novos audios!",
      subtitle: "Agradecimento especial o Colono gamer e a comunidade pelos audios novos.",
    },
    {
      id: 2,
      image: require('../assets/images/onboarding/2.png'),
      title: "Selecione cores dos pads",
      subtitle: "Agora temos como selecionar as cores dos botões, só arrastar o menu lateral e tocar em configurações.",
    },
    {
      id: 3,
      image: require('../assets/images/onboarding/3.png'),
      title: "Crie seu pad",
      subtitle: "Crie seu pad com combos de audios para se divertir!",
    },
  ]

  const [pageSelected, setPageSelected] = useState(1);

  const [isOnboardingPassed, setIsOnboardingPassed] = useState("waiting")

  async function handleLeaveOnboarding() {
    try {
      await AsyncStorage.setItem('@onboarding', 'true');
      navigation.navigate('Home')
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (isFocused) {
      const executeAsync = async () => {
        try {
          const value = await AsyncStorage.getItem('@onboarding')
          if (value !== null) {
            if (JSON.parse(value)) {
              navigation.navigate('Home');
            }
          } else {
            setIsOnboardingPassed("no-passed")
          }
        } catch (e) {
          console.error(e)
        }
      }
      executeAsync();
    }
  }, [isFocused])


  if (isOnboardingPassed === "waiting") return <Text>Carregando ...</Text>

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#181818",
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    }}>
      <FlatList
        pagingEnabled
        onMomentumScrollEnd={(e) => {
          let contentOffset = e.nativeEvent.contentOffset;
          let viewSize = e.nativeEvent.layoutMeasurement;

          let pageNum = Math.floor(contentOffset.x / viewSize.width);
          setPageSelected(pageNum + 1);
        }}
        data={slides}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        renderItem={
          ({ item, index }) => (
            <View key={index} style={{ alignItems: "center", width: Dimensions.get('window').width }}>
              <Image source={item.image} style={{ height: 250, width: 250, resizeMode: 'contain' }} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          )
        }
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        {slides.map((_, slidesIndex) => {
          return (
            <View key={slidesIndex} style={[styles.indicator, slidesIndex + 1 === pageSelected && { backgroundColor: "#fff", width: 25 }]} />
          )
        })}
      </View>

      {
        slides.length === pageSelected ? (
          <Button
            onPress={handleLeaveOnboarding}
            text="Começar"
          />
        ) : (<View style={{ backgroundColor: 'transparent', paddingHorizontal: 20, paddingVertical: 8, marginVertical: 24, borderRadius: 8 }} />)
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center"
  },
  subtitle: {
    color: "#FFF",
    fontSize: 13,
    marginTop: 10,
    maxWidth: '70%',
    textAlign: "center",
    lineHeight: 23
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'gray',
    marginHorizontal: 3,
    borderRadius: 2
  }
});