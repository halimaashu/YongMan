"use client"
import React from "react";
import { Table } from "@heroui/react";
import { TrashBin, ArrowRight } from "@gravity-ui/icons";

const BookedCallsTable = ({ myClass = [] }) => {
  return (
    // Outer container takes full width
    <div className="w-full p-4 bg-zinc-900 rounded-xl border border-zinc-800">
      {/* Changed layout classes on Table to force full width execution */}
      <Table className="w-full min-w-full layout-fixed">
        {/* ScrollContainer acts as the viewport block */}
        <Table.ScrollContainer className="w-full rounded-lg overflow-x-auto">
          <Table.Content aria-label="Booked calls list" className="w-full min-w-full bg-zinc-950 text-zinc-100 table-fixed">
            
            {/* Header section */}
            <Table.Header className="bg-zinc-900 border-b border-zinc-800">
              {/* Set proportional column widths to utilize 100% space evenly or intentionally */}
              <Table.Column isRowHeader className="w-2/5 text-left py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Title</Table.Column>
              <Table.Column className="w-1/5 text-left py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Price</Table.Column>
              <Table.Column className="w-1/5 text-left py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Email</Table.Column>
              <Table.Column className="w-1/5 text-right py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Action</Table.Column>
            </Table.Header>

            {/* Body Section */}
            <Table.Body>
              {myClass.map((item, index) => {
                return (
                  <Table.Row 
                    key={index} 
                    className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors duration-200"
                  >
                    {/* Title */}
                    <Table.Cell className="py-4 px-4 text-sm font-medium text-zinc-200 truncate">
                      {item.title}
                    </Table.Cell>

                    {/* Price */}
                    <Table.Cell className="py-4 px-4 text-sm text-zinc-300 font-mono">
                      ${item.price}
                    </Table.Cell>

                    {/* Email */}
                    <Table.Cell className="py-4 px-4 text-sm text-zinc-400 truncate">
                      {item.userEmail}
                    </Table.Cell>

                    {/* GravityUI Action Buttons */}
                    <Table.Cell className="py-4 px-4 text-sm text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => console.log("Open details for:", item.title)}
                          className="p-1.5 text-zinc-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-md transition-all"
                          title="View Details"
                        >
                          <ArrowRight width={16} height={16} />
                        </button>
                        <button 
                          onClick={() => console.log("Delete item at index:", index)}
                          className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all"
                          title="Delete Call"
                        >
                          <TrashBin width={16} height={16} />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
            
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default BookedCallsTable;