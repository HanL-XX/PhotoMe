/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/tabs/HomeScreen';
import NotificationScreen from './src/screens/tabs/NotificationScreen';

AppRegistry.registerComponent(appName, () => App);
