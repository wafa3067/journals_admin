import React from "react";

function CircularLoading() {
  return (
    <div className="flex w-full py-20 items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
    </div>
  );
}

export default CircularLoading;
