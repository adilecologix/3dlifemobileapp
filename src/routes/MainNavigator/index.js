/* eslint-disable react-native/no-inline-styles */
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import React, {useEffect, useState} from 'react';

import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {DrawerActions} from '@react-navigation/routers';

import HomeScreen from '../../screens/HomeScreen';
import ScanScreen from '../../screens/ScanScreen';
// import {logout} from '../../api/methods/auth';
import {deleteToken, getName} from '../../shared/utils';
import LoginScreen from '../../screens/LoginScreen';

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

const Drawer = createDrawerNavigator();

function DrawerNavigator({navigation}) {
  const [name, setName] = useState('');
  // const logoutHandle = async () => {
  //   try {
  //     console.log('Logout');
  //     const result = await logout();
  //     console.log('result----->', result);
  //     navigation.navigate('Login');
  //   } catch (err) {
  //     const {error} = err.response.data;
  //     console.log(error);
  //     console.log(err);
  //     Alert.alert('Try Again', 'Something went wrong');
  //   }
  // };

  useEffect(() => {
    username();
  }, []);
  const username = async () => {
    try {
      const result = await getName();
      setName(result);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      console.log('Logout');
      await deleteToken();
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: 'green',
      }}
      drawerContent={props => {
        const {state, ...rest} = props;
        const newState = {...state};
        newState.routes = newState.routes.filter(
          item => !['Home', 'Login'].includes(item.name),
        );
        return (
          <DrawerContentScrollView {...props}>
            {/* <View style={{backgroundColor: 'lightblue'}}> */}
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                marginVertical: '10%',
              }}>
              {name}
            </Text>
            {/* </View> */}
            <DrawerItemList state={newState} {...rest} />
            <DrawerItem
              label="Logout"
              onPress={() => {
                Alert.alert(
                  'logout',
                  'Are You Sure?',
                  [
                    {
                      text: 'No',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Yes',
                      onPress: logout,
                    },
                  ],
                  {cancelable: false},
                );
              }}
            />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen
        name="Scan"
        component={ScanScreen}
        options={{headerShow: false}}
      />
      {/* <Drawer.Screen
        name="Scan"
        component={ScanScreen}
        options={{headerShow: false}}
      /> */}
      <Drawer.Screen name={'Login'} component={LoginScreen} />
    </Drawer.Navigator>
  );
}

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={'Home'}>
      <Stack.Screen
        name={'Home'}
        component={DrawerNavigator}
        options={({navigation: {dispatch}}) => ({
          headerLeft: () => <HeaderLeft dispatch={dispatch} />,
        })}
      />
    </Stack.Navigator>
  );
};
export default HomeNavigator;
