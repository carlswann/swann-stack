import { useFirebase } from './useFirebase';
import { renderHook } from '@testing-library/react-hooks';

describe('useFirebase', () => {
  it('should return firebase methods', (): any => {
    const { result } = renderHook(() => useFirebase());

    expect(typeof result.current.loginWithGoogle).toEqual('function');
  });
});
