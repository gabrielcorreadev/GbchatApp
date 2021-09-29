import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import { AccountStackParamList } from "../../types/navigation/account/account-stack-param-list";

const Stack = createStackNavigator<AccountStackParamList>();

 export function AccountStackNavigator() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
  );
}