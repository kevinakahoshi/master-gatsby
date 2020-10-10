import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--min-width), 1fr));
  grid-auto-rows: auto auto var(--max-height);
  gap: 4rem;

  @media (min-width: 601px) {
    --min-width: 350px;
    --max-height: 500px;
  }

  @media (max-width: 600px) {
    --min-width: 250px;
    --max-height: 300px;
  }
`;

const PizzaStyles = styled.div`
  display: grid;

  @supports not (grid-template-rows: subgrid) {
    --rows: auto 1fr var(--max-height);
  }

  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;

  h1,
  p {
    margin: 0;
  }

  @media (min-width: 601px) {
    --max-height: 500px;
  }

  @media (max-width: 600px) {
    --max-height: 300px;
  }
`;

const SinglePizza = ({ pizza }) => (
  <PizzaStyles>
    <Link to={`/pizza/${pizza.slug.current}`}>
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
