"use client";

import React, { useState } from "react";
import { Table, Card, Avatar } from "@heroui/react";
// Assuming typical v3 icon imports or simple wrappers for GravityUI icons
import { Pencil,  Persons, TrashBin } from "@gravity-ui/icons";
import { deleteMyClass } from "@/lib/actions/api/class";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const TrainerClassDashboard = ({ classes }) => {
  const [activeTab, setActiveTab] = useState("all");
  const router=useRouter()

  // Filter based on your screenshot's "Active/Closed" tabs model
  console.log(classes)
  const filteredClasses = classes.filter((item) => {
    if (activeTab === "approved") return item.status === "approved";
    if (activeTab === "pending") return item.status === "pending";
    return true;
  });

  const handleDelete =async (data) => {
  
    
    const deleteById=await deleteMyClass(data)
    if(deleteById){
        toast.error("delete one")
        router.refresh()
    }
  };

  const handleViewStudents =async (classId) => {
    alert(`Opening attendees modal for class ID: ${classId}`);
    // Trigger your HeroUI Dialog/Modal state here
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#18181b] p-4 rounded-xl border border-zinc-800">
        <div className="flex items-center gap-2 bg-[#27272a] p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "all" ? "bg-[#18181b] text-white shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            All Classes ({classes.length})
          </button>
          <button
            onClick={() => setActiveTab("approved")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "approved" ? "bg-[#18181b] text-white shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "pending" ? "bg-[#18181b] text-white shadow" : "text-zinc-400 hover:text-white"
            }`}
          >
            Pending
          </button>
        </div>

        <button className="bg-white hover:bg-zinc-200 text-black font-semibold text-sm px-4 py-2.5 rounded-lg inline-flex items-center gap-2 transition-all">
          + Create New Class
        </button>
      </div>

      {/* Main Responsive Layout wrapper */}
      <Card className="bg-[#121214] border border-zinc-800 text-white shadow-2xl overflow-hidden">
        <Card.Header className="border-b border-zinc-800 p-6 flex flex-col gap-1">
          <Card.Title className="text-xl font-bold tracking-tight text-zinc-100">Class Master List</Card.Title>
          <Card.Description className="text-sm text-zinc-400">
            Manage your schedule, update course details, and view current attendee enrollments.
          </Card.Description>
        </Card.Header>

        <Card.Content className="p-0">
          {filteredClasses.length === 0 ? (
            <div className="text-center py-12 text-zinc-500">No classes found matching this filter.</div>
          ) : (
            <Table className="w-full">
              <Table.ScrollContainer>
                <Table.Content aria-label="Trainer managed classes table">
                  <Table.Header className="bg-[#1c1c1f] text-zinc-300 font-semibold border-b border-zinc-800">
                    <Table.Column isRowHeader  className="p-4 text-left">Class & Category</Table.Column>
                    <Table.Column className="p-4 text-left">Difficulty & Price</Table.Column>
                    <Table.Column className="p-4 text-left">Schedule</Table.Column>
                    <Table.Column className="p-4 text-center">Status</Table.Column>
                    <Table.Column className="p-4 text-center">Actions</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {filteredClasses.map((item) => (
                      <Table.Row key={item._id} className="border-b border-zinc-900 hover:bg-[#1c1c1f]/50 transition-colors">
                        {/* Class Info */}
                        <Table.Cell className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12 rounded-lg border border-zinc-700 bg-zinc-800">
                              <Avatar.Image src={item.imageUrl} alt={item.className} className="object-cover" />
                              <Avatar.Fallback className="text-zinc-400">{item.className.charAt(0)}</Avatar.Fallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold text-white text-base">{item.className}</div>
                              <div className="text-xs text-zinc-400 capitalize bg-zinc-800 px-2 py-0.5 rounded-full inline-block mt-1">
                                {item.category}
                              </div>
                            </div>
                          </div>
                        </Table.Cell>

                        {/* Difficulty & Price */}
                        <Table.Cell className="p-4">
                          <div className="text-sm text-zinc-200 capitalize font-medium">{item.difficulty}</div>
                          <div className="text-sm text-emerald-400 font-bold mt-0.5">${parseFloat(item.price).toLocaleString()}</div>
                        </Table.Cell>

                        {/* Schedule details */}
                        <Table.Cell className="p-4">
                          <div className="text-xs text-zinc-300 font-medium capitalize">
                            {item.scheduleDays.join(", ")}
                          </div>
                          <div className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                            <span>🕒 {item.scheduleTime}</span>
                            <span>• {item.duration}</span>
                          </div>
                        </Table.Cell>

                        {/* Custom status pill */}
                        <Table.Cell className="p-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                              item.status === "active"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${item.status === "active" ? "bg-emerald-400" : "bg-amber-400"}`} />
                            {item.status}
                          </span>
                        </Table.Cell>

                        {/* Interactive Buttons */}
                        <Table.Cell className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleViewStudents(item._id)}
                              className="p-2 text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors group"
                              title="View Students"
                            >
                              <Persons className="w-5 h-5" />
                            </button>
                            <button
                              className="p-2 text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
                              title="Update Class"
                            >
                              <Pencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(item)}
                              className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                              title="Delete Class"
                            >
                              <TrashBin className="w-5 h-5" />
                            </button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
              <Table.Footer className="p-4 border-t border-zinc-800 text-xs text-zinc-400 flex justify-between items-center bg-[#151518]">
                <div>
                  Showing 1-{filteredClasses.length} of {filteredClasses.length} items
                </div>
              </Table.Footer>
            </Table>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default TrainerClassDashboard;