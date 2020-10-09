import React from 'react';
import LoadingGrid from './LoadingGrid';

const HotSlices = ({ hotSlices }) => (
  <div>
    {!hotSlices && <LoadingGrid count={4} />}
    {hotSlices && !hotSlices?.length && <p>We got nothing in the case!</p>}
  </div>
);

export default HotSlices;
