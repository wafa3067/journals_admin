"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../api/hooks/hooks";
import {
  updateArticleStatus,
  assignReviewer,
  toggleDetails,
  Article,
} from "../adminSlice/pending";
import { sendArticleEmail } from "../adminSlice/emailSlice";
import { fetchRejectedArticle } from "../adminSlice/rejectedDataslice";
import { useAlert } from "@/app/components/AlertProvider";
import CustomText from "@/app/components/custom_text";
import QuillViewer from "@/app/components/rectquilviwer";

export default function Page() {
  const dispatch = useAppDispatch();
  const { articles, loading } = useAppSelector(
    (state) => state.rejectedArtical,
  );

  // Local state for reviewer inputs
  const [reviewInputs, setReviewInputs] = useState<
    Record<number, { reviewer: string; start: string; end: string }>
  >({});

  useEffect(() => {
    dispatch(fetchRejectedArticle());
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
  const { showAlert } = useAlert();

  const handleAssignReviewer = (article: Article) => {
    const input = reviewInputs[article.id] || {};
    if (!input.reviewer || !input.start || !input.end) {
      alert("Please fill all fields");
      return;
    }

    dispatch(
      sendArticleEmail({
        toEmail: article.email,
        authorName: article.givenName,
        articleTitle: article.title,
        status: "Under Review",
        body: `
<html>
  <body style="margin:0; padding:0; background-color:#f5f7fa; font-family:'Segoe UI', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background-color:#2563eb; padding:30px;">
                <h1 style="margin:0; color:#ffffff; font-size:26px; letter-spacing:0.3px;">
                  Your Article Is Now in Copy Editing
                </h1>
              </td>
            </tr>
            
            <!-- Greeting -->
            <tr>
              <td style="padding:25px 35px 10px 35px; font-size:18px; color:#111827;">
                Hello <strong>${article.givenName} ${
                  article.familyName
                }</strong>,
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:10px 35px 20px 35px; font-size:15px; color:#374151; line-height:1.6;">
                <p style="margin:0 0 12px 0;">
                  We’re pleased to inform you that your article has successfully completed the review process and has now moved to the <strong>copy editing stage</strong>.
                </p>
                <p style="margin:0 0 12px 0;">
                  During this stage, our copy editors will refine your manuscript for grammar, formatting, and clarity to ensure it meets the publication standards of our journal.
                </p>
                <p style="margin:0;">
                  You will be notified once the editing process is complete or if any clarifications are required.
                </p>
              </td>
            </tr>

            <!-- Article Details -->
            <tr>
              <td style="background-color:#f9fafb; padding:25px 35px;">
                <h3 style="margin:0 0 15px 0; color:#2563eb; font-size:18px;">Article Details</h3>
                <table cellpadding="6" cellspacing="0" width="100%" style="color:#374151; font-size:14px;">
                  <tr>
                    <td width="35%" style="font-weight:bold;">Title:</td>
                    <td>${article.title}</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Status:</td>
                    <td>${article.status}</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Submission Date:</td>
                    <td>${article.createdAt?.toString()}</td>
                  </tr>
                  ${
                    article.copyeditor
                      ? `<tr>
                          <td width="35%" style="font-weight:bold;">Assigned Copy Editor:</td>
                          <td>${article.copyeditor}</td>
                        </tr>`
                      : ""
                  }
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:25px 35px 10px 35px; font-size:14px; color:#6b7280;">
                Thank you for your continued contribution to our journal.<br>
                <strong>The Editorial Team</strong>
              </td>
            </tr>

            <tr>
              <td align="center" style="font-size:12px; color:#9ca3af; padding:15px 35px 30px 35px;">
                © 2025 Journal Name. All rights reserved.<br>
                1234 Street, City, Country
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
      }),
    );
    dispatch(
      assignReviewer({
        articleId: article.id,
        reviewer: input.reviewer,
        start: input.start,
        end: input.end,
      }),
    ).then(() => {
      dispatch(fetchRejectedArticle());

      showAlert("Article assigned to Under Review successfully!");
    });
  };

  return (
    <main className=" overflow-y-auto h-screen">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className=" md:bg-[#00b4d8] p-5 flex justify-center items-center ">
          <h1 className="text-sm font-bold flex items-center gap-2 text-black md:text-white">
            Rejected Articles management
          </h1>
        </header>
        {loading ? (
          <p>Loading...</p>
        ) : articles.length === 0 ? (
          <div className="text-center p-4 bg-[#00b4d8] text-white m-8 rounded">
            No Rejected articles found.
          </div>
        ) : (
          <div className=" overflow-scroll h-[calc(100vh-110px)]">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow p-6 mb-6 m-8 transition-transform hover:-translate-y-1"
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
                        href={`/uploads/${article.pdf}`}
                        target="_blank"
                        className="#00b4d8"
                        rel="noreferrer"
                      >
                        View PDF
                      </a>
                    </div>

                    {/* Reviewer Assignment */}
                    {article.status === "Rejected" && (
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
                        <CustomText
                          text={"Review start date:"}
                          style={"font-bold"}
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
                        <CustomText
                          text={"Review end date:"}
                          style={"font-bold"}
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

                    {/* Copyediting Stage */}
                    {article.status === "Copyediting" && (
                      <div className="space-y-2">
                        <textarea
                          className="border rounded px-2 py-1 w-full"
                          placeholder="Copyeditor Comment"
                          defaultValue={article.copyeditor}
                        ></textarea>
                        <button
                          className="bg-[#00b4d8] text-white px-3 py-1 rounded hover:bg-[#00b4d8]"
                          onClick={() =>
                            dispatch(
                              updateArticleStatus({
                                id: article.id,
                                status: "Production",
                              }),
                            )
                          }
                        >
                          ✅ Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          onClick={() =>
                            dispatch(
                              updateArticleStatus({
                                id: article.id,
                                status: "Rejected",
                              }),
                            )
                          }
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}

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
