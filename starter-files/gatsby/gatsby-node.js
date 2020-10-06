import path from 'path';
import fetch from 'isomorphic-fetch';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

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

const fetchBeersAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const response = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await response.json();

  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };

    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
};

const turnSliceMastersIntoPages = async ({ graphql, actions }) => {
  // 1. Query all slicemasters
  // 2. Turn slicemasters into their own page
  // 3. Figure out how many pages there are based on how many slicemasters there are, and how many per page
  // 4. Loop from 1 to n and create a page for each slicemaster

  const { data } = await graphql(`
    query {
      sliceMasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.sliceMasters.totalCount / pageSize);

  data.sliceMasters.nodes.forEach((person) => {
    actions.createPage({
      path: `/slice-master/${person.slug.current}`,
      component: path.resolve('./src/templates/SliceMaster.jsx'),
      context: {
        name: person.name,
        slug: person.slug.current,
        id: person.id,
      },
    });
  });

  Array.from({ length: pageCount }, (element, index) =>
    actions.createPage({
      path: `/slice-masters/${index + 1}`,
      component: path.resolve('./src/pages/slice-masters.jsx'),
      context: {
        // When querying we need to know which elements to skip over, so if you're on page 1,
        // you don't skip anything.  If you're on page 2, you skip over the first four (1 * 4), etc.
        skip: index * pageSize,
        currentPage: index + 1,
        pageSize,
      },
    })
  );
};

export const sourceNodes = async (params) => {
  // Fetch list of beers and source them into our Gatsby API
  await fetchBeersAndTurnIntoNodes(params);
};

export const createPages = async (params) => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSliceMastersIntoPages(params),
  ]);
};
