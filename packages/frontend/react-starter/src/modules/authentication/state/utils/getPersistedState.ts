import { AUTHENTICATION_LOCAL_STORAGE_KEY } from 'modules/authentication/config/constants/authentication';

import { AuthenticationStateType } from '../types';

export const getPersistedState = (): AuthenticationStateType | null => {
  try {
    return JSON.parse(localStorage.getItem(AUTHENTICATION_LOCAL_STORAGE_KEY)!);
  } catch (error) {
    console.error('Error parsing persisted authentication state', error);
    return null;
  }
};
