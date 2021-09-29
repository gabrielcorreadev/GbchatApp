import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { ChatStackParamList } from "../../types/navigation/chat/chat-stack-param-list";
import { screenOptionHeader } from "../../RootStack";
import  Chat  from "./Chat";

const Stack = createStackNavigator<ChatStackParamList>();

 export function ChatStackNavigator() {
  return (
      <Stack.Navigator screenOptions={screenOptionHeader()}>
        <Stack.Screen name="Chat" component={Chat} options={{ title: 'Conversas' }} />
      </Stack.Navigator>
  );
}