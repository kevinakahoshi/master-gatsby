import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto auto 500px;
  gap: 4rem;
`;

const PizzaStyles = styled.div`
  display: grid;

  @supports not (grid-template-rows: subgrid) {
    --rows: auto 1fr 500px;
  }

  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;

  h1,
  p {
    margin: 0;
  }
`;

const SinglePizza = ({ pizza }) => (
  <PizzaStyles>
    <Link to={`/pizzas/${pizza.slug.current}`}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
    </Link>
    <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
    <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
  </PizzaStyles>
);

const PizzaList = ({ pizzas }) => (
  <PizzaGridStyles>
    {pizzas.map((pizza) => (
      <SinglePizza key={pizza.id} pizza={pizza} />
    ))}
  </PizzaGridStyles>
);

export default PizzaList;
