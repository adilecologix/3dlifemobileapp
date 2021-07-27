import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {isTokenAvailable} from './src/shared/utils';
import LoginNavigator from './src/routes/LoginNavigator';
// import ScanScreen from './src/screens/ScanScreen';
// import DrawerNavigator from './src/routes/MainNavigator';
import HomeNavigator from './src/routes/MainNavigator';

Icon.loadFont();

const App = () => {
  const [token, setToken] = useState(false);

  async function retrieveToken() {
    try {
      const result = await isTokenAvailable();
      setToken(result);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    retrieveToken();
  }, []);
  return (
    <NavigationContainer>
      {token ? <HomeNavigator /> : <LoginNavigator />}
    </NavigationContainer>
    // <ScanScreen />
  );
};
export default App;
