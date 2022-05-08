import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import {resetDatabase} from '../db/database';
import RNRestart from 'react-native-restart';
import Button from '../components/button';
import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';

const AccountScreen = () => {
  const {navigate} = useNavigation();
  const {isConnected} = useNetInfo();

  const resetDatabaseHandler = async () => {
    await resetDatabase();
    RNRestart.Restart();
  };

  const throwJSExceptionHandler = () => {
    throw new Error('This is a JavaScript exception');
  };

  return (
    <ScrollView
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic">
      <Text style={styles.text}>{isConnected ? 'Online' : 'Offline'}</Text>
      <Button
        style={styles.actionButton}
        title="Camera"
        onPress={() => navigate('CameraScreen')}
      />
      <Button
        style={styles.actionButton}
        title="Throw!"
        onPress={throwJSExceptionHandler}
      />
      <Button
        style={styles.actionButton}
        title="Reset Local Data"
        onPress={resetDatabaseHandler}
      />
    </ScrollView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    marginBottom: 10,
  },
  actionButton: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    minHeight: 50,
    backgroundColor: '#aaa',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
