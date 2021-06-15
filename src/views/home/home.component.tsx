import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ChatListScreen } from './tabs/chat-list/chat-list.component';

function ContactsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Contatos!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Configurações!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function HomeTab() {
  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: '#000' }}>
      <Tab.Screen name="Home" component={ChatListScreen}
        options={{
          tabBarLabel: 'Inicío',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <MaterialCommunityIcons name={focused ? 'chat' : 'chat-outline'} size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen name="contacts" component={ContactsScreen}
        options={{
          tabBarLabel: 'Contatos',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <MaterialCommunityIcons name={focused ? 'account-multiple' : 'account-multiple-outline'} size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen}
        options={{
          tabBarLabel: 'Configurações',
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <MaterialCommunityIcons name={focused ? 'cog' : 'cog-outline'} size={size} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}