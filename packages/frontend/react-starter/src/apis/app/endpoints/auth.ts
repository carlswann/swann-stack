import { EndpointBuilderType } from 'apis/types';

export type AuthenticateUserOptions = {
  username: string;
  password: string;
  type: 'account';
};

export type AuthenticateUserResult = {
  token: string;
};

export const authenticateUser = (builder: EndpointBuilderType) => {
  return builder.mutation<AuthenticateUserResult, AuthenticateUserOptions>({
    query: (options) => ({
      url: 'V7/auth/token',
      method: 'POST',
      body: options,
    }),
  });
};
