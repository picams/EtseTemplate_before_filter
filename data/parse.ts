/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Q } from '@nozbe/watermelondb';
import { Alert } from 'react-native';
import { database } from '../db/database';
import { Track } from '../db/models';
import t1 from './trail1.json';

export const readT1 = async () => {
  const exists = await database.get<Track>('tracks').query(Q.where('tracker', t1.tracker)).fetchCount();

  let track: Track | undefined;

  if (exists === 0) {
    await database.write(async () => {
      track = await database.get<Track>('tracks').create((item) => {
        item.tracker = t1.tracker;
        item.startTime = new Date(t1.startTime).getTime();
        item.endTime = new Date(t1.endTime).getTime();
        item.points = t1.points;
      });
    });

    if (track) {
      for (const coordinate of t1.path.coordinates) {
        await track.addCoordinate(coordinate[0], coordinate[1]);
      }
    }
  } else {
    Alert.alert('Track already exists');
  }
};
