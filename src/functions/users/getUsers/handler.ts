import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { getUserController } from '@libs/controller-resolver';
import { middyfy } from '@libs/lambda';

import schema from './schema';


const getUsers: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {  
  const userController = await getUserController();
  console.log(event.queryStringParameters);
  const query = event.queryStringParameters;
  query['userName'] = null;
  const users = await userController.getUsersQuery(query);
  return formatJSONResponse(200, {
        message: 'Users gotten successfully',
        data: users
    })
};

export const main = middyfy(getUsers, schema);
