import React from "react";

import { Link } from "react-router-dom";

import './Pagination.css';

export default function Pagination({ page, current }) {
  
  switch( current ) {
    case true:
      return (
        <Link className="Pagination__link_current" to={ `/search/${page}` }>
          <div className="content-container Pagination__container_current">
            <span className="open-sans">Page { page }</span>
          </div>
        </Link>
      )
    case false:
      return (
        <Link className="Pagination__link" to={ `/search/${page}` }>
          <div className="Pagination__container content-container">
            <span className="open-sans">{ page }</span>
          </div>
        </Link>
      )
    default:
      return null;
  }
}