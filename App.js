import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
import Drawer from './Drawer';

const App = () => {
  return (
    <NavigationContainer>
      <Drawer />
    </NavigationContainer>
  );
};

export default App;
