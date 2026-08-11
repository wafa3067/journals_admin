import { RootState } from "@/app/store/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectArticles = (state: RootState) => state.archive.data;

// Group by year → month
export const selectArchiveFlat = createSelector(
  [selectArticles],
  (articles) => {
    const archive: Record<string, string[]> = {};

    articles.forEach((article) => {
      if (!article.createdAt) return;
      const [year, month] = article.createdAt.split("-");

      if (!archive[year]) archive[year] = [];
      if (!archive[year].includes(month)) archive[year].push(month);
    });

    // Sort years descending and months ascending
    const sorted: Record<string, string[]> = {};
    Object.keys(archive)
      .sort((a, b) => Number(b) - Number(a))
      .forEach((year) => {
        sorted[year] = archive[year].sort((a, b) => Number(a) - Number(b));
      });

    return sorted;
  }
);
