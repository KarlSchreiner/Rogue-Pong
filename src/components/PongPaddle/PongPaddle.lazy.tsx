import React, { lazy, Suspense } from 'react';

const LazyPongPaddle = lazy(() => import('./PongPaddle'));

const PongPaddle = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPongPaddle {...props} />
  </Suspense>
);

export default PongPaddle;
