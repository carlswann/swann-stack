import { appApi } from 'apis/app/api';

const { useReadDemoQuery } = appApi;

export const useAttributes = () => {
  const { data: attributes, ...otherProperties } = useReadDemoQuery({});

  return { attributes, ...otherProperties };
};
