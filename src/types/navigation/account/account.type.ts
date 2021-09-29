import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AccountStackParamList } from './account-stack-param-list';

export type LoginRouteProp = RouteProp<AccountStackParamList, 'Login'>;

export type LoginNavigationProp = StackNavigationProp<
AccountStackParamList,
  'Login'
>;