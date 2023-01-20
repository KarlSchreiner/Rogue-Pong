import React, { lazy, Suspense } from 'react';

const LazyBall = lazy(() => import('./Ball'));

const Ball = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    {/* <LazyBall {...props} /> */}
  </Suspense>
);

export default Ball;
