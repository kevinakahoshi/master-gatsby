import React from 'react';
import CurrentlySlicing from '../components/CurrentlySlicing';
import HotSlices from '../components/HotSlices';
import SEO from '../components/SEO';
import useLatestData from '../utils/useLatestData';

const HomePage = () => {
  const data = useLatestData();
  const { sliceMasters, hotSlices } = data;

  return (
    <>
      <SEO title="Hot Now!" />
      <div className="center">
        <h1>The Best Pizza Downtown!</h1>
        <p>Open 11:00AM - 11:00PM every single day!</p>
        <div>
          <CurrentlySlicing sliceMasters={sliceMasters} />
          <HotSlices hotSlices={hotSlices} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
