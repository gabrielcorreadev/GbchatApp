import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './src/views/home/home.component';
import { AppStackParamList } from "./src/types/navigation/app-stack-param-list";

const Stack = createStackNavigator<AppStackParamList>();

 function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Home" screenOptions={{
        cardOverlayEnabled: true,
         ...TransitionPresets.SlideFromRightIOS,
          }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;