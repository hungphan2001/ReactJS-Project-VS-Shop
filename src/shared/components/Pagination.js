import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const Pagination = ({ pages }) => {
  const { currentPage, total, next, limit, prev, hasNext, hasPrev } = pages;
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const formatUrl = (page) => {
    return `${location.pathname}?keyword=${searchParams.get(
      "keyword"
    )}&page=${page}`;
  };

  const formatUrlPage = (page) => {
    return `${location.pathname}?page=${page}`;
  };
  const renderPagesHTML = (delta = 2) => {
    const pages = [];
    const pageDot = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    const totalPages = Math.ceil(total / limit);

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        (i >= left && i <= right)
      ) {
        pages.push(i);
      }
    }
    if (pages.length > 0) {
      for (let j = 0; j < pages.length; j++) {
        pageDot.push(pages[j]);
        if (pages[j + 1] - pages[j] >= delta) {
          pageDot.push("...");
        }
      }
    }
    return pageDot;
  };

  return (
    <ul className="pagination">
      {hasPrev && (
        <li className="page-item">
          <Link className="page-link" to={formatUrl(prev)}>
            Trang trước
          </Link>
        </li>
      )}
      {renderPagesHTML().map((page, index) => (
        <li
          key={index}
          className={`page-item ${page === currentPage ? "active" : ""}`}
        >
          <Link
            style={page === "..." ? { pointerEvents: "none" } : {}}
            className="page-link"
            to={formatUrl(page)}
          >
            {page}
          </Link>
        </li>
      ))}
      {hasNext && (
        <li className="page-item">
          <Link className="page-link" to={formatUrl(next)}>
            Trang sau
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
