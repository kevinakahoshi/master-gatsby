import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

const SinglePizza = ({ pizza }) => (
  <Link to={`/pizza/${pizza.slug.current}`}>
    <h2>
      <span className="mark">{pizza.name}</span>
    </h2>
    <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
    <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
  </Link>
);

const PizzaList = ({ pizzas }) => (
  <>
    <h1>List of Pizzas</h1>
    {pizzas.map((pizza) => (
      <SinglePizza key={pizza.id} pizza={pizza} />
    ))}
  </>
);

export default PizzaList;
