import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from './app-stack-param-list';

export type HomeScreenRouteProp = RouteProp<AppStackParamList, 'Home'>;

export type HomeScreenNavigationProp = StackNavigationProp<
AppStackParamList,
  'Home'
>;