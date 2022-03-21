import { useEffect, useRef } from 'react';

function useScriptRef() {
  const scripted = useRef(true);

  useEffect(
    () => () => {
      scripted.current = false;
    },
    []
  );

  return scripted;
}

export default useScriptRef;
