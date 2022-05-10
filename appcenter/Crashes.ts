import Crashes, { UserConfirmation } from 'appcenter-crashes';
import { Alert } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import AttachmentsProvider from './AttachmentsProvider';

void Crashes.setListener({
  shouldProcess(report) {
    console.log(`Should process report with id: ${report.id}'`);
    return true;
  },

  shouldAwaitUserConfirmation() {
    console.log('Should await user confirmation');
    Alert.alert('One or more crashes were detected, do you want to report them?', undefined, [
      {
        text: 'Yes, and ask me again if it occurs again.',
        onPress: () => Crashes.notifyUserConfirmation(UserConfirmation.SEND),
      },
      { text: 'Yes, always send them', onPress: () => Crashes.notifyUserConfirmation(UserConfirmation.ALWAYS_SEND) },
      { text: "Don't send at this time", onPress: () => Crashes.notifyUserConfirmation(UserConfirmation.DONT_SEND) },
    ]);
    return true;
  },

  getErrorAttachments(report) {
    console.log(`Get error attachments for report with id: ${report.id}'`);
    return AttachmentsProvider.getErrorAttachments();
  },

  onBeforeSending() {
    console.log('Will send crash. onBeforeSending is invoked.');
    SimpleToast.show('Sending crashes...');
  },

  onSendingSucceeded() {
    console.log('Did send crash. onSendingSucceeded is invoked.');
    SimpleToast.show('Sending crashes succeeded.');
  },

  onSendingFailed() {
    console.log('Failed sending crash. onSendingFailed is invoked.');
    SimpleToast.show('Sending crashes failed, please check verbose logs.');
  },
});
