import { UserDatasourceInterface } from 'src/models/interfaces/user.interface';
import { GenericMatch } from 'src/models/interfaces/utility.interface';
import { UserDocument } from 'src/models/schemas';

export class UserService {
    private userdataSource: UserDatasourceInterface;
    constructor(userdataSource: UserDatasourceInterface) {
        this.userdataSource = userdataSource;
    }

    findUser(query: GenericMatch ) {
        return this.userdataSource.findOneByQuery(query);
    }

    async addUser(user: Partial<UserDocument>): Promise<boolean> {
        const { _id } = user;
        console.log(user, 'Before');
        return await this.userdataSource.update({ _id }, user, true);
    }
    async getUsersQuery(match: GenericMatch = {}): Promise<UserDocument[]> {
        
        return await this.userdataSource.findAll(match,1, 10);
    }
}