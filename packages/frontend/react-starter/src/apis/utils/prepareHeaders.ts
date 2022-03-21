import { PrepareHeadersFunctionType } from '../types';
import { AUTHENTICATION_HEADER_KEY } from 'modules/authentication/config/constants/authentication';

export const prepareHeaders: PrepareHeadersFunctionType = (headers, api) => {
  const state = api.getState() as any;
  const { authToken } = state.Authentication;

  if (authToken) {
    headers.set(AUTHENTICATION_HEADER_KEY, authToken);
  }

  return headers;
};
