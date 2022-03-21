import { EndpointBuilderType } from 'apis/types';
import { AUTHENTICATION_HEADER_KEY } from 'modules/authentication/config/constants/authentication';

type DemoType = {};

export type ReadDemoOptions = {
  authToken?: string;
} | void;

export type ReadDemoResult = DemoType;

export const readDemo = (builder: EndpointBuilderType) => {
  return builder.query<ReadDemoResult, ReadDemoOptions>({
    query: ({ authToken } = {}) => ({
      url: 'demos/1',
      method: 'GET',
      headers: {
        ...(authToken && {
          [AUTHENTICATION_HEADER_KEY]: authToken,
        }),
      },
    }),
  });
};
