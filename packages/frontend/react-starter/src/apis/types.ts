import { fetchBaseQuery, createApi, EndpointDefinition } from '@reduxjs/toolkit/query/react';

type CreateApiArgs = Parameters<typeof createApi>[0];
type FetchBaseQueryArgs = Exclude<Parameters<typeof fetchBaseQuery>[0], undefined>;

export type PrepareHeadersFunctionType = FetchBaseQueryArgs['prepareHeaders'];
export type EndpointBuilderType = Parameters<CreateApiArgs['endpoints']>[0];
export type PageableListApiResponse<T> = {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
};

export type { EndpointDefinition };
