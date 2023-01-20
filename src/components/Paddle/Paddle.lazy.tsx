import React, { lazy, Suspense } from 'react';

const LazyPaddle = lazy(() => import('./Paddle'));

const Paddle = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPaddle {...props} />
  </Suspense>
);

export default Paddle;
