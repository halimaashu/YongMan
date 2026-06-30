"use client";

import {Pagination} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";


export function PaginationControlled({currentPage,allPages,classes}) {
  console.log()
  const [page,setPage] = useState(currentPage)
  const totalPages = allPages;
  const itemsPerPage = 10;
  const totalItems = classes.length;

  const getPageNumbers = () => {
    const pages= [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (page > 3) {
        pages.push("ellipsis");
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push("ellipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <Pagination>
      <Pagination.Summary>
       Showing {startItem}-{endItem} of {totalItems} results
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={page === 1}>
            <Pagination.PreviousIcon />
           <Link href={`/classes?page=${page-1}`}>
           preview
           </Link>
          </Pagination.Previous>
        </Pagination.Item>
        {getPageNumbers().map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
           <Link href={`/classes?page=${p}`}>
             <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                {p}
              </Pagination.Link>
           </Link>
            </Pagination.Item>
          ),
        )}
        <Pagination.Item>
          <Pagination.Next isDisabled={page === totalPages}>
          <Link href={`/classes?page=${page+1}`}>
           next
           </Link>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}