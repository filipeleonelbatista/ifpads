import "react-native-gesture-handler";
import Home from "./src/screens/Home";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerComponent from "./src/components/CustomDrawerComponent";
import { AudioContextProvider } from "./src/context/AudioContext";
import ConfigScreen from "./src/screens/Config";
import MyPadScreen from "./src/screens/MyPad";
import Onboarding from "./src/screens/Onboarding";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <AudioContextProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerComponent {...props} />}
          initialRouteName="Onboarding"
          screenOptions={{ headerShown: false }}
        >
          <Drawer.Screen name="Onboarding" component={Onboarding} />
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="ConfigScreen" component={ConfigScreen} />
          <Drawer.Screen name="MyPadScreen" component={MyPadScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AudioContextProvider>
  );
}
