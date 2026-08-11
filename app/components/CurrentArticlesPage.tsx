"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { fetchArchiveArticles } from "@/app/api/slice/archiveSlice";
import { selectArticles } from "@/app/api/selectors/archiveSelectors";
import CustomText from "@/app/components/custom_text";
import Articles from "@/app/components/article";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GetSelectorArticle } from "../archive/[year]/[month]/page";

export default function CurrentMonthPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const articles = useAppSelector(selectArticles);
  const [filtered, setFiltered] = useState<GetSelectorArticle[]>([]);
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");

  const datePath = `${currentYear}/${currentMonth}/`; // Months are 0-indexed

  // Fetch all articles if not loaded
  useEffect(() => {
    dispatch(fetchArchiveArticles());
  }, [dispatch]);

  useEffect(() => {
    const filteredArticles = articles
      .filter((article) => article.createdAt) // must have createdAt
      .filter((article) => {
        const [y, m] = article.createdAt!.split("-");
        return y === `${currentYear}` && m === `${currentMonth}`;
      })
      .map((article) => ({
        id: article.id,
        section: article.section ?? "",
        previousPublished: article.previousPublished ?? "",
        fileType: article.fileType ?? "",
        refrencedUrl: article.refrencedUrl ?? "",
        textStyle: article.textStyle ?? "",
        textStylic: article.textStylic ?? "",
        comment: article.comment ?? "",
        copyright: article.copyright ?? "",
        privacypolicy: article.privacypolicy ?? "",
        pdf: article.pdf ?? "",
        pdfUrl: article.pdfUrl ?? "",
        finalFile: article.finalFile ?? null,
        status: article.status ?? "",
        user: article.user ?? "",
        approvedBy: article.approvedBy ?? "",
        prefix: article.prefix ?? "",
        title: article.title ?? "",
        subtitle: article.subtitle ?? "",
        underReviewComments: article.underReviewComments ?? "",
        abstracts: article.abstracts ?? "",
        keywords: article.keywords ?? "",
        userComments: article.userComments ?? "",
        referenceText: article.referenceText ?? "",
        userProductionComments: article.userProductionComments ?? "",
        productionComments: article.productionComments ?? "",
        createdAt: article.createdAt!,
        modifyCopyEditor: article.modifyCopyEditor,
        modifyProduction: article.modifyProduction,
      }));

    setFiltered(filteredArticles);
  }, [articles, currentYear, currentMonth]);

  if (!filtered.length)
    return <p className="p-6">No articles found for {datePath}</p>;
  return (
    <div className="w-[70%] md:w-full p-6">
      <div className=" md:w-[30%] shadow-sm rounded-2xl p-5">
        <Image
          className="h-50 w-50 "
          src={"/images/logoos.png"}
          height={100}
          width={70}
          objectFit="cover"
          alt={"no image"}
        />
        <h1 className="text-2xl font-bold mb-4">Vol {datePath}</h1>
      </div>

      <ul className="space-y-4">
        <CustomText
          style={"text-gray-400  font-bold  text-2xl  m-2 w-fit"}
          text={"Articles"}
        />

        {filtered.map((article) => (
          <Articles
            onClick={() => {
              // Assuming the handleClick function is inside a component

              const encodedPdfData = encodeURIComponent(article.pdfUrl); // Encode the pdfData
              router.push(`/viewpdf/${encodedPdfData}`); // Navigate to the URL with encoded data
            }}
            pdfUrl={article.pdfUrl}
            key={article.id}
            style1={"font-bold text-[#4b7d92]"}
            style2={"text-black w-[90%]"}
            title1={article.title}
            title12={article.subtitle}
            // cited={"123-130"}
          />
        ))}
      </ul>
    </div>
  );
}
