import {Model} from '@nozbe/watermelondb';
import {field, date, readonly, writer} from '@nozbe/watermelondb/decorators';

export class Photo extends Model {
  static table = 'photos';
  @field('photo') photo!: string;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt?: Date;

  @writer async addPhoto(photo: string) {
    const awaited = await this.collections.get<Photo>('photos').create(item => {
      item.photo = photo;
    });
    return awaited;
  }
}
