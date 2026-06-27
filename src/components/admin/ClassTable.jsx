"use client";

import React, { useState } from "react";
import { Table, Chip, Tooltip } from "@heroui/react";
// Gravity UI Icons
import { TrashBin, Eye, Check } from "@gravity-ui/icons";

export default function ClassTable({ initialClasses }) {
  const [classList, setClassList] = useState(initialClasses);

  // Handle Approve Action
  const handleApprove = async (id) => {
    try {
      // Optimistically update the status locally to 'approved'
      setClassList((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: "approved" } : item,
        ),
      );

      // Optional: Call your backend action or API route here
      // await approveClassAction(id);
    } catch (error) {
      console.error("Failed to approve class:", error);
    }
  };

  // Handle Delete Action
  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this class?");
    if (!confirmed) return;

    try {
      setClassList((prev) => prev.filter((item) => item._id !== id));
      // Optional: Call your backend action or API route here
      // await deleteClassAction(id);
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  };

  return (
    <div className="w-full bg-[#121212] text-white p-6 rounded-xl border border-neutral-800">
      {/* Header Summary Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Manage Classes
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Oversee all active listings, difficulties, and approvals across the
            platform.
          </p>
        </div>
        <button className="bg-white text-black font-medium py-2 px-4 rounded-md hover:bg-neutral-200 transition-colors text-sm">
          + Create Class
        </button>
      </div>

      {/* HeroUI v3 Structured Table */}
      <Table className="dark text-neutral-200">
        <Table.ScrollContainer>
          <Table.Content aria-label="Class management administrative data table">
            <Table.Header>
              {/* CRITICAL FIX: The primary text column gets 'isRowHeader' so screen readers read it first */}
              <Table.Column id="className" isRowHeader>
                CLASS NAME
              </Table.Column>
              <Table.Column id="category">CATEGORY</Table.Column>
              <Table.Column id="difficulty">DIFFICULTY</Table.Column>
              <Table.Column id="duration">DURATION</Table.Column>
              <Table.Column id="price">PRICE</Table.Column>
              <Table.Column id="status">STATUS</Table.Column>
              <Table.Column id="actions">ACTIONS</Table.Column>
            </Table.Header>

            <Table.Body>
              {classList.map((item) => (
                <Table.Row
                  key={item._id}
                  className="border-b border-neutral-800 hover:bg-neutral-900/40 transition-colors"
                >
                  {/* Class Name (Acts as Row Header) */}
                  <Table.Cell>
                    <div className="flex flex-col py-1">
                      <span className="font-medium text-white">
                        {item.className}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono mt-0.5">
                        Ref: {item._id.slice(-6).toUpperCase()}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Category */}
                  <Table.Cell className="capitalize text-neutral-300">
                    {item.category}
                  </Table.Cell>

                  {/* Difficulty Badge */}
                  <Table.Cell>
                    <span className="capitalize px-2 py-0.5 rounded bg-neutral-800 text-xs font-medium text-neutral-300 border border-neutral-700">
                      {item.difficulty}
                    </span>
                  </Table.Cell>

                  {/* Duration */}
                  <Table.Cell className="text-neutral-400">
                    {item.duration}
                  </Table.Cell>

                  {/* Price Formatted */}
                  <Table.Cell
                    className="font-medium text-neutral-200"
                    suppressHydrationWarning
                  >
                    ৳{Number(item.price).toLocaleString()}
                  </Table.Cell>

                  {/* Status Badge */}
                  <Table.Cell>
                    <Chip
                      className="capitalize border-none font-semibold text-xs"
                      color={item.status === "approved" ? "success" : "warning"}
                      size="sm"
                      variant="flat"
                    >
                      {item.status}
                    </Chip>
                  </Table.Cell>

                  {/* Action Icons */}
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      {/* CONDITIONAL APPROVE BUTTON: Only renders if status is 'pending' */}
                      {item.status === "pending" && (
                        <Tooltip color="success" content="Approve Class">
                          <button
                            onClick={() => handleApprove(item._id)}
                            className="text-emerald-500 hover:text-emerald-400 p-1 transition-colors rounded hover:bg-emerald-500/10"
                          >
                            <Check width={18} height={18} />
                          </button>
                        </Tooltip>
                      )}

                      <Tooltip content="View Details">
                        <button className="text-neutral-400 hover:text-white p-1 transition-colors">
                          <Eye width={18} height={18} />
                        </button>
                      </Tooltip>

                      <Tooltip color="danger" content="Delete Class">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-neutral-500 hover:text-danger p-1 transition-colors"
                        >
                          <TrashBin width={18} height={18} />
                        </button>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        {/* Table Footer Meta Layout */}
        <Table.Footer>
          <div className="p-4 text-xs text-neutral-500 border-t border-neutral-800">
            Showing 1-{classList.length} of {classList.length} results
          </div>
        </Table.Footer>
      </Table>
    </div>
  );
}
