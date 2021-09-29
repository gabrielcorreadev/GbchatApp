import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from "./types/navigation/home/home-stack-param-list";
import Home from "./views/home/HomeTabs";
import { theme } from "./themes/dafault.theme";
import { useColorModeValue } from "native-base";

const RootStack = createStackNavigator<HomeStackParamList>();

 export function RootStackNavigator() {
  return (
      <RootStack.Navigator screenOptions={{headerShown:false}}>
        <RootStack.Screen name="Home" component={Home} />
      </RootStack.Navigator>
  );
}

export function screenOptionHeader():any {
  return {
    headerStyle: {
      backgroundColor: useColorModeValue('white', 'black'),
    },
    headerTintColor: useColorModeValue('black', 'white'),
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
}
