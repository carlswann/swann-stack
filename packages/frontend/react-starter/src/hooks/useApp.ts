import { useAppSelector } from './useAppSelector';

export const useApp = () => {
  return useAppSelector(({ App }) => App);
};
