import React from "react";
import Pagination from "react-bootstrap/Pagination";
import "./PaginationContainer.scss";

interface PaginationContainerProps {
  handlePaginationClick: (number: number) => void;
  activePage: number;
}

const PaginationContainer: React.FC<PaginationContainerProps> = ({
  handlePaginationClick,
  activePage,
}) => {
  const items = [];

  for (let number = 1; number <= 10; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => handlePaginationClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination>{items}</Pagination>;
};

export default PaginationContainer;
