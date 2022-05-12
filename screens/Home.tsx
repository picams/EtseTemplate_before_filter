import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { resetDatabase } from '../db/database';
import RNRestart from 'react-native-restart';
import Button from '../components/button';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import codePush from 'react-native-code-push';
import Crashes from 'appcenter-crashes';
import notifee from '@notifee/react-native';
import { readTracks, readTracksBatch } from '../data/parse';
import { useAppContext } from '../contexts/AppContext';
import RowCounts from './RowCounts';

const AccountScreen = () => {
  const [updateTitle, setUpdateTitle] = useState('Check for updates');
  const [busyLoadingTracks, setBusyLoadingTracks] = useState(false);
  const { navigate } = useNavigation();
  const { isConnected } = useNetInfo();
  const { mobileService } = useAppContext();

  const resetDatabaseHandler = async () => {
    await resetDatabase();
    RNRestart.Restart();
  };

  const throwJSExceptionHandler = () => {
    throw new Error('This is a JavaScript exception');
  };

  const generateCrashHandler = async () => {
    await Crashes.generateTestCrash();
  };

  const onDisplayNotification = async () => {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    const awaited = await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
      },
    });

    console.log('displayNotification', awaited);
  };

  const onButtonPress = () => {
    try {
      void codePush.sync(
        {
          updateDialog: {
            title: 'Update available',
          },
          installMode: codePush.InstallMode.IMMEDIATE,
        }, // options
        (status) => {
          console.log('codePush.SyncStatus', status);

          if (status === codePush.SyncStatus.UP_TO_DATE) {
            Alert.alert('No update available');
          }

          if (status === codePush.SyncStatus.UPDATE_INSTALLED) {
            Alert.alert('Update installed');
            setUpdateTitle('Check for updates');
          }
        }, // syncStatusChangedCallback
        ({ receivedBytes, totalBytes }) => {
          const percent = `${Math.ceil(receivedBytes / totalBytes) * 100}`;
          setUpdateTitle(`Downloading update ${percent}%`);
        }, // downloadProgressCallback
        () => console.warn('Outdated app.'), // HandleBinaryVersionMismatchCallback
      );
    } catch (error) {
      // crashlytics.recordError(error);
      // Alert.alert('Error', JSON.stringify(error));
      console.log(error);
    }
  };

  const onReadTracks = () => {
    setBusyLoadingTracks(true);
    void (async () => {
      await readTracks();
      setBusyLoadingTracks(false);
    })();
  };

  const onReadTracksBatch = () => {
    setBusyLoadingTracks(true);
    void (async () => {
      await readTracksBatch();
      setBusyLoadingTracks(false);
    })();
  };

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <Text style={styles.text}>Mobile Service: {mobileService}</Text>
      <Text style={styles.text}>Network Connection: {isConnected ? 'Online' : 'Offline'}</Text>
      <Button style={styles.actionButton} title="Camera" onPress={() => navigate('CameraScreen')} />
      <Button style={styles.actionButton} title="Throw!" onPress={throwJSExceptionHandler} />
      {/* <Button
        style={styles.actionButton}
        title="Crash!"
        onPress={generateCrashHandler}
      /> */}
      <Button style={styles.actionButton} title="Reset Local Database" onPress={resetDatabaseHandler} />
      <Button style={styles.actionButton} title={updateTitle} onPress={onButtonPress} />
      <Button style={styles.actionButton} title="Notification" onPress={onDisplayNotification} />
      <Button
        style={styles.actionButton}
        disabled={busyLoadingTracks}
        title="Tracks to Db ( One By One )"
        onPress={() => onReadTracks()}
      />
      <Button
        style={styles.actionButton}
        disabled={busyLoadingTracks}
        title="Tracks to Db ( In Batches )"
        onPress={() => onReadTracksBatch()}
      />
      <RowCounts />
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
