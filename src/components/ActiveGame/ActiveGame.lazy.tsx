import React, { lazy, Suspense } from 'react';

const LazyActiveGame = lazy(() => import('./ActiveGame'));

const ActiveGame = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyActiveGame {...props} />
  </Suspense>
);

export default ActiveGame;
