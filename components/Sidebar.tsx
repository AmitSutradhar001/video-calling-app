"use client";

import React from "react";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className=" sticky rounded-md left-2 mt-20 h-screen w-fit hidden md:block  lg:w-[264px]">
      <div className=" fixed rounded-md border-white border-2 left-2 mt-20 bg-dark-1 flex h-screen w-fit max-sm:hidden lg:w-[264px]">
        <div className="flex flex-1 flex-col mt-14 ml-4 gap-4 text-white font-semibold">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.route || pathname.startsWith(`${link.route}/`);
            return (
              <Link
                href={link.route}
                key={link.lable}
                className={cn(
                  "flex gap-4 items-center p-4 rounded-lg justify-start ",
                  {
                    "bg-blue-500 mr-4": isActive,
                  }
                )}
              >
                <Image
                  src={link.imgUrl}
                  alt={link.lable}
                  width={24}
                  height={24}
                />
                {link.lable}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
