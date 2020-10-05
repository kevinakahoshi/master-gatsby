import path from 'path';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  const pizzaTemplate = path.resolve('./src/templates/SinglePizzaPage.jsx');

  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  const toppingTemplate = path.resolve('./src/pages/pizzas.jsx');

  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);

  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `pizzas/topping/${topping.name
        .trim()
        .toLowerCase()
        .replace(/\s/g, '-')}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
};

export const createPages = async (params) => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
};
