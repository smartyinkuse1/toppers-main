import { UserDocument } from "../schemas";
import { GenericMatch } from "./utility.interface";

export interface User {
    email: string,
    userName: string,
    firstName: string,
    lastName: string,
    state: string,
    country: string,
    mobile: string
};

export interface UserDatasourceInterface {

    create(user: User, password?: string): Promise<UserDocument>;

    findAll(match: { [key: string]: string | number | Date }, page: number, limit: number): Promise<UserDocument[]>;

    findAllByIds(ids: string[]): Promise<UserDocument[]>;

    findOneById(id: string): Promise<UserDocument>;

    findOneByEmail(email: string): Promise<UserDocument | null>;

    findOneByQuery(match: GenericMatch): Promise<UserDocument | null>;

    update(
        match: Partial<UserDocument> | { [field: string]: string | number | Date },
        update: Partial<UserDocument>,
        upsert: boolean
    ): Promise<boolean>;

    updateById(id: string, update: Partial<UserDocument>): Promise<boolean>;
}

