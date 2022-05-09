import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import CodePushVerification from './appcenter/CodePush';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {database} from './db/database';
import Map from './screens/Map';
import Camera from './screens/Camera';
import Gallery from './screens/Gallery';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="MapScreen" component={Map} />
      <Stack.Screen name="CameraScreen" component={Camera} />
      <Stack.Screen name="GalleryScreen" component={Gallery} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={StackNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="md-home"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Map"
        component={Map}
        options={{
          title: 'Map',
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="md-home"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Gallery"
        component={Gallery}
        options={{
          title: 'Gallery',
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="md-home"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <>
      <CodePushVerification />
      <DatabaseProvider database={database}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </DatabaseProvider>
    </>
  );
};

export default App;
