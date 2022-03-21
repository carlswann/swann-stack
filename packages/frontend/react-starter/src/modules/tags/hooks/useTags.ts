import { appApi } from 'apis/app/api';

const { useReadDemoQuery } = appApi;

export const useTags = () => {
  const { data: tags, ...otherProperties } = useReadDemoQuery();

  return { tags, ...otherProperties };
};
