enum ENVIRONMENT {
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export const getConfig = (stage: string) => {
  let config = {};

  switch (stage) {
    case ENVIRONMENT.STAGING:
      config = {
        ...config,
      };
      break;
    case ENVIRONMENT.PRODUCTION:
      config = {
        ...config,
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
