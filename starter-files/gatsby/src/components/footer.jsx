import React from 'react';
import styled from 'styled-components';

const FooterStyles = styled.footer`
  margin-top: 1.5rem;
`;

const Footer = () => (
  <FooterStyles className="center">
    <h3>&copy; Slick's Slices {new Date().getFullYear()}</h3>
  </FooterStyles>
);

export default Footer;
