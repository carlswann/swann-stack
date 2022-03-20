const DOMAIN_NAME = 'swann-stack.com';
const API_PREFIX = 'api';

enum ENVIRONMENT {
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export const getConfig = (stage: string) => {
  const domainName = `${stage}.${DOMAIN_NAME}`;

  let config = {
    rootHostedZone: DOMAIN_NAME,
    domainName,
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
