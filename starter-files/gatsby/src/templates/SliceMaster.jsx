import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const PersonStyles = styled.div`
  h2 {
    position: relative;
    top: -1.5rem;
    font-size: 5rem;
  }
`;

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      bio
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

const SliceMaster = ({ data }) => {
  const { person } = data;

  return (
    <>
      <SEO title={person.name} image={person?.image?.asset?.fluid?.src} />
      <div className="center">
        <PersonStyles>
          <Img fluid={person.image.asset.fluid} />
          <h2 className="mark">{person.name}</h2>
          <p>{person.bio}</p>
        </PersonStyles>
      </div>
    </>
  );
};

export default SliceMaster;
