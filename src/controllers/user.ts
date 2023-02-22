import { formatJSONResponse } from "@libs/api-gateway";
import { SqsBody } from "../models/interfaces/sqs.interface";
import { UserDatasourceInterface } from "../models/interfaces/user.interface";
import { UserDocument } from "../models/schemas";
import { UserService } from "../services/user";

export class UserController extends UserService {

    constructor(userDataSource: UserDatasourceInterface) {
        super(userDataSource);
    }

    async addAuthUser(recordBody: SqsBody) {
        const userObject  = recordBody;
        await this.addUser(userObject as Partial<UserDocument>);
    }

    async getUsers() {
        const users = await this.getUsersQuery();
        return formatJSONResponse(200, {
            message: 'Users gotten successfully',
            data: users
        })
    }

    async getUser(_id: string) {
        const users = await this.findUser({_id});
        return formatJSONResponse(200, {
            message: 'Users gotten successfully',
            data: users
        })
    }

}