import React from 'react';

const HotSlices = ({ hotSlices }) => (
  <div>
    <h3>Hot Slices</h3>
    {hotSlices &&
      hotSlices.map((slice) => <p key={slice.name}>{slice.name}</p>)}
  </div>
);

export default HotSlices;
