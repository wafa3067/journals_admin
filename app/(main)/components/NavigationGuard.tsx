"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const publicRoutes = [
  "/",
  "/home",
  "/contact",
  "/about",
  "/login",
  "/register",
];

const protectedRoutes = ["/wallet", "/orders", "/settings"];

export default function NavigationGuard() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isPublicRoute = publicRoutes.some(
      (route) =>
        pathname === route ||
        (route !== "/" && pathname.startsWith(`${route}/`)),
    );

    if (isPublicRoute) return;

    const isProtectedRoute = protectedRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );

    if (!isProtectedRoute) return;

    const navigationAllowed =
      sessionStorage.getItem("navigation_allowed") === "true";

    if (!navigationAllowed) {
      router.replace("/");
      return;
    }

    sessionStorage.removeItem("navigation_allowed");
  }, [pathname, router]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (
        link &&
        link.origin === window.location.origin &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey &&
        event.button === 0
      ) {
        sessionStorage.setItem("navigation_allowed", "true");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
