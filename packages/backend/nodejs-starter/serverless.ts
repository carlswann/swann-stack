import { Serverless } from 'serverless/aws';
import { name } from './package.json';

const packageName = name.split('/')[1];
const { STAGE = 'local' } = process.env;
const envVars = { STAGE };

const apiRootPath = '/';
const serverlessConfig: Serverless = {
  service: `${packageName}-${STAGE}-api`,
  frameworkVersion: '2',
  disabledDeprecations: [
    'NESTED_CUSTOM_CONFIGURATION_PATH',
    'AWS_API_GATEWAY_NAME_STARTING_WITH_SERVICE',
    'LAMBDA_HASHING_VERSION_V2',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: "${opt:stage, 'dev'}",
    environment: envVars,
    region: 'us-east-1',
    memorySize: 256,
    timeout: 30,
    tracing: {
      apiGateway: true,
      lambda: true,
    },
  },
  functions: {
    api: {
      name: `swann-stack-${STAGE}-api`,
      handler: './dist/src/main-serverless.handler',
      events: [
        {
          http: {
            path: `${apiRootPath}{proxy+}`,
            method: 'ANY',
            cors: {
              origins: '*',
              headers: '*',
              allowCredentials: true,
            },
          },
        },
        {
          http: {
            path: apiRootPath,
            method: 'ANY',
            cors: {
              origins: '*',
              headers: '*',
              allowCredentials: true,
            },
          },
        },
      ],
    },
  },
  plugins: [
    'serverless-plugin-monorepo',
    'serverless-domain-manager',
    'serverless-offline', // Needs to be the last in the list. Reference :: https://github.com/dherault/serverless-offline
  ],
  custom: {
    'serverless-offline': {
      httpPort: 3040, // port for the app api
    },
    customDomain: {
      domainName: `${STAGE}-nodejs-starter.swann-stack.com`,
      createRoute53Record: true,
      autoDomain: true,
    },
  },
};

module.exports = serverlessConfig;
