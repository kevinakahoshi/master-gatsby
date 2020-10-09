import { useEffect, useState } from 'react';

const useLatestData = () => {
  const [sliceMasters, setSliceMasters] = useState();
  const [hotSlices, setHotSlices] = useState();

  useEffect(() => {
    // When the component loads, fetch the data
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          StoreSettings(id: "downtown") {
            name,
            sliceMaster {
              name
            }
            hotSlices {
              name
            }
          }
        }`,
      }),
    };

    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, options)
      .then((response) => response.json())
      .then((response) => {
        const {
          sliceMaster: slicers,
          hotSlices: slices,
        } = response.data.StoreSettings;
        setSliceMasters(slicers);
        setHotSlices(slices);
      });
  }, []);

  return {
    hotSlices,
    sliceMasters,
  };
};

export default useLatestData;
