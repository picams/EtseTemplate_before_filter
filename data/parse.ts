/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Q } from '@nozbe/watermelondb';
import { Alert } from 'react-native';
import { database } from '../db/database';
import { Coordinate, Track } from '../db/models';
import t1 from './trail1.json';
import t2 from './trail2.json';
import t3 from './trail3.json';
import t4 from './trail4.json';
import t5 from './trail5.json';

export const readTracks = async () => {
  await readFile(t1);
  await readFile(t2);
  await readFile(t3);
  await readFile(t4);
  await readFile(t5);
};

export const readTracksBatch = async () => {
  // for (let index = 0; index < 1; index++) {
  await readFileInBatch(t1);
  await readFileInBatch(t2);
  await readFileInBatch(t3);
  await readFileInBatch(t4);
  await readFileInBatch(t5);
  // }
};

export const readFileInBatch = async (file) => {
  let track: Track | null = null;

  await database.write(async () => {
    track = await database.get<Track>('tracks').create((item) => {
      item.tracker = file.tracker;
      item.startTime = new Date(file.startTime).getTime();
      item.endTime = new Date(file.endTime).getTime();
      item.points = file.points;
    });

    if (track) {
      const records: Coordinate[] = [];
      for (const coordinate of file.path.coordinates) {
        const record = database.collections.get<Coordinate>('coordinates').prepareCreate((item) => {
          item.latitude = coordinate[0];
          item.longitude = coordinate[1];
          item.track.set(track);
        });
        records.push(record);
      }
      await database.batch(...records);
    }
  });
};

export const readFile = async (file) => {
  let track: Track | undefined;

  await database.write(async () => {
    track = await database.get<Track>('tracks').create((item) => {
      item.tracker = file.tracker;
      item.startTime = new Date(file.startTime).getTime();
      item.endTime = new Date(file.endTime).getTime();
      item.points = file.points;
    });
  });

  if (track) {
    for (const coordinate of file.path.coordinates) {
      await track.addCoordinate(coordinate[0], coordinate[1]);
    }
  }
};

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
