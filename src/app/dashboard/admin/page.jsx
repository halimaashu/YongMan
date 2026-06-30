import React from "react";
import { Card, Avatar, Badge } from "@heroui/react";
import {
  Persons,
  Layers3Diagonal,
  Receipt,
  ShieldCheck,
  Calendar,
  Gear,
} from "@gravity-ui/icons";

import { allTransition } from "@/lib/actions/api/bookedClass";
import { getAllClass } from "@/lib/actions/api/class";
import { GetAllUsers } from "@/lib/actions/api/user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AdminDashboardChart from "@/components/admin/trainer/AdminDashboardChart";

const Page = async () => {
  // Fetch platform data
  const allUser = await GetAllUsers();
  const allClass = await getAllClass();
  const allBookedClass = await allTransition();

  const totalUsers = allUser?.length || 0;
  const totalClasses = allClass?.length || 0;
  const totalBooked = allBookedClass?.length || 0;

  // Fetch Session Data
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const admin = session?.user;
  console.log(admin);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 animate-fade-in">
      {/* HEADER SECTION: Redesigned for crisp mobile wrapping and clean geometry */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 p-6 rounded-2xl sm:rounded-3xl bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-xl">
        {/* Profile Card Compound Block */}
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left gap-4 w-full min-w-0">
          <div>
            <Avatar>
              <Avatar.Image alt="John Doe" src={admin?.image} />
              <Avatar.Fallback>{admin.name[0]}</Avatar.Fallback>
            </Avatar>
            <h1 className="text-2xl font-bold">
              <span className="text-green-600">Hi </span>
              {admin.name}
            </h1>
            {/* <Badge>
              {admin.role}
            </Badge> */}
            <h1 className="text-blue-500 font-bold">{admin?.role}</h1>
          </div>
        </div>

        {/* Action Widgets Toolbar: Shifts position elegantly depending on layout layout */}
        <div className="flex sm:flex-col justify-center sm:items-end gap-2 text-xs border-t border-zinc-800/60 pt-4 sm:pt-0 sm:border-0 w-full sm:w-auto flex-shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700/50">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-300 font-medium whitespace-nowrap">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="hidden sm:block p-2 rounded-xl bg-zinc-800 border border-zinc-700/50 cursor-pointer hover:bg-zinc-700 hover:text-white transition-all">
            <Gear className="w-4 h-4 text-zinc-400" />
          </div>
        </div>
      </header>

      {/* PLATFORM STATISTICS GRID */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* STAT CARD: TOTAL USERS */}
        <Card className="border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
          <Card.Header className="flex flex-row items-start justify-between pb-2 p-4 sm:p-6">
            <div className="space-y-1">
              <Card.Title className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Total Users
              </Card.Title>
              <Card.Description className="text-xs text-zinc-400 dark:text-zinc-500">
                Registered customer accounts
              </Card.Description>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              <Persons className="w-5 h-5" />
            </div>
          </Card.Header>
          <Card.Content className="px-4 sm:px-6 py-2">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {totalUsers.toLocaleString()}
            </span>
          </Card.Content>
          <Card.Footer className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800/60 py-2.5 px-4 sm:px-6 text-[11px] text-zinc-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block mr-1"></span>
            System Live
          </Card.Footer>
        </Card>

        {/* STAT CARD: TOTAL CLASSES */}
        <Card className="border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
          <Card.Header className="flex flex-row items-start justify-between pb-2 p-4 sm:p-6">
            <div className="space-y-1">
              <Card.Title className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Total Classes
              </Card.Title>
              <Card.Description className="text-xs text-zinc-400 dark:text-zinc-500">
                Created courses & events
              </Card.Description>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              <Layers3Diagonal className="w-5 h-5" />
            </div>
          </Card.Header>
          <Card.Content className="px-4 sm:px-6 py-2">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {totalClasses.toLocaleString()}
            </span>
          </Card.Content>
          <Card.Footer className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800/60 py-2.5 px-4 sm:px-6 text-[11px] text-zinc-400 flex items-center gap-1">
            Active global catalog
          </Card.Footer>
        </Card>

        {/* STAT CARD: TOTAL BOOKED CLASSES */}
        <Card className="border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden col-span-1 sm:col-span-2 lg:col-span-1">
          <Card.Header className="flex flex-row items-start justify-between pb-2 p-4 sm:p-6">
            <div className="space-y-1">
              <Card.Title className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Booked Classes
              </Card.Title>
              <Card.Description className="text-xs text-zinc-400 dark:text-zinc-500">
                Successfully processed entries
              </Card.Description>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              <Receipt className="w-5 h-5" />
            </div>
          </Card.Header>
          <Card.Content className="px-4 sm:px-6 py-2">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {totalBooked.toLocaleString()}
            </span>
          </Card.Content>
          <Card.Footer className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800/60 py-2.5 px-4 sm:px-6 text-[11px] text-zinc-400 flex items-center gap-1">
            Reservations completed
          </Card.Footer>
        </Card>
      </main>
      {/* chart */}
      <div className="max-w-lg mx-auto">
        <AdminDashboardChart
          users={totalUsers}
          classes={totalClasses}
          bookings={totalBooked}
        />
      </div>
    </div>
  );
};

export default Page;
