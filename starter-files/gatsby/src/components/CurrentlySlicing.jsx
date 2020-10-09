import React from 'react';
import LoadingGrid from './LoadingGrid';
import ItemGrid from './ItemGrid';

const CurrentlySlicing = ({ sliceMasters }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Slice Masters On</span>
    </h2>
    <p>Sanding by, ready to slice you up!</p>
    {!sliceMasters && <LoadingGrid count={4} />}
    {sliceMasters && !sliceMasters?.length && (
      <p>No one is working right now!</p>
    )}
    {sliceMasters?.length && <ItemGrid items={sliceMasters} />}
  </div>
);

export default CurrentlySlicing;
