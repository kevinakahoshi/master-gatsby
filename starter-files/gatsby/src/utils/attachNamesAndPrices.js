import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

const attachNamesAndPrices = (order, pizzas) =>
  order.map((orderItem) => {
    const orderedPizza = pizzas.find((pizza) => pizza.id === orderItem.id);

    return {
      ...orderItem,
      name: orderedPizza.name,
      thumbnail: orderedPizza.image.asset.fluid.src,
      price: formatMoney(
        calculatePizzaPrice(orderedPizza.price, orderItem.size)
      ),
    };
  });

export default attachNamesAndPrices;
