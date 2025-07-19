"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION_BAR_ROUTES } from "./constants";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav
      className={
        "flex items-center gap-3 px-3 border-b-slate-400 h-[var(--navbar-height)] shadow-"
      }
    >
      {NAVIGATION_BAR_ROUTES.map(({ title, href }) => {
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
