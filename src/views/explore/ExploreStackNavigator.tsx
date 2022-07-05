import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { ExploreStackParamList } from "../../types/navigation/explore/explore-stack-param-list";

import { screenOptionHeader } from "../../RootStack";
import { Profile } from "../user/Profile";
import PeopleNearby from "./people-nearby/PeopleNearby";

const Stack = createStackNavigator<ExploreStackParamList>();


 export function ExploreStackNavigator() {
  return (
      <Stack.Navigator screenOptions={screenOptionHeader()}>
        <Stack.Screen name="PeopleNearby" component={PeopleNearby} options={{ title: 'Pessoas Perto' }} />
        <Stack.Screen name="Profile" component={Profile}  options={{ title: 'Perfil' }} />
      </Stack.Navigator>
  );
}