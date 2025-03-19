"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  MenuIcon,
  Share2Icon,
  UploadIcon,
  LucideLogOut,
  Home,
  ImageUpscale,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/social-share", icon: Share2Icon, label: "Image Uplode" },
  { href: "/video-uplode", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="drawer lg:drawer-open ">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <header className="w-full bg-base-200">
          <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-square btn-ghost drawer-button"
              >
                <MenuIcon />
              </label>
            </div>
            <div className="flex-1">
              <Link href="/" onClick={handleLogoClick}>
                <div className="btn btn-ghost normal-case text-2xl font-bold tracking-tight cursor-pointer">
                  ReSizeIt
                </div>
              </Link>
            </div>
            <div className="flex-none flex items-center space-x-4">
              {/* {user && (
                  <>
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full">
                        <img
                          src={user.imageUrl}
                          alt={
                            user.username || user.emailAddresses[0].emailAddress
                          }
                        />
                      </div>
                    </div>
                    <span className="text-sm truncate max-w-xs lg:max-w-md">
                      {user.username || user.emailAddresses[0].emailAddress}
                    </span>
                    <button
                      onClick={handleSignOut}
                      className="btn btn-ghost btn-circle"
                    >
                      <LogOutIcon className="h-6 w-6" />
                    </button>
                  </>
                )} */}

              <button
                onClick={handleSignOut}
                className="bg-red-500 flex gap-2 py-3 px-3 rounded-2xl hover:bg-red-400 hover:cursor-pointer"
              >
                Logout <LucideLogOut />
              </button>
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
            {children}
          </div>
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="bg-base-200 w-64 h-full flex flex-col">
          <div className="flex items-center justify-center py-4">
            <ImageUpscale className="w-10 h-10 text-primary" />
          </div>
          <ul className="menu p-4 w-full text-base-content flex-grow">
            {sidebarItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
                    pathname === item.href
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hover:bg-gray-400 w-fit mx-auto rounded-2xl mb-4">
            {user && (
              <div className="profile flex items-center space-x-2 px-1 py-1">
                <div>
                  <img
                    className="rounded-full w-10 h-10 "
                    src={user.imageUrl}
                    alt={user.username || user.emailAddresses[0].emailAddress}
                  />
                </div>
                <div>
                  <p>{user.fullName}</p>
                  <span className="text-sm truncate max-w-xs lg:max-w-md">
                    {user.username || user.emailAddresses[0].emailAddress}
                  </span>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
