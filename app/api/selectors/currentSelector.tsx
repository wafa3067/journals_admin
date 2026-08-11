import { RootState } from "@/app/store/store";
import { createSelector } from "@reduxjs/toolkit";

// Select articles from the state
export const selectArticles = (state: RootState) => state.archive.data;

// Get the current year dynamically
const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

// Group by year → month and sort
export const selectCurrentFlat = createSelector(
  [selectArticles],
  (articles) => {
    const archive: Record<string, string[]> = {};

    articles.forEach((article) => {
      if (!article.createdAt) return;
      //console.log("Article createdAt:", article.createdAt);
      // Split the date into year and month
      const [year, month] = article.createdAt.split("-");

      // Only include articles from the current year or next year
      if (parseInt(year) !== currentYear && parseInt(year) !== nextYear) return;

      // Group articles by year and month
      if (!archive[year]) archive[year] = [];
      if (!archive[year].includes(month)) archive[year].push(month);
    });

    // Sort years in descending order and months in ascending order
    const sorted: Record<string, string[]> = {};
    Object.keys(archive)
      .sort((a, b) => Number(b) - Number(a)) // Sort years descending
      .forEach((year) => {
        sorted[year] = archive[year].sort((a, b) => Number(a) - Number(b)); // Sort months ascending
      });

    return sorted;
  },
);
