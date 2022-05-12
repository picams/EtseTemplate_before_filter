import React from 'react';
import { Database, Q } from '@nozbe/watermelondb';
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import { Track, Coordinate } from '../db/models';
import { Text } from 'react-native';

const RowCounts = ({ trackCount, coordinateCount }) => (
  <Text>
    {trackCount} / {coordinateCount}
  </Text>
);

const enhance = withObservables([], ({ database }: { database: Database }) => {
  return {
    trackCount: database.get<Track>('tracks').query().observeCount(false),
    coordinateCount: database.get<Coordinate>('coordinates').query().observeCount(true),
  };
});

export default withDatabase(enhance(RowCounts));
