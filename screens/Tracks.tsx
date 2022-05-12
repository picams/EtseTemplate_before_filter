import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Database, Q } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import { Track, Coordinate } from '../db/models';
import { Row } from '../components/Row';
import { ScrollView } from 'react-native-gesture-handler';

const Tracks = ({ tracks }: { tracks: Track[] }) => {
  return (
    <ScrollView>
      {tracks.length > 0 ? (
        tracks.map((item, index) => {
          return (
            <Row
              key={index}
              title={item.tracker}
              subtitle={item.startTime.toDateString()}
              onPress={() => Alert.alert(item.tracker.toString())}
            />
          );
        })
      ) : (
        <Text>Empty</Text>
      )}
    </ScrollView>
  );
};

const enhance = withObservables([], ({ database }: { database: Database }) => {
  return {
    tracks: database.get<Track>('tracks').query(Q.sortBy('created_at', 'desc')).observe(),
  };
});

export default withDatabase(enhance(Tracks));
