"use client";

import { useLenis } from "@/components/providers/smooth-scroll-provider";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navigation() {
  const lenis = useLenis();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    lenis?.scrollTo(href);
  };

  return (
    <nav className="glass-light fixed top-0 z-50 flex w-full items-center justify-center gap-8 px-6 py-4">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => handleClick(e, item.href)}
          className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
