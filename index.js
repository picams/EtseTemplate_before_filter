import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import {enableFreeze} from 'react-native-screens';

enableFreeze(true);

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
