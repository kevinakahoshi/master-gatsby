import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grids';

const ItemGrid = ({ items }) => (
  <ItemsGrid>
    {items.map((item) => (
      <ItemStyles key={item._id}>
        <p>
          <span className="mark">{item.name}</span>
        </p>
        <img
          width="500"
          height="400"
          src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
          alt={item.name}
          style={{
            background: `url(${item.image.asset.metadata.lqip})`,
            backgroundRepeat: 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </ItemStyles>
    ))}
  </ItemsGrid>
);

export default ItemGrid;
