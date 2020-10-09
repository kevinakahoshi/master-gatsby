import { useEffect, useState } from 'react';

const gql = String.raw;

const deets = `
  name
  _id
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

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
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              sliceMaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
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
      })
      .catch((error) => console.error(error));
  }, []);

  return {
    hotSlices,
    sliceMasters,
  };
};

export default useLatestData;
