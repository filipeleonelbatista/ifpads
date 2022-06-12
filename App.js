import "react-native-gesture-handler";
import Home from "./src/screens/Home";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerComponent from "./src/components/CustomDrawerComponent";
import { AudioContextProvider } from "./src/context/AudioContext";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <AudioContextProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerComponent {...props} />}
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AudioContextProvider>
  );
}
