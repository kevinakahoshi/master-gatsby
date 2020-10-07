import calculatePizzaPrice from './calculatePizzaPrice';

const calculateOrderTotal = (order, pizzas) =>
  order.reduce((total, pizzaInOrder) => {
    const pizza = pizzas.find((item) => item.id === pizzaInOrder.id);
    return total + calculatePizzaPrice(pizza.price, pizzaInOrder.size);
  }, 0);

export default calculateOrderTotal;
