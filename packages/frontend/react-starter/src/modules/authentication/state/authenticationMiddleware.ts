import { Middleware } from '@reduxjs/toolkit';

import { AUTHENTICATION_LOCAL_STORAGE_KEY } from 'modules/authentication/config/constants/authentication';

import { authenticationSlice } from './authenticationSlice';

export const authenticationMiddleware: Middleware = (store) => (next) => (action) => {
  // Allow the action to be handled first so that we can handle the persistence
  // after the state has been updated
  next(action);

  const { login, logout } = authenticationSlice.actions;
  const isLoginAction = login.match(action);
  const isLogoutAction = logout.match(action);

  const shouldPersist = isLoginAction || isLogoutAction;
  if (shouldPersist) {
    const { Authentication } = store.getState();
    localStorage.setItem(AUTHENTICATION_LOCAL_STORAGE_KEY, JSON.stringify(Authentication));
  }
};
