import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import { AccountStackParamList } from "../../types/navigation/account/account-stack-param-list";
import Signup from "./Signup";
import Account from "./Account";

const Stack = createStackNavigator<AccountStackParamList>();

 export function AccountStackNavigator() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
  );
}