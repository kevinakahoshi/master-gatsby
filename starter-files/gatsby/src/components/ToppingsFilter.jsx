import { Link, graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4rem;

  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    border-radius: 0.2rem;
    background: var(--grey);
    padding: 0.5rem;
    font-size: 2rem;
    margin: 0.5rem;
    font-size: clamp(1.5rem, 1vw, 2.5rem);

    .count {
      background: white;
      padding: 0.2rem 0.5rem;
    }

    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

const handlize = (name) => name.trim().toLowerCase().replace(/\s/g, '-');

const countPizzasInToppings = (pizzas) => {
  const countsTotal = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((accumulator, topping) => {
      const existingTopping = accumulator[topping.id];

      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        accumulator[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
          handle: handlize(topping.name),
        };
      }

      return accumulator;
    }, {});

  const sortedToppings = Object.values(countsTotal).sort(
    (firstTopping, secondTopping) => secondTopping.count - firstTopping.count
  );

  return sortedToppings;
};

const ToppingsFilter = () => {
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);

  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/pizzas/topping/${topping.handle}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
};

export default ToppingsFilter;
