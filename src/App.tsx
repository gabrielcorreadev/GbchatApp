// App.tsx
import React from "react"
import { NativeBaseProvider, Box, extendTheme, StatusBar, StorageManager, ColorMode } from 'native-base';
import { AppNavigator } from "./AppNavigator"
import { theme } from "./themes/dafault.theme";
import { AuthProvider } from "./contexts/Auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from "react-moment";
import 'moment-timezone';

// Define the colorModeManager,
// here we are using react-native-async-storage (https://react-native-async-storage.github.io/async-storage/)
const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', (value) as any);
    } catch (e) {
      console.log(e);
    }
  },
};

Moment.globalLocal = true;
Moment.globalLocale = 'pt-br';

const App = () => {
  
  return (
    <NativeBaseProvider colorModeManager={colorModeManager} theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary[900]} />
      <AuthProvider>
      <AppNavigator />
      </AuthProvider>
    </NativeBaseProvider>
  )
}

export default App