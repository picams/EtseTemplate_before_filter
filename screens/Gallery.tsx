import React, {memo, useCallback, useState} from 'react';
import {
  FlatList,
  View,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Database, Q} from '@nozbe/watermelondb';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import withObservables from '@nozbe/with-observables';
import {Photo} from '../db/models';

const COLUMNS = 2;
const MARGIN = 1;

const GridItem = memo(({photo}: {photo: Photo}) => {
  const uri = `data:image/jpeg;base64,${photo.photo}`;
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={styles.imageContainer}
      onPress={() => Alert.alert('onPress')}>
      <FastImage source={{uri}} style={styles.image} />
    </TouchableOpacity>
  );
});

const Grid = ({photos}: {photos: Photo[]}) => {
  const [itemHeight, setItemHeight] = useState(0);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    setItemHeight(width / COLUMNS);
  }, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => {
      return {length: itemHeight, offset: itemHeight * index, index};
    },
    [itemHeight],
  );

  const renderItem = useCallback(({item}: {item: Photo}) => {
    return <GridItem photo={item} />;
  }, []);

  const extractKey = useCallback((item: any) => {
    return item.id;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        onLayout={onLayout}
        style={styles.list}
        columnWrapperStyle={[styles.columnWrapper, {height: itemHeight}]}
        data={photos}
        renderItem={renderItem}
        numColumns={COLUMNS}
        keyExtractor={extractKey}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

const enhance = withObservables([], ({database}: {database: Database}) => {
  return {
    photos: database.get<Photo>('photos').query(Q.sortBy('created_at', 'desc')),
  };
});

export default withDatabase(enhance(Grid));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  list: {
    marginTop: 0,
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  image: {
    flex: 1,
    width: null as any,
    height: null as any,
    margin: MARGIN,
    backgroundColor: '#eee',
  },
  columnWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: -MARGIN,
    marginRight: -MARGIN,
  },
});
