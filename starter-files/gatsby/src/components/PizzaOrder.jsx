import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => (
  <div className="pizza-wrapper">
    {order.map((singleOrder, index) => {
      const pizza = pizzas.find((dough) => dough.id === singleOrder.id);

      return (
        <MenuItemStyles key={`${singleOrder.id}-${index}`}>
          <Img fluid={pizza.image.asset.fluid} />
          <h2>{pizza.name}</h2>
          <p>
            {singleOrder.size}{' '}
            {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
          </p>
          <button
            type="button"
            className="remove"
            title={`Remove Size ${singleOrder.size} ${pizza.name}`}
            onClick={() => removeFromOrder(index)}
          >
            &times;
          </button>
        </MenuItemStyles>
      );
    })}
  </div>
);

export default PizzaOrder;
