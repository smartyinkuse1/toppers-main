import { UserController } from "../controllers/user";
import UserDatasource from "../models/datasources/mongoose/user/user.datasource";
import { connectDb } from "../models/schemas";

export const getUserController = async() => {
    await connectDb()
    const userDatasource = new UserDatasource();
    const userController = new UserController(userDatasource);
    return userController;
}