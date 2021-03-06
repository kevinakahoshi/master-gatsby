import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(var(--min-width), 1fr));

  @media (min-width: 601px) {
    --min-width: 400px;
  }

  @media (max-width: 600px) {
    --min-width: 200px;
  }
`;

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      toppings {
        id
        name
        vegetarian
      }
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

const SinglePizzaPage = ({ data }) => {
  const { name, image, toppings } = data.pizza;

  return (
    <>
      <SEO title={name} image={image?.asset?.fluid?.src} />
      <PizzaGrid>
        <Img fluid={image.asset.fluid} />
        <div>
          <h1 className="mark">{name}</h1>
          <ul>
            {toppings.map((topping) => (
              <li key={topping.id}>
                {topping.name}
                {topping.vegetarian ? ' 🍃' : ''}
              </li>
            ))}
          </ul>
        </div>
      </PizzaGrid>
    </>
  );
};

export default SinglePizzaPage;
