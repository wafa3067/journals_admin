import { BACKEND_URL } from "@/app/api/actions/articleActions";
import React from "react";

interface NewsCardProps {
  date: string;
  img?: string;
  title: string;
  description: string;
  link?: string;
  deleteHandler?: () => void;
  deleteButton?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  date,
  title,
  description,
  link,
  deleteButton = false,
  deleteHandler,
  img,
}) => {
  const safeLink = link && link.startsWith("http") ? link : `https://${link}`;
  return (
    <div className=" p-6  w-full mx-auto mb-1  ">
      {img && (
        <img
          src={`${BACKEND_URL}${img}`}
          alt="News"
          className="w-full h-110 object-cover mb-2 rounded"
        />
      )}
      <div className="flex flex-row justify-between items-center mb-1">
        <h2 className="text-sm md:text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-base  text-blue-900 mb-2">{date}</p>
      </div>

      <p className="text-gray-700">{description}</p>

      <a
        href={safeLink || "http://www.google.com"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline mt-4 inline-block"
      >
        Read more
      </a>
      {deleteButton && (
        <div className=" bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2 inline-block cursor-pointer">
          <button onClick={deleteHandler}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
