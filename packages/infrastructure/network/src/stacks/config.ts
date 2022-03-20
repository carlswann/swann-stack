const DOMAIN_NAME = 'swann-stack.com';
const API_PREFIX = 'api';
const WEBSOCKET_API_PREFIX = 'ws';

enum ENVIRONMENT {
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export const getConfig = (stage: string) => {
  const domainName = `${stage}.${DOMAIN_NAME}`;

  let config = {
    rootHostedZone: DOMAIN_NAME,
    domainName,
    apiUrl: `${API_PREFIX}.${domainName}`,
    websocketApiDomainName: `${WEBSOCKET_API_PREFIX}.${domainName}`,
    websocketApiPrefix: WEBSOCKET_API_PREFIX,
    apiPrefix: API_PREFIX,
  };

  switch (stage) {
    case ENVIRONMENT.STAGING:
      config = {
        ...config,
      };
      break;
    case ENVIRONMENT.PRODUCTION:
      config = {
        ...config,
        domainName: DOMAIN_NAME,
        apiUrl: `${API_PREFIX}.${DOMAIN_NAME}`,
        websocketApiDomainName: `${WEBSOCKET_API_PREFIX}.${DOMAIN_NAME}`,
      };
      break;
    default:
      config = {
        ...config,
      };
      break;
  }

  return config;
};
