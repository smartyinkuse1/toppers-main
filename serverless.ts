import type { AWS } from '@serverless/typescript';

import validate from '@functions/validate';
import sqs from '@functions/sqs';
import getUsers from '@functions/users/getUsers';
import getUser from '@functions/users/getUser';

const serverlessConfiguration: AWS = {
  service: 'toppers-main-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  custom: {
    stage: "${sls:stage}",
    staging: {},
    production: '${self:custom.staging}',
    dev: '${self:custom.staging}',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['sqs:*'],
        Resource: { 'Fn::GetAtt': ['ToppersMainQueue', 'Arn'] },
      },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      SECRET_KEY: "${ssm:/toppers-auth/${sls:stage}/secret-key}",
      DB_URL: "${ssm:/toppers-auth/${sls:stage}/mongo-url}",
    },
  },
  // import the function via paths
  functions: { validate, sqs, getUsers, getUser },
  package: { individually: true },
  resources: {
    Resources: {
      ToppersMainQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          FifoQueue: true,
          ContentBasedDeduplication: true,
          QueueName:
            '${self:service}-${self:custom.stage}_ToppersMainQueue.fifo',
        },
      }
    }
  }
};

module.exports = serverlessConfiguration;
