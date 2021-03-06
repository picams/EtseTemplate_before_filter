import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import codePush from 'react-native-code-push';

const CodePush: React.FC = () => {
  const checkStatus = (status: any): void => {
    try {
      switch (status) {
        case codePush.SyncStatus.UPDATE_INSTALLED: // 1
        case codePush.SyncStatus.SYNC_IN_PROGRESS: // 4
        case codePush.SyncStatus.AWAITING_USER_ACTION: // 6
        case codePush.SyncStatus.DOWNLOADING_PACKAGE: // 7
        case codePush.SyncStatus.INSTALLING_UPDATE: // 8
          console.log('codePush.SyncStatus', status);
          break;
        case codePush.SyncStatus.CHECKING_FOR_UPDATE: // 5
        case codePush.SyncStatus.UPDATE_IGNORED: // 2
        case codePush.SyncStatus.UNKNOWN_ERROR: // 3
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      // Alert.alert('Error', JSON.stringify(error));
      // crashlytics.recordError(error);
    }
  };

  const syncCodeFromCodePush = () => {
    try {
      void codePush.sync(
        {
          updateDialog: {
            title: 'Update available',
          },
          installMode: codePush.InstallMode.IMMEDIATE,
        }, // options
        (status) => checkStatus(status), // syncStatusChangedCallback
        ({ receivedBytes, totalBytes }) => {
          const percent = `${(receivedBytes / totalBytes) * 100}%`;
          console.log('LOG: : percent', percent);
        }, // downloadProgressCallback
        () => console.warn('Outdated app.'), // HandleBinaryVersionMismatchCallback
      );
    } catch (error) {
      // crashlytics.recordError(error);
      // Alert.alert('Error', JSON.stringify(error));
      console.log(error);
    }
  };
  useEffect(() => {
    syncCodeFromCodePush();
  });

  return <></>;
};

export default CodePush;
