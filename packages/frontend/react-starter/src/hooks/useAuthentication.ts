import { useAppSelector } from './useAppSelector';

export const useAuthentication = () => {
  return useAppSelector(({ Authentication }) => Authentication);
};
