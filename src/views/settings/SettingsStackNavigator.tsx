import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsStackParamList } from "../../types/navigation/settings/settings-stack-param-list";
import { screenOptionHeader } from "../../RootStack";
import { Settings } from "./Settings";
import DarkMode from "./dark-mode/DarkMode";
import ConnectedDevices from "./connected-devices/ConnectedDevices";

const Stack = createStackNavigator<SettingsStackParamList>();

 export function SettingsStackNavigator() {
  return (
      <Stack.Navigator screenOptions={screenOptionHeader()}>
        <Stack.Screen name="SettingsList" component={Settings} options={{ title: 'Configurações' }} />
        <Stack.Screen name="DarkMode" component={DarkMode} options={{ title: 'Modo escuro' }} />
        <Stack.Screen name="ArchivedChat" component={Settings} options={{ title: 'Conversas arquivadas' }} />
        <Stack.Screen name="Notifications" component={Settings} options={{ title: 'Notificações' }} />
        <Stack.Screen name="BlockedUsers" component={Settings} options={{ title: 'Bloqueados' }} />
        <Stack.Screen name="ConnectedDevices" component={ConnectedDevices} options={{ title: 'Dispositivos conectados' }} />
        <Stack.Screen name="Help" component={Settings} options={{ title: 'Ajuda' }} />
      </Stack.Navigator>
  );
}