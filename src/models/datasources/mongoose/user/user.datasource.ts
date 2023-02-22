import { ObjectId, Schema, Types } from "mongoose";
import { User, UserDatasourceInterface } from "src/models/interfaces/user.interface";
import { GenericMatch } from "src/models/interfaces/utility.interface";
import { UserDocument, users } from '../../../schemas/user';

export default class UserDatasource implements UserDatasourceInterface {
    constructor(
    ) {
     }
    async create(user: User): Promise<UserDocument> {
        return (await (new users(user)).save()).toObject({ getters: true });
    }

    async findAll(match: { [key: string]: string | number | Date | ObjectId }): Promise<UserDocument[]> {
        
        return users.find(match)
    }

    async findAllByIds(ids: (string | ObjectId)[]): Promise<UserDocument[]> {
        return (
            await users.find({ _id: { $in: ids.map(id => new Types.ObjectId(id as string)) } }).exec()
        )
    }

    async findOneById(id: string | ObjectId): Promise<UserDocument | null> {
        return (
            await users.findById(new Types.ObjectId(id as string)).exec()
        )
    }

    async findOneByEmail(email: string): Promise<UserDocument | null> {
        return users.findOne({ email }).lean({ getters: true });
    }

    async findOneByQuery(match: GenericMatch): Promise<UserDocument | null> {
        return users.findOne(match).lean({ getters: true });  
    }

    async update(match: Partial<User> | { [field: string]: string | number | Date | ObjectId }, update: Partial<User>, upsert: boolean = false): Promise<boolean> {
        return !!(
          await users.updateOne(
            match,
            { $set: { /*updatedAt: new Date(), */...update } },
            { upsert },
          )
        ).modifiedCount;
      }

      updateById(
        id: ObjectId|string,
        update: Partial<User>,
      ): Promise<boolean> {
        return this.update({ _id: new Schema.Types.ObjectId(id as string) }, update);
      }

}