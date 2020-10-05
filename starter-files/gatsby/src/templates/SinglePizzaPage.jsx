import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  margin-bottom: 2rem;
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

  console.log(toppings);

  return (
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
  );
};

export default SinglePizzaPage;
