import { verify } from 'jsonwebtoken';
const validate = async (event) => {

  event.methodArn;
  const authToken = event.authorizationToken;
  const authArray = authToken.split(' ');
  const token = authArray[1];

  if (authArray.length !== 2 || authArray[1].length === 0) {
    return generatePolicy('undefined', 'Deny', event.methodArn);
  }
  const decoded = verify(token, process.env.SECRET_KEY);

  if (decoded) {
    return generatePolicy(decoded, 'Allow', event.methodArn)
  }

  return generatePolicy('undefined', 'Deny', event.methodArn);

};

const generatePolicy = (principalId: any, effect: string, resource) => {
  let authResponse = {} as any;

  authResponse.principalId = principalId
  if (effect && resource) {
    let policyDocument = {} as any;
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    let statementOne = {} as any;
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }

  return authResponse
}
export const main = validate;
