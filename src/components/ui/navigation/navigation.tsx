"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    href: "/",
    title: "Home",
  },
  {
    href: "/todo",
    title: "To-do list",
  },
  {
    href: "/users",
    title: "Users",
  },
  {
    href: "/weather",
    title: "Weather",
  },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-3 px-3 py-4 border-b-slate-400">
      {routes.map(({ title, href }) => {
        return (
          <Link
            key={href}
            href={href}
            className={`${
              href === pathname && "text-blue-600"
            } hover:text-blue-600`}
          >
            {title}
          </Link>
        );
      })}
    </nav>
  );
};
