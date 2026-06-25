'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useOverlayState } from "@heroui/react"; // HeroUI v3 native overlay hook
import {
  LayoutSideContent,
  House,
  Magnifier,
  FolderPlus,
  Person,
  Bookmark,
  ChartPie,
  CreditCard,
  Envelope,
  Gear
} from "@gravity-ui/icons";
import { 
  Button, 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerBody,
  Skeleton
} from "@heroui/react";

export function DashboardDrawer() {
  const pathname = usePathname();
  
  // Initialize the HeroUI v3 state controller
  const sidebarDrawerState = useOverlayState();
  
  const { data: session, isPending } = authClient.useSession();
  const role = session?.user?.role || "user"; 

  // Mapped explicitly by assignment spec criteria
  const routesConfig = {
    user: [
      { icon: House, href: "/dashboard/user", label: "Overview" },
      { icon: Magnifier, href: "/dashboard/user/booked", label: "Booked Classes" },
      { icon: ChartPie, href: "/dashboard/user/apply", label: "Apply As Trainer" },
      { icon: Bookmark, href: "/dashboard/user/favorites", label: "Favorite Classes" },
    ],
    trainer: [
      { icon: House, href: "/dashboard/trainer", label: "Overview" },
      { icon: FolderPlus, href: "/dashboard/trainer/add-class", label: "Add Class" },
      { icon: Magnifier, href: "/dashboard/trainer/my-classes", label: "My Classes" },
      { icon: Envelope, href: "/dashboard/trainer/add-post", label: "Add Forum Post" },
      { icon: Person, href: "/dashboard/trainer/my-posts", label: "My Forum Posts" },
    ],
    admin: [
      { icon: House, href: "/dashboard/admin", label: "Overview" },
      { icon: Person, href: "/dashboard/admin/users", label: "Manage Users" },
      { icon: ChartPie, href: "/dashboard/admin/applied-trainers", label: "Applied Trainers" }, // Fixed missing TrendingUp reference
      { icon: Bookmark, href: "/dashboard/admin/trainers", label: "Manage Trainers" },
      { icon: FolderPlus, href: "/dashboard/admin/classes", label: "Manage Classes" },
      { icon: Envelope, href: "/dashboard/admin/add-post", label: "Add Forum Post" },
      { icon: CreditCard, href: "/dashboard/admin/transactions", label: "Transactions" },
      { icon: Gear, href: "/dashboard/admin/manage-posts", label: "Forum Moderation" },
    ]
  };

  const dynamicNavItems = routesConfig[role] || routesConfig.user;

  // Shared Navigation Template
  const navLinks = (
    <nav className="flex flex-col gap-1.5 w-full">
      {isPending ? (
        <div className="space-y-3 p-2">
          <Skeleton className="h-10 rounded-xl bg-default-100" />
          <Skeleton className="h-10 rounded-xl bg-default-100 w-11/12" />
          <Skeleton className="h-10 rounded-xl bg-default-100 w-10/12" />
        </div>
      ) : (
        dynamicNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => sidebarDrawerState.close()} // Auto-closes mobile drawer on navigation click
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 relative group ${
                isActive
                  ? "bg-primary text-[#00E5FF] font-semibold shadow-lg shadow-primary/20"
                  : "text-default-600 hover:bg-content2 hover:text-foreground"
              }`}
            >
              <item.icon className={`size-5 transition-transform group-hover:scale-105 ${isActive ? "text-[#00E5FF]" : "text-primary"}`} />
              <span>{item.label}</span>
              
              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-black" />
              )}
            </Link>
          );
        })
      )}
    </nav>
  );

  return (
    <>
      {/* Persistent Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 h-screen sticky top-0 flex-col gap-6 border-r border-default-100 bg-content1/50 backdrop-blur-md px-6 py-6 shadow-sm">
        <div className="flex items-center justify-between px-2 pb-2">
          <div className="text-xl font-black tracking-wider text-foreground">
            PULSE<span className="text-primary">NEON</span>
          </div>
          {!isPending && (
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-md font-bold">
              {role}
            </span>
          )}
        </div>
        <hr className="border-default-100" />
        <div className="flex-1 overflow-y-auto pr-1 select-none">
          {navLinks}
        </div>
      </aside>

      {/* Floating Mobile Sticky Navigation Bar */}
      <div className="lg:hidden w-full bg-content1/80 backdrop-blur-md border-b border-default-100 px-5 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <span className="text-xl font-black tracking-wider text-foreground">
          PULSE<span className="text-primary">NEON</span>
        </span>
        <Button 
          variant="flat"
          color="primary" 
          size="sm" 
          onPress={() => sidebarDrawerState.open()}
          className="font-bold rounded-xl px-4 border border-primary/20"
          startContent={<LayoutSideContent className="size-4" />}
        >
          Menu
        </Button>
      </div>

      {/* HeroUI v3 Modern Native Overlay Drawer Layout */}
      <Drawer 
        state={sidebarDrawerState} // Correct HeroUI v3 state hook wiring
        placement="left"
        size="xs"
        backdrop="blur"
        classNames={{
          base: "bg-content1 border-r border-default-100 max-w-[280px]",
        }}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1 pt-8 px-6">
                <div className="text-2xl font-black tracking-wider text-foreground">
                  PULSE<span className="text-primary">NEON</span>
                </div>
                <p className="text-xs text-default-400 font-normal">
                  Control Panel Layout • <span className="text-primary capitalize font-medium">{role}</span>
                </p>
              </DrawerHeader>
              <DrawerBody className="px-4 py-6">
                {navLinks}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}