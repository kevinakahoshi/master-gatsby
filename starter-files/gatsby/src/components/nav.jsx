import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './logo';

const NavStyles = styled.nav`
  margin-bottom: 3rem;

  .logo {
    transform: translateY(-25%);
  }

  ul {
    margin: 0;
    padding: 0;
    display: grid;
    text-align: center;
    list-style: none;
    grid-gap: 2rem;
    align-items: center;
    margin-top: -6rem;

    @media (min-width: 601px) {
      grid-template-columns: 1fr 1fr auto 1fr 1fr;
    }

    @media (max-width: 600px) {
      --columns: 4;
      grid-template-rows: auto auto;
      grid-template-columns: repeat(var(--columns), 1fr);
      justify-items: center;

      & .logo-item {
        order: 0;
        grid-column: 1 / -1;

        & .logo {
          transform: none;
        }
      }
    }

    @media (max-width: 400px) {
      --columns: 2;
    }
  }

  li {
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;
    transition: 0.15s all;

    &:nth-child(1) {
      --rotate: 1deg;
    }

    &:nth-child(2) {
      --rotate: -2.5deg;
    }

    &:nth-child(4) {
      --rotate: 2.5deg;
    }

    &:hover {
      --rotate: 3deg;
    }

    a {
      font-size: 3rem;
      text-decoration: none;

      &:hover {
        color: var(--red);
      }

      &[aria-current='page'] {
        color: var(--red);
      }

      @media (max-width: 800px) {
        font-size: 2rem;
      }
    }
  }
`;

const Nav = () => (
  <NavStyles>
    <ul>
      <li>
        <Link to="/">Hot Now</Link>
      </li>
      <li>
        <Link to="/pizzas">Pizza Menu</Link>
      </li>
      <li className="logo-item">
        <Link to="/">
          <Logo />
        </Link>
      </li>
      <li>
        <Link to="/slice-masters">Slice Masters</Link>
      </li>
      <li>
        <Link to="/order">Order Ahead!</Link>
      </li>
    </ul>
  </NavStyles>
);

export default Nav;
