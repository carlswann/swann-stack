import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { appSlice } from './appSlice';
import { authenticationSlice } from 'modules/authentication/state/authenticationSlice';
import { authenticationMiddleware } from 'modules/authentication/state/authenticationMiddleware';
import { appApi } from 'apis/app/api';

export const store = configureStore({
  reducer: {
    App: appSlice.reducer,
    Authentication: authenticationSlice.reducer,
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware();
    return (
      defaultMiddleware
        .concat(authenticationMiddleware)
        // Adding the api middleware enables caching, invalidation, polling,
        // and other useful features of `rtk-query`.
        .concat(appApi.middleware)
    );
  },
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
