import 'react-native-gesture-handler';

import {AppRegistry, Alert} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {enableFreeze} from 'react-native-screens';
import {enableLatestRenderer} from 'react-native-maps';

import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';

const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert('Unexpected error occurred', `Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}`, [
      {
        text: 'Close',
      },
    ]);
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

setJSExceptionHandler(errorHandler, true);

setNativeExceptionHandler(errorString => {
  console.log('setNativeExceptionHandler', errorString);
});

enableFreeze(true);
void (async () => await enableLatestRenderer())();

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
