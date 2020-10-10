import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 0.5rem;
  text-align: center;

  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;

    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }

  @media (max-width: 800px) {
    .arrow-indicator {
      display: none;
    }
  }
`;

const Pagination = ({ pageSize, totalCount, currentPage, base }) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPrevPage = prevPage >= 1;
  const hasNextPage = nextPage <= totalPages;

  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={`/${base}/${prevPage}`}>
        &#8592;<span className="arrow-indicator"> Prev</span>
      </Link>
      {Array.from({ length: totalPages }, (element, index) => (
        <Link
          className={currentPage === 1 && index === 0 ? 'current' : ''}
          to={`/${base}/${index > 0 ? index + 1 : ''}`}
          key={index + 1}
        >
          {index + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`/${base}/${nextPage}`}>
        <span className="arrow-indicator">Next </span>&#8594;
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
