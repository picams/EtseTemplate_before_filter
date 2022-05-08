import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import Maps from './screens/Maps';

const Home = () => <Text>Home</Text>;
const Notifications = () => <Text>Notifications</Text>;
const Profile = () => <Text>Profile</Text>;
const Settings = () => <Text>Settings</Text>;

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Maps"
        component={Maps}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Drawer"
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
        name="Drawer2"
        component={StackNavigator}
        options={{
          title: 'Home2',
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
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;
