"use client";

import { useEffect } from "react";

export default function BlockBackNavigation() {
  useEffect(() => {
    // Add a history entry when the component mounts
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // Push the current page back into history
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
}
