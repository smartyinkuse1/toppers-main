import { main as handler } from '../../src/functions/users/getUsers/handler';
import type { Context, Callback, APIGatewayProxyResult, APIGatewayProxyEvent, APIGatewayEventDefaultAuthorizerContext, APIGatewayEventRequestContextWithAuthorizer } from 'aws-lambda';

describe('Register Get Users Handler', () => {
    test('get users', async () => {
        const event: Omit<APIGatewayProxyEvent, "body"> & { body: any; rawBody: string; } = {
            headers: { 'Content-Type': 'application/json' },
            httpMethod: '',
            isBase64Encoded: false,
            path: '',
            body: null,
            rawBody: 'null',
            pathParameters: null,
            queryStringParameters: { 'userName': undefined },
            multiValueQueryStringParameters: null,
            stageVariables: null,
            resource: '',
            multiValueHeaders: {},
            requestContext: {} as APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext>
        }
        
        const context = {} as Context;
        const callback = null as unknown as Callback;
        const res: APIGatewayProxyResult = await handler(event, context, callback);
        expect(res.statusCode).toBe(200);
    });
});