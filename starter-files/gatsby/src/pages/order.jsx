import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        price
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

const OrderPage = ({ data }) => {
  const pizzas = data.pizzas.nodes;

  const { values, updateValue } = useForm({
    name: '',
    email: '',
  });

  const { order, addToOrder, removeFromOrder } = usePizza({
    pizzas,
    inputs: values,
  });

  return (
    <>
      <SEO title="Order a pizza!" />
      <OrderStyles>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          <div className="pizza-wrapper">
            {pizzas.map((pizza) => (
              <MenuItemStyles key={pizza.id}>
                <Img width="50" height="50" fluid={pizza.image.asset.fluid} />
                <div key={pizza.id}>
                  <h2>{pizza.name}</h2>
                </div>
                <div>
                  {['S', 'M', 'L'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        addToOrder({
                          id: pizza.id,
                          size,
                        })
                      }
                    >
                      {size}{' '}
                      {formatMoney(calculatePizzaPrice(pizza.price, size))}
                    </button>
                  ))}
                </div>
              </MenuItemStyles>
            ))}
          </div>
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset className="total">
          <h3>
            Your Order Total is{' '}
            {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
        </fieldset>
      </OrderStyles>
    </>
  );
};

export default OrderPage;
