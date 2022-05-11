import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { useAppContext } from '../contexts/AppContext';
import HMSMap, { MapTypes, Gravity } from '@hmscore/react-native-hms-map';

import { styles } from '../styles/styles';

const HuaweiMap = () => (
  <HMSMap
    style={styles.fullHeight}
    mapType={MapTypes.TERRAIN}
    camera={{
      target: {
        latitude: -33.9321,
        longitude: 18.8602,
      },
      zoom: 12,
    }}
    logoPosition={Gravity.BOTTOM | Gravity.START}
    logoPadding={{ paddingStart: 0, paddingTop: 0, paddingBottom: 0, paddingEnd: 0 }}
  />
);

const OtherMap = () => (
  <MapView
    style={styles.fullHeight}
    mapType={'hybrid'}
    region={{
      latitude: -33.9321,
      longitude: 18.8602,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }}
  />
);

const Map = () => {
  const { mobileService } = useAppContext();
  return <SafeAreaView>{mobileService === 'huawei' ? <HuaweiMap /> : <OtherMap />}</SafeAreaView>;
};

export default Map;
