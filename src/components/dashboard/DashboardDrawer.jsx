'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useOverlayState } from "@heroui/react"; // ✅ correct v3 hook
import {
  LayoutSideContent, House, Magnifier, FolderPlus,
  Person, Bookmark, ChartPie, CreditCard, Envelope, Gear
} from "@gravity-ui/icons";
import { Button, Drawer, Skeleton } from "@heroui/react";

export function DashboardDrawer() {
  const pathname = usePathname();
  const drawerState = useOverlayState({ defaultOpen: false }); // ✅ v3 pattern

  const { data: session, isPending } = authClient.useSession();
  const role = session?.user?.role || "user";

  const routesConfig = {
    user: [
      { icon: House,     href: "/dashboard/user",           label: "Overview" },
      { icon: Magnifier, href: "/dashboard/user/booked",    label: "Booked Classes" },
      { icon: ChartPie,  href: "/dashboard/user/apply",     label: "Apply As Trainer" },
      { icon: Bookmark,  href: "/dashboard/user/favorites", label: "Favorite Classes" },
    ],
    trainer: [
      { icon: House,      href: "/dashboard/trainer",            label: "Overview" },
      { icon: FolderPlus, href: "/dashboard/trainer/add-class",  label: "Add Class" },
      { icon: Magnifier,  href: "/dashboard/trainer/my-classes", label: "My Classes" },
      { icon: Envelope,   href: "/dashboard/trainer/add-post",   label: "Add Forum Post" },
      { icon: Person,     href: "/dashboard/trainer/my-posts",   label: "My Forum Posts" },
    ],
    admin: [
      { icon: House,      href: "/dashboard/admin",                  label: "Overview" },
      { icon: Person,     href: "/dashboard/admin/users",            label: "Manage Users" },
      
      { icon: Bookmark,   href: "/dashboard/admin/trainers",         label: "Manage Trainers" },
      { icon: FolderPlus, href: "/dashboard/admin/classes",          label: "Manage Classes" },
      { icon: Envelope,   href: "/dashboard/admin/add-post",         label: "Add Forum Post" },
      { icon: CreditCard, href: "/dashboard/admin/transactions",     label: "Transactions" },
      { icon: Gear,       href: "/dashboard/admin/manage-posts",     label: "Forum Moderation" },
    ],
  };

  const dynamicNavItems = routesConfig[role] ?? routesConfig.user;

  const navLinks = (
    <nav className="flex flex-col gap-1 w-full">
      {isPending ? (
        <div className="space-y-2.5 p-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 rounded-xl bg-default-100" />
          ))}
        </div>
      ) : (
        dynamicNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => drawerState.close()} // close drawer on nav
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 relative group ${
                isActive
                  ? "bg-primary text-[#00E5FF] font-semibold shadow-lg shadow-primary/20"
                  : "text-default-500 hover:bg-content2 hover:text-foreground"
              }`}
            >
              <item.icon
                className={`size-[18px] shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? "text-[#00E5FF]" : "text-primary"
                }`}
              />
              <span className="truncate">{item.label}</span>
              {isActive && (
                <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
              )}
            </Link>
          );
        })
      )}
    </nav>
  );

  const logoBlock = (
    <div className="flex items-center justify-between w-full">
      <span className="text-xl font-black tracking-wider text-foreground">
        PULSE<span className="text-primary">NEON</span>
      </span>
      {!isPending && (
        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-md font-bold">
          {role}
        </span>
      )}
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex w-60 shrink-0 h-screen sticky top-0 flex-col gap-5 border-r border-default-100 bg-content1/60 backdrop-blur-md px-5 py-6">
        {logoBlock}
        <hr className="border-default-100" />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {navLinks}
        </div>
      </aside>

      {/* ── Mobile sticky top bar ── */}
      {/* 
        HeroUI v3 bug workaround: Drawer must contain the trigger Button as its
        first child — external state.open() does not work reliably.
        So we put the mobile top bar INSIDE the Drawer's trigger slot.
      */}
      <div className="lg:hidden w-full sticky top-0 z-40">
        <Drawer state={drawerState} placement="left">
          {/* 
            ✅ v3 workaround: First child = trigger element.
            We wrap the Menu button so HeroUI's DialogTrigger picks it up correctly.
          */}
          <div className="w-full bg-content1/80 backdrop-blur-md border-b border-default-100 px-4 py-3 flex items-center justify-between">
            <span className="text-lg font-black tracking-wider">
              PULSE<span className="text-primary">NEON</span>
            </span>
            {/* This Button acts as the Drawer trigger */}
            <Button
              variant="flat"
              color="primary"
              size="sm"
              className="font-semibold rounded-xl px-3 border border-primary/20"
              startContent={<LayoutSideContent className="size-4" />}
            >
              Menu
            </Button>
          </div>

          {/* ✅ v3 compound structure */}
          <Drawer.Backdrop>
            <Drawer.Content className="max-w-[270px] md:hidden bg-content1 border-r border-default-100">
              <Drawer.Dialog className="h-full flex flex-col">
                <Drawer.Header className="pt-7 px-5 flex flex-col gap-1 items-start">
                  {logoBlock}
                  <p className="text-xs text-default-400 font-normal mt-1">
                    Control Panel •{" "}
                    <span className="text-primary capitalize font-medium">{role}</span>
                  </p>
                </Drawer.Header>
                <Drawer.Body className="px-4 py-4 flex-1 overflow-y-auto">
                  {navLinks}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}