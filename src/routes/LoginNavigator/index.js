/* eslint-disable react-native/no-inline-styles */
import {DrawerActions} from '@react-navigation/routers';
import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import HomeScreen from '../../screens/HomeScreen';
import LoginScreen from '../../screens/LoginScreen';
import ScanScreen from '../../screens/ScanScreen';

const Stack = createStackNavigator();

const screenOptions = {
  headerTitle: '',
  headerBackTitleVisible: '',
  headerStyle: {
    backgroundColor: 'white',
  },
  headerTintColor: 'white',
};
function HeaderLeft({dispatch}) {
  return (
    <TouchableOpacity onPress={() => dispatch(DrawerActions.toggleDrawer())}>
      <Image
        style={{
          marginLeft: 20,
          height: 23,
          width: 23,
        }}
        source={require('../../../assets/menu.png')}
      />
    </TouchableOpacity>
  );
}
const LoginNavigator = () => {
  return (
    <Stack.Navigator
      mode={'modal'}
      screenOptions={screenOptions}
      initialRouteName={'Login'}>
      <Stack.Screen name={'Login'} component={LoginScreen} />
      <Stack.Screen name={'Scan'} component={ScanScreen} />
      <Stack.Screen
        name={'Home'}
        component={HomeScreen}
        options={({navigation: {dispatch}}) => ({
          headerLeft: () => <HeaderLeft dispatch={dispatch} />,
        })}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
