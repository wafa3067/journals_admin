"use client";
import { useState } from "react";

type CarouselProps<T> = {
  items: T[];
  itemsPerPage?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
};

export default function Carousel<T>({
  items,
  itemsPerPage = 3,
  renderItem,
}: CarouselProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const next = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const prev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div className="w-full">
      {/* Slider */}
      <div className="overflow-hidden relative ">
        <div
          className="flex transition-transform duration-500 ease-in-out  "
          style={{
            transform: `translateX(-${currentPage * 100}%)`,
          }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => {
            const start = pageIndex * itemsPerPage;
            const pageItems = items.slice(start, start + itemsPerPage);

            return (
              <div key={pageIndex} className="w-full flex-shrink-0 flex     ">
                {pageItems.map((item, i) => renderItem(item, i))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mt-4 relative">
        {/* Prev */}
        <button onClick={prev} className="text-3xl px-3 py-1 text-gray-400">
          &#8249;
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-3 h-3 rounded-full ${
                i === currentPage ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Next */}
        <button onClick={next} className="text-3xl px-3 py-1 text-gray-400">
          &#8250;
        </button>
      </div>
    </div>
  );
}
