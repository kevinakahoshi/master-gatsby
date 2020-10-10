import styled from 'styled-components';

const MenuItemStyles = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 0 1.3rem;
  align-content: center;
  align-items: center;
  position: relative;

  @media (min-width: 601px) {
    grid-template-columns: 100px 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .gatsby-image-wrapper {
    grid-row: span 2;
    height: 100%;
  }

  p {
    margin: 0;
  }

  button {
    font-size: 1.5rem;
  }

  & .size-button-wrapper {
    display: grid;
    grid-gap: 1rem;

    @media (min-width: 601px) {
      grid-template-columns: auto auto auto;
    }

    @media (max-width: 600px) {
      grid-template-rows: auto auto auto;
    }
  }

  .remove {
    background: none;
    color: var(--red);
    font-size: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: none;
    line-height: 1rem;
  }
`;

export default MenuItemStyles;
