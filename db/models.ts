import { Model, Query, Relation } from '@nozbe/watermelondb';
import { field, date, readonly, writer, children, relation } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';

export class Photo extends Model {
  static table = 'photos';
  @field('photo') photo!: string;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt?: Date;

  @writer async addPhoto(photo: string) {
    const awaited = await this.collections.get<Photo>('photos').create((item) => {
      item.photo = photo;
    });
    return awaited;
  }
}

export class Track extends Model {
  static table = 'tracks';
  static associations: Associations = {
    coordinates: { type: 'has_many', foreignKey: 'track_id' },
  };
  @field('tracker') tracker!: number;
  @field('start_time') startTime!: number;
  @field('end_time') endTime!: number;
  @field('points') points!: number;

  @children('coordinates') coordinates?: Query<Coordinate>;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt?: Date;

  @writer async addCoordinate(latitude: number, longitude: number) {
    const awaited = await this.collections.get<Coordinate>('coordinates').create((item) => {
      item.latitude = latitude;
      item.longitude = longitude;
      item.track.set(this);
    });
    return awaited;
  }
}

export class Coordinate extends Model {
  static table = 'coordinates';
  @field('latitude') latitude!: number;
  @field('longitude') longitude!: number;
  @field('track_id') trackId!: string;

  @relation('tracks', 'track_id') track!: Relation<Track>;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt?: Date;
}
