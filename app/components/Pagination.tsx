"use client";

import { useState } from "react";

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn"
      >
        Previous
      </button>

      <span> Page {currentPage} </span>

      <button onClick={() => onPageChange(currentPage + 1)} className="btn">
        Next
      </button>
    </div>
  );
}
