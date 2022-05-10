import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schema from './schema';
// import migrations from './migrations';
import { Coordinate, Photo, Track } from './models';
import { Alert } from 'react-native';

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // migrations,
  dbName: 'etsetemplate',
  jsi: false,
  onSetUpError: (error) => {
    console.log(error);
    Alert.alert('error in database setup');
  },
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [Photo, Track, Coordinate],
});

const resetDatabase = async () => {
  await database.write(async () => {
    await database.unsafeResetDatabase();
  });
};

const localAsyncStorage = {
  setItem: (key: string, value: string): Promise<void> => {
    return database.adapter.setLocal(key, value);
  },
  getItem: async (key: string, defaultValue = null): Promise<string | null> => {
    const value = await database.adapter.getLocal(key);
    return value || defaultValue;
  },
  removeItem: (key: string): Promise<void> => {
    return database.adapter.removeLocal(key);
  },
};

export { database, resetDatabase, localAsyncStorage };
