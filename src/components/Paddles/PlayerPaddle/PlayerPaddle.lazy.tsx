import React, { lazy, Suspense } from 'react';

const LazyPlayerPaddle = lazy(() => import('./PlayerPaddle'));

const PlayerPaddle = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    {/* <LazyPlayerPaddle {...props} /> */}
  </Suspense>
);

export default PlayerPaddle;
