"use client";

import React, { useState } from "react";
import { Table } from "@heroui/react";
import Image from "next/image";
import { CircleCheck, Xmark, ShieldUser, Persons } from '@gravity-ui/icons';
import { makeAdmin } from "@/lib/actions/api/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Changed to an inline default function export to satisfy Next.js page imports
export default function AdminUserManagePage({ AllUser }) {
  const [users, setUsers] = useState(AllUser);
const router=useRouter()
  // Helper formatting for join dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Helper colors for badges based on roles
  const getRoleBadgeStyles = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-purple-950 text-purple-300 border border-purple-800";
      case "recruiter":
        return "bg-neutral-800 text-neutral-100 border border-neutral-700";
      case "trainer":
        return "bg-blue-950 text-blue-300 border border-blue-800";
      default: // seeker
        return "bg-neutral-900 text-neutral-400 border border-neutral-800";
    }
  };

  // Action handlers to update state inline
  const handleToggleBlock = (userId, currentStatus) => {
    const nextStatus = currentStatus === "Blocked" ? "Active" : "Blocked";
    setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: nextStatus } : u));
    

  };

  const handleMakeAdmin =async (user) => {
     const role="admin"
    const id=user?._id
  
    console.log(id,role)
    
    const admin=await makeAdmin(id)
    if(admin){
      toast.success("make admin success")
      router.refresh()
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-neutral-200 p-6 md:p-10 font-sans">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            User Management
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Review, filter, and manage platform access for all users.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select className="bg-[#1e1e1e] border border-neutral-800 rounded-lg px-4 py-2 text-sm text-neutral-300 outline-none focus:border-neutral-600 transition-colors cursor-pointer">
            <option>All Roles</option>
            <option>Trainer</option>
            <option>Recruiter</option>
            <option>Seeker</option>
          </select>
          <button className="bg-white text-black font-medium text-sm px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors shadow-sm ml-auto sm:ml-0">
            Export List
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Card 1 */}
        <div className="bg-[#1a1a1a] border border-neutral-800/60 p-5 rounded-xl">
          <p className="text-xs font-medium text-neutral-400 tracking-wide uppercase">
            Total Active Users
          </p>
          <p className="text-2xl font-bold text-white mt-2">12,842</p>
          <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block mt-2">
            +12% vs last month
          </span>
        </div>
        {/* Card 2 */}
        <div className="bg-[#1a1a1a] border border-neutral-800/60 p-5 rounded-xl">
          <p className="text-xs font-medium text-neutral-400 tracking-wide uppercase">
            Recruiter Growth
          </p>
          <p className="text-2xl font-bold text-white mt-2">843</p>
          <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block mt-2">
            High demand
          </span>
        </div>
        {/* Card 3 */}
        <div className="bg-[#1a1a1a] border border-neutral-800/60 p-5 rounded-xl">
          <p className="text-xs font-medium text-neutral-400 tracking-wide uppercase">
            Suspended Accounts
          </p>
          <p className="text-2xl font-bold text-white mt-2">124</p>
          <span className="text-xs text-neutral-400 inline-block mt-2">
            0.8% of total
          </span>
        </div>
        {/* Card 4 */}
        <div className="bg-[#1a1a1a] border border-neutral-800/60 p-5 rounded-xl">
          <p className="text-xs font-medium text-neutral-400 tracking-wide uppercase">
            New Signups (24h)
          </p>
          <p className="text-2xl font-bold text-white mt-2">42</p>
          <span className="text-xs font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full inline-block mt-2">
            Steady activity
          </span>
        </div>
      </div>

      {/* Main Table Layout */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
        <Table className="w-full text-left border-collapse">
          <Table.ScrollContainer>
            <Table.Content aria-label="User administration table">
              <Table.Header className="bg-[#1e1e1e] border-b border-neutral-800 text-xs font-medium text-neutral-400 tracking-wider">
                <Table.Column isRowHeader allowsSorting className="p-4">
                  User Name
                </Table.Column>
                <Table.Column className="p-4">Email Address</Table.Column>
                <Table.Column className="p-4">Role</Table.Column>
                <Table.Column className="p-4">Join Date</Table.Column>
                <Table.Column className="p-4">Status</Table.Column>
                <Table.Column className="p-4 text-right">Actions</Table.Column>
              </Table.Header>

              <Table.Body>
                {users.map((user) => {
                  const isBlocked = user.status === "Blocked";
                  const isAdmin = user.role?.toLowerCase() === "admin";

                  return (
                    <Table.Row
                      key={user._id}
                      className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition-colors"
                    >
                      {/* Name with Image / Initials Avatar */}
                      <Table.Cell className="p-4 flex items-center gap-3">
                        {user.image ? (
                          <Image
                            width={"30"}
                            height={"30"}
                            src={user?.image}
                            alt={user?.name}
                            className="w-9 h-9 rounded-full object-cover border border-neutral-700"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-semibold text-neutral-300 border border-neutral-700">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        )}
                        <span className="font-medium text-sm text-neutral-100">
                          {user.name}
                        </span>
                      </Table.Cell>

                      {/* Email Code */}
                      <Table.Cell className="p-4 text-sm text-neutral-400">
                        {user.email}
                      </Table.Cell>

                      {/* Role Pill */}
                      <Table.Cell className="p-4">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-md capitalize font-medium ${getRoleBadgeStyles(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </Table.Cell>

                      {/* Formatted Date */}
                      <Table.Cell className="p-4 text-sm text-neutral-400">
                        {formatDate(user.createdAt)}
                      </Table.Cell>

                      {/* Status indicators */}
                      <Table.Cell className="p-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${isBlocked ? "bg-red-500" : "bg-emerald-500"}`}
                          />
                          <span
                            className={`text-xs font-medium ${isBlocked ? "text-red-400" : "text-emerald-400"}`}
                          >
                            {isBlocked ? "Blocked" : "Active"}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell className="p-4 text-sm text-right font-medium">
                        <div className="flex items-center justify-end gap-3 text-xs">
                          
                          <button 
                            onClick={() => handleToggleBlock(user._id, user.status)}
                            className={`flex items-center gap-1 transition-colors hover:underline ${isBlocked ? "text-emerald-400" : "text-red-500"}`}
                          >
                            {isBlocked ? (
                              <>
                                <CircleCheck className="w-3.5 h-3.5" />
                                Unblock
                              </>
                            ) : (
                              <>
                                <Xmark className="w-3.5 h-3.5" />
                                Block
                              </>
                            )}
                          </button>

                          {!isAdmin && (
                            <button 
                              onClick={() => handleMakeAdmin(user)}
                              className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
                            >
                              <Persons className="w-3.5 h-3.5 text-purple-400" />
                              Make Admin
                            </button>
                          )}

                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>

          {/* Table Footer */}
          <Table.Footer>
            <div className="flex items-center justify-between p-4 bg-[#1a1a1a] border-t border-neutral-800 text-xs text-neutral-400">
              <div>
                Showing <span className="text-white">1 to 4</span> of{" "}
                <span className="text-white">12,842</span> users
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 px-2 rounded hover:bg-neutral-800 text-neutral-500 hover:text-neutral-300 cursor-not-allowed">
                  &lt;
                </button>
                <button className="w-6 h-6 rounded bg-white text-black font-semibold flex items-center justify-center">
                  1
                </button>
                <button className="w-6 h-6 rounded hover:bg-neutral-800 flex items-center justify-center transition-colors">
                  2
                </button>
                <button className="w-6 h-6 rounded hover:bg-neutral-800 flex items-center justify-center transition-colors">
                  3
                </button>
                <span className="px-1 text-neutral-600">...</span>
                <button className="w-6 h-6 rounded hover:bg-neutral-800 flex items-center justify-center transition-colors">
                  1285
                </button>
                <button className="p-1 px-2 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors">
                  &gt;
                </button>
              </div>
            </div>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}