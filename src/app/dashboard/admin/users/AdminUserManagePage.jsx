"use client";

import React, { useState } from 'react';
import { Table } from '@heroui/react';

// Mock data array based on your exact object schema
const mockUsers = [
  {
    "_id": "6a3e72af6ce31aff545d4b33",
    "name": "Jordan Davis",
    "email": "jordan.davis@example.com",
    "emailVerified": true,
    "image": "https://i.ibb.co/zVzCxbzd/6695678961f8.png",
    "createdAt": "2023-10-12T12:38:07.568Z",
    "updatedAt": "2023-10-12T12:38:07.568Z",
    "role": "seeker", // matches UI example types
    "plan": "free"
  },
  {
    "_id": "6a3e72af6ce31aff545d4b34",
    "name": "Elena Rodriguez",
    "email": "elena.r@talentflow.io",
    "emailVerified": true,
    "image": "", 
    "createdAt": "2023-09-28T12:38:07.568Z",
    "updatedAt": "2023-09-28T12:38:07.568Z",
    "role": "recruiter",
    "plan": "premium"
  },
  {
    "_id": "6a3e72af6ce31aff545d4b35",
    "name": "Marcus Webb",
    "email": "m.webb@outlook.com",
    "emailVerified": false,
    "image": "",
    "createdAt": "2023-08-05T12:38:07.568Z",
    "updatedAt": "2023-08-05T12:38:07.568Z",
    "role": "suspended", // tracking suspended status natively
    "plan": "free"
  },
  {
    "_id": "6a3e72af6ce31aff545d4b36",
    "name": "Tom Hiddleston",
    "email": "t.hiddles@loki-tech.com",
    "emailVerified": true,
    "image": "",
    "createdAt": "2023-11-01T12:38:07.568Z",
    "updatedAt": "2023-11-01T12:38:07.568Z",
    "role": "recruiter",
    "plan": "pro"
  }
];

const AdminUserManagePage = ({AllUser}) => {
  const [users, setUsers] = useState(AllUser);

  // Helper formatting for join dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  // Helper colors for badges based on roles
  const getRoleBadgeStyles = (role) => {
    switch (role?.toLowerCase()) {
      case 'recruiter':
        return 'bg-neutral-800 text-neutral-100 border border-neutral-700';
      case 'trainer':
        return 'bg-blue-950 text-blue-300 border border-blue-800';
      default: // seeker
        return 'bg-neutral-900 text-neutral-400 border border-neutral-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-neutral-200 p-6 md:p-10 font-sans">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">User Management</h1>
          <p className="text-sm text-neutral-400 mt-1">Review, filter, and manage platform access for all users.</p>
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
          <p className="text-xs font-medium text-neutral-400 tracking-wide uppercase">Total Active Users</p>
          <p className="text-2xl font-bold text-white mt-2">12,842</p>
          <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block mt-2">
            +12% vs last month
          </span>
        </div>
        {/* Card 2 */}
        <div className="bg-[#1a1a1a] border border-neutral-800/60 p-5 rounded-xl">
          <p className="text-xs font-medium text-neutral-400 tracking-wide uppercase">Recruiter Growth</p>
          <p className="text-2xl font-bold text-white mt-2">843</p>
          <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block mt-2">
            High demand
          </span>
        </div>
        {/* Card 3 */}
        <div className="bg-[#1a1a1a] border border-neutral-800/60 p-5 rounded-xl">
          <p className="text-xs font-medium text-neutral-400 tracking-wide uppercase">Suspended Accounts</p>
          <p className="text-2xl font-bold text-white mt-2">124</p>
          <span className="text-xs text-neutral-400 inline-block mt-2">
            0.8% of total
          </span>
        </div>
        {/* Card 4 */}
        <div className="bg-[#1a1a1a] border border-neutral-800/60 p-5 rounded-xl">
          <p className="text-xs font-medium text-neutral-400 tracking-wide uppercase">New Signups (24h)</p>
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
                <Table.Column isRowHeader allowsSorting className="p-4">User Name</Table.Column>
                <Table.Column className="p-4">Email Address</Table.Column>
                <Table.Column className="p-4">Role</Table.Column>
                <Table.Column className="p-4">Join Date</Table.Column>
                <Table.Column className="p-4">Status</Table.Column>
                <Table.Column className="p-4 text-right">Actions</Table.Column>
              </Table.Header>

              <Table.Body>
                {users.map((user) => {
                  const isSuspended = user.role === 'suspended';
                  
                  return (
                    <Table.Row key={user._id} className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition-colors">
                      
                      {/* Name with Image / Initials Avatar */}
                      <Table.Cell className="p-4 flex items-center gap-3">
                        {user.image ? (
                          <img 
                            src={user.image} 
                            alt={user.name} 
                            className="w-9 h-9 rounded-full object-cover border border-neutral-700" 
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-semibold text-neutral-300 border border-neutral-700">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <span className="font-medium text-sm text-neutral-100">{user.name}</span>
                      </Table.Cell>

                      {/* Email Code */}
                      <Table.Cell className="p-4 text-sm text-neutral-400">
                        {user.email}
                      </Table.Cell>

                      {/* Role Pill */}
                      <Table.Cell className="p-4">
                        {!isSuspended ? (
                          <span className={`text-xs px-2.5 py-1 rounded-md capitalize font-medium ${getRoleBadgeStyles(user.role)}`}>
                            {user.role}
                          </span>
                        ) : (
                          <span className="text-xs px-2.5 py-1 rounded-md bg-neutral-900 text-neutral-500 border border-neutral-800/80">
                            —
                          </span>
                        )}
                      </Table.Cell>

                      {/* Formatted Date */}
                      <Table.Cell className="p-4 text-sm text-neutral-400">
                        {formatDate(user.createdAt)}
                      </Table.Cell>

                      {/* Status pill status indicators */}
                      <Table.Cell className="p-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${isSuspended ? 'bg-red-500' : 'bg-emerald-500'}`} />
                          <span className={`text-xs font-medium ${isSuspended ? 'text-red-400' : 'text-emerald-400'}`}>
                            {isSuspended ? 'Suspended' : 'Active'}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Action Triggers matching Layout */}
                      <Table.Cell className="p-4 text-sm text-right font-medium">
                        <div className="flex items-center justify-end gap-3 text-xs">
                          {isSuspended ? (
                            <>
                              <button className="text-emerald-400 hover:underline">Activate</button>
                              <button className="text-neutral-500 hover:text-red-400 transition-colors">Delete</button>
                            </>
                          ) : (
                            <>
                              <button className="text-neutral-400 hover:text-white transition-colors">
                                {user.role === 'recruiter' ? 'Make Seeker' : 'Make Recruiter'}
                              </button>
                              <button className="text-red-500 hover:underline">Suspend</button>
                            </>
                          )}
                        </div>
                      </Table.Cell>

                    </Table.Row>
                  );
                })}
              </Table.Body>

            </Table.Content>
          </Table.ScrollContainer>

          {/* Table Footer with exact pagination alignment styling */}
          <Table.Footer>
            <div className="flex items-center justify-between p-4 bg-[#1a1a1a] border-t border-neutral-800 text-xs text-neutral-400">
              <div>
                Showing <span className="text-white">1 to 4</span> of <span className="text-white">12,842</span> users
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 px-2 rounded hover:bg-neutral-800 text-neutral-500 hover:text-neutral-300 cursor-not-allowed">
                  &lt;
                </button>
                <button className="w-6 h-6 rounded bg-white text-black font-semibold flex items-center justify-center">1</button>
                <button className="w-6 h-6 rounded hover:bg-neutral-800 flex items-center justify-center transition-colors">2</button>
                <button className="w-6 h-6 rounded hover:bg-neutral-800 flex items-center justify-center transition-colors">3</button>
                <span className="px-1 text-neutral-600">...</span>
                <button className="w-6 h-6 rounded hover:bg-neutral-800 flex items-center justify-center transition-colors">1285</button>
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
};

export default AdminUserManagePage;