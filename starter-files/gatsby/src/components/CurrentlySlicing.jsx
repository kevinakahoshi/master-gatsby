import React from 'react';

const CurrentlySlicing = ({ sliceMasters }) => (
  <div>
    <h3>Currently Slicing</h3>
    {sliceMasters &&
      sliceMasters.map((sliceMaster) => (
        <p key={sliceMaster.name}>{sliceMaster.name}</p>
      ))}
  </div>
);

export default CurrentlySlicing;
