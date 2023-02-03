import React, { lazy, Suspense } from 'react';

const LazyAIPaddle = lazy(() => import('./AIPaddle'));

const AIPaddle = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    {/* <LazyAIPaddle {...props} /> */}
  </Suspense>
);

export default AIPaddle;
