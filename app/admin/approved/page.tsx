"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../api/hooks/hooks";
import {
  fetchPendingArticles,
  assignReviewer,
  toggleDetails,
  Article,
} from "../adminSlice/pending";

import { fetchApproved } from "../adminSlice/approved";
import AlertInputDialog from "../components/alert_input";
import { rejectArticleStatus } from "../adminSlice/rejectArticalStatusSlice";
import { useAlert } from "@/app/components/AlertProvider";
import QuillViewer from "@/app/components/rectquilviwer";

export default function PendingArticles() {
  const dispatch = useAppDispatch();
  const { articles, loading } = useAppSelector((state) => state.approved);

  // Local state for reviewer inputs
  const [reviewInputs, setReviewInputs] = useState<
    Record<number, { reviewer: string; start: string; end: string }>
  >({});

  useEffect(() => {
    dispatch(fetchApproved());
  }, [dispatch]);

  const handleInputChange = (
    articleId: number,
    field: "reviewer" | "start" | "end",
    value: string,
  ) => {
    setReviewInputs((prev) => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        [field]: value,
      },
    }));
  };
  // const [successMessage, setSuccessMessage] = useState<string>("");
  const handleAssignReviewer = (article: Article) => {
    const input = reviewInputs[article.id] || {};
    if (!input.reviewer || !input.start || !input.end) {
      alert("Please fill all fields");
      return;
    }

    // dispatch(
    //   sendArticleEmail({
    //     toEmail: article.email,
    //     authorName: article.givenName,
    //     articleTitle: article.title,
    //     status: "Under Review",
    //   })
    // );
    dispatch(
      assignReviewer({
        articleId: article.id,
        reviewer: input.reviewer,
        start: input.start,
        end: input.end,
      }),
    );
    dispatch(fetchPendingArticles());
  };
  const { showAlert } = useAlert();

  const handleInput = (value: string, article: Article) => {
    dispatch(
      rejectArticleStatus({
        id: article.id,
        comments: value,
        status: "pending",
      }),
    ).then((response) => {
      showAlert(`Article rejected successfully! ${response}`);

      // setSuccessMessage("Reject Article Response:" + response);
    });
  };
  return (
    <main className="overflow-y-auto h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className=" md:bg-[#00b4d8] p-5 flex justify-center items-center ">
          <h1 className="text-sm font-bold flex items-center gap-2 text-black md:text-white">
            Approved Articles management
          </h1>
        </header>
        {loading ? (
          <p>Loading...</p>
        ) : articles.length === 0 ? (
          <div className="text-center p-4 bg-[#00b4d8] text-white rounded m-8">
            No Approved articles found.
          </div>
        ) : (
          <div className=" overflow-scroll h-[calc(100vh-110px)]">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow p-6 mb-6 transition-transform m-8 hover:-translate-y-1"
              >
                <div className="flex justify-between items-center mb-3">
                  <h5 className="text-lg font-semibold text-[#0096c7]">
                    {article.title}
                  </h5>
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
                    {article.status}
                  </span>
                </div>

                <p>
                  <strong>Submitted By:</strong> {article.givenName}
                  {article.familyName} | {article.email} | {article.affiliation}
                </p>
                <p>
                  <strong>Subtitle:</strong> {article.subtitle}
                </p>

                <button
                  className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => dispatch(toggleDetails(article.id))}
                >
                  {article.showDetails ? " Hide Details" : " Show Details"}
                </button>

                {article.showDetails && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <strong>Abstract:</strong>
                      <div className="bg-gray-100 p-3 rounded mt-1">
                        <QuillViewer value={article.abstracts ?? ""} />
                      </div>
                    </div>
                    <div>
                      <strong>Keywords:</strong> {article.keywords}
                    </div>
                    <div>
                      <strong>References:</strong>
                      <div className="bg-gray-100 p-3 rounded mt-1">
                        {article.referenceText}
                      </div>
                    </div>
                    <div>
                      <strong>PDF File:</strong>{" "}
                      <a
                        href={`/uploads/${article.pdfUrl}`}
                        target="_blank"
                        className="#00b4d8"
                        rel="noreferrer"
                      >
                        View PDF
                      </a>
                    </div>

                    {/* Reviewer Assignment */}
                    {article.status === "pending" && (
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Reviewer Name"
                          className="border rounded px-2 py-1 w-full"
                          value={reviewInputs[article.id]?.reviewer || ""}
                          onChange={(e) =>
                            handleInputChange(
                              article.id,
                              "reviewer",
                              e.target.value,
                            )
                          }
                        />
                        <input
                          type="date"
                          className="border rounded px-2 py-1 w-full"
                          value={reviewInputs[article.id]?.start || ""}
                          onChange={(e) =>
                            handleInputChange(
                              article.id,
                              "start",
                              e.target.value,
                            )
                          }
                        />
                        <input
                          type="date"
                          className="border rounded px-2 py-1 w-full"
                          value={reviewInputs[article.id]?.end || ""}
                          onChange={(e) =>
                            handleInputChange(article.id, "end", e.target.value)
                          }
                        />
                        <button
                          className="bg-[#00b4d8] text-white px-3 py-1 rounded hover:bg-[#00b4d8]"
                          onClick={() => handleAssignReviewer(article)}
                        >
                          Assign Reviewer
                        </button>
                      </div>
                    )}

                    <div className="mt-3 space-x-2">
                      {article.status === "Approved" && (
                        <div className="space-y-2  mb-4 ">
                          <input
                            type="text"
                            placeholder="CopyEditor Name"
                            className="border rounded px-2 py-1 w-full"
                            value={reviewInputs[article.id]?.reviewer || ""}
                            onChange={(e) =>
                              handleInputChange(
                                article.id,
                                "reviewer",
                                e.target.value,
                              )
                            }
                          />

                          <div className="flex flex-row gap-2">
                            <button
                              className="bg-[#00b4d8] text-white px-3 py-1 rounded hover:bg-[#00b4d8]"
                              onClick={() => handleAssignReviewer(article)}
                            >
                              Assign CopyEditor
                            </button>

                            <AlertInputDialog
                              bg="bg-red-400"
                              title="Recruit Reviewer"
                              description="Please provide reason for rejecting this article."
                              onConfirm={(val) => handleInput(val, article)}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Production Stage */}
                    {article.status === "Production" && (
                      <p className="font-semibold">
                        Production Stage: Final layout ready.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
