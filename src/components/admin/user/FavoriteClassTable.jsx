"use client";

import { Table, Avatar, Button } from "@heroui/react";
// Gravity UI Icons
import { Eye, TrashBin } from "@gravity-ui/icons";
import Link from "next/link";

export default function FavoriteClassTable({ data }) {
  console.log(data[1].imageUrl);
  return (
    <div className="w-full">
      <div className=""></div>
      <Table className="bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100">
        <Table.ScrollContainer>
          <Table.Content aria-label="My Favorite Gym Classes Table">
            <Table.Header>
              <Table.Column
                isRowHeader
                className="text-zinc-400 font-semibold py-4"
              >
                CLASS INFO
              </Table.Column>
              <Table.Column className="text-zinc-400 font-semibold py-4">
                CATEGORY
              </Table.Column>
              <Table.Column className="text-zinc-400 font-semibold py-4">
                PRICE
              </Table.Column>
              <Table.Column className="text-zinc-400 font-semibold py-4 text-right">
                ACTIONS
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {data.map((item) => (
                <Table.Row
                  key={item._id}
                  className="border-b border-zinc-800/60 hover:bg-zinc-800/30 transition-colors"
                >
                  {/* Class Info (Image + Title) matching Screenshot layout */}
                  <Table.Cell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <Avatar.Image alt={item.className} src={item.imageUrl} />
                        <Avatar.Fallback>JD</Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-zinc-100 text-sm sm:text-base">
                          {item.className}
                        </span>
                        <span className="text-xs text-zinc-500">
                          Ref: {item.postId?.slice(-6).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Category */}
                  <Table.Cell className="py-4">
                    <span className="px-2.5 py-1 text-xs font-medium bg-zinc-800 text-zinc-300 rounded-md capitalize">
                      {item.category}
                    </span>
                  </Table.Cell>

                  {/* Price */}
                  <Table.Cell className="py-4">
                    <span className="text-sm font-semibold text-emerald-400">
                      ৳{Number(item.price).toLocaleString()}
                    </span>
                  </Table.Cell>

                  {/* View Details & Delete Actions from Screenshot 2026-06-27 154132.png */}
                  <Table.Cell className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                    <Link
                    href={`/classes/${item.postId}`}>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 min-w-8 w-8 h-8"
                        aria-label="View Details"
                        onClick={() =>
                          console.log("View item details:", item.postId)
                        }
                      >
                        <Eye width={16} height={16} />
                      </Button>
                    </Link>

                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-zinc-500 hover:text-red-400 hover:bg-red-950/30 min-w-8 w-8 h-8"
                        aria-label="Delete Favorite"
                        onClick={() => console.log("Delete item:", item._id)}
                      >
                        <TrashBin width={16} height={16} />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
