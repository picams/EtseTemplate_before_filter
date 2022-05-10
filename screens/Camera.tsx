import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { CameraRuntimeError, useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useIsForeground } from '../hooks/useIsForeground';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SCREEN_HEIGHT } from '../Constants';
import RNFS from 'react-native-fs';
import { database } from '../db/database';
import { Photo } from '../db/models';
import { useNavigation } from '@react-navigation/native';
import Analytics from 'appcenter-analytics';

const BUTTON_SIZE = 80;

const CameraScreen = () => {
  const { navigate, goBack } = useNavigation();
  const [isCameraInitialized, setIsCameraInitialized] = React.useState(false);
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef<Camera>(null);

  const isFocused = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocused && isForeground;

  useEffect(() => {
    void (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const takePicture = async () => {
    const photo = await camera.current?.takePhoto({
      skipMetadata: true,
      flash: 'off',
    });

    void (async (uri: string) => {
      const data = await RNFS.readFile(uri, 'base64');

      await database.write(async () => {
        await database.get<Photo>('photos').create((item) => {
          item.photo = data;
        });
      });
    })(photo!.path);

    goBack();
    await Analytics.trackEvent('takePicture');
  };

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);
  const onInitialized = useCallback(() => {
    console.log('Camera initialized!');
    setIsCameraInitialized(true);
  }, []);

  return (
    <>
      {device != null && hasPermission && (
        <SafeAreaView style={styles.container}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            onError={onError}
            onInitialized={onInitialized}
            photo={isActive}
          />
          <TouchableOpacity activeOpacity={0.5} style={styles.buttonAlignment} onPress={takePicture}>
            <Ionicons name="camera-outline" color="#fff" size={50} />
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonAlignment: {
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT - BUTTON_SIZE - 100,
  },
});
