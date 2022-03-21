import { Suspense, ComponentType, ComponentProps } from 'react';

import Loader from './Loader';

export const Loadable =
  <C extends ComponentType<any>>(Component: C) =>
  (props: ComponentProps<C>) =>
    (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
