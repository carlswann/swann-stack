import { createApi as baseCreateApi, fetchBaseQuery, EndpointDefinition } from '@reduxjs/toolkit/query/react';
import { EndpointBuilderType } from '../types';
import { prepareHeaders } from './prepareHeaders';

type EndpointsType = {
  [key: string]: (builder: EndpointBuilderType) => EndpointDefinition<any, any, any, any>;
};

type AccumulatedEndpointsType<E extends EndpointsType> = {
  [endpointName in keyof E]: ReturnType<E[endpointName]>;
};

type CreateApiArgsType<E extends EndpointsType, RP extends string> = {
  baseUrl: string;
  endpoints: E;
  reducerPath: RP;
};

export const createApi = <E extends EndpointsType, RP extends string>(args: CreateApiArgsType<E, RP>) => {
  const { baseUrl, endpoints, reducerPath } = args;

  return baseCreateApi({
    reducerPath,
    baseQuery: fetchBaseQuery({ baseUrl, prepareHeaders }),
    endpoints: (builder) => {
      return Object.entries(endpoints).reduce((result, keyValuePair) => {
        const [endpointName, endpointInitializer] = keyValuePair;

        return {
          ...result,
          [endpointName]: endpointInitializer(builder),
        };
      }, {}) as AccumulatedEndpointsType<E>;
    },
  });
};
