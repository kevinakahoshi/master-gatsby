import React from 'react';
import LoadingGrid from './LoadingGrid';
import ItemGrid from './ItemGrid';

const HotSlices = ({ hotSlices }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Slices On</span>
    </h2>
    <p>Come on by, buy the slice!</p>
    {!hotSlices && <LoadingGrid count={4} />}
    {hotSlices && !hotSlices?.length && <p>We got nothing in the case!</p>}
    {hotSlices?.length && <ItemGrid items={hotSlices} />}
  </div>
);

export default HotSlices;
