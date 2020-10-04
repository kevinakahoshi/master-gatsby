import { graphql } from 'gatsby';
import React from 'react';

import PizzaList from '../components/PizzaList';

const PizzasPage = ({ data }) => {
  const pizzas = data.pizzas.nodes;
  return <PizzaList pizzas={pizzas} />;
};

export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          _id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxHeight: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default PizzasPage;
