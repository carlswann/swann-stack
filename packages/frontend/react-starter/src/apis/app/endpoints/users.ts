import { EndpointBuilderType } from 'apis/types';
import { AUTHENTICATION_HEADER_KEY } from 'modules/authentication/config/constants/authentication';

type UserType = {};

export type ReadCurrentUserOptions = {
  authToken?: string;
} | void;

export type ReadCurrentUserResult = UserType;

export const readCurrentUser = (builder: EndpointBuilderType) => {
  return builder.query<ReadCurrentUserResult, ReadCurrentUserOptions>({
    query: ({ authToken } = {}) => ({
      url: 'V7/api/users/token',
      method: 'GET',
      headers: {
        ...(authToken && {
          [AUTHENTICATION_HEADER_KEY]: authToken,
        }),
      },
    }),
  });
};
