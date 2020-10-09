import React from 'react';
import LoadingGrid from './LoadingGrid';

const CurrentlySlicing = ({ sliceMasters }) => (
  <div>
    {!sliceMasters && <LoadingGrid count={4} />}
    {sliceMasters && !sliceMasters?.length && (
      <p>No one is working right now!</p>
    )}
  </div>
);

export default CurrentlySlicing;
