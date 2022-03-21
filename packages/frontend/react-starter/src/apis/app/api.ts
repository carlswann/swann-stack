import { createApi } from '../utils/createApi';
import * as authEndpoints from './endpoints/auth';
import * as demoEndpoints from './endpoints/demo';
import * as usersEndpoints from './endpoints/users';

const baseUrl = process.env.REACT_APP_SPRING_BOOT_API_BASE_URL!;
export const appApi = createApi({
  baseUrl,
  endpoints: {
    ...authEndpoints,
    ...demoEndpoints,
    ...usersEndpoints,
  },
  reducerPath: 'appApi',
});
