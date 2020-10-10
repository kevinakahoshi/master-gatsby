const { default: styled } = require('styled-components');

export const HomePageGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(var(--columns), minmax(auto, 1fr));

  @media (min-width: 801px) {
    --columns: 2;
  }

  @media (max-width: 800px) {
    --columns: 1;
  }
`;

export const ItemsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

export const ItemStyles = styled.div`
  text-align: center;
  position: relative;

  img {
    height: auto;
    font-size: 0;
  }

  @keyframes shine {
    0% {
      background-position: 200%;
    }

    100% {
      background-position: -40px;
    }
  }

  img.loading {
    --shine: white;
    --background: var(--grey);
    background-image: linear-gradient(
      90deg,
      var(--background) 0px,
      var(--shine) 40px,
      var(--background) 80px
    );
    background-size: 500px;
    animation: shine 1s infinite linear;
  }

  p {
    transform: rotate(-2deg) translateY(-50%);
    position: absolute;
    width: 100%;
    left: 0;
    margin: 0;
  }
`;
