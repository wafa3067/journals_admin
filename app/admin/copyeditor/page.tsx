// app/admin/review/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../api/hooks/hooks";
import { Article } from "../adminSlice/copyeditorSlice";

import { sendArticleEmail } from "../adminSlice/emailSlice";
import {
  assignToProduction,
  fetchCopyEdit,
} from "../adminSlice/copyeditorSlice";
import AlertInputDialog from "../components/alert_input";
import { rejectArticleStatus } from "../adminSlice/rejectArticalStatusSlice";
import { useAlert } from "@/app/components/AlertProvider";
import { addNotification } from "../adminSlice/notificationSlice";
import Modification from "../components/modification";
import {
  assignCopyEditor,
  modifyCopyEditor,
} from "../adminSlice/underreviewSlice";
import { updateUserComment } from "@/app/api/slice/getArticleSlice";
import QuillViewer from "@/app/components/rectquilviwer";

export default function Page() {
  const dispatch = useAppDispatch();
  const { articles, loading } = useAppSelector((state) => state.copy);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [new_value, setNewValue] = useState("");
  const [reviewInputs, setReviewInputs] = useState<
    Record<number, { reviewer: string; start: string; end: string }>
  >({});
  useEffect(() => {
    dispatch(fetchCopyEdit());
  }, [dispatch]);

  // Filter articles that are currently "Under Review"
  const CopyEditor = articles.filter((a) => a.status === "Copy Editor");

  const handleInput = (value: string, article: Article) => {
    dispatch(
      sendArticleEmail({
        toEmail: article.email,
        authorName: article.givenName,
        articleTitle: article.title,
        status: "Rejected",
        body: `
  <html>
  <body style="margin:0; padding:0; background-color:#f5f7fa; font-family:'Segoe UI', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background-color:#b91c1c; padding:30px;">
                <h1 style="margin:0; color:#ffffff; font-size:26px; letter-spacing:0.5px;">
                  Decision on Your Article Submission
                </h1>
              </td>
            </tr>
            
            <!-- Greeting -->
            <tr>
              <td style="padding:25px 35px 10px 35px; font-size:18px; color:#111827;">
                Dear <strong>${article.givenName} ${article.familyName}</strong>,
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:10px 35px 20px 35px; font-size:15px; color:#374151; line-height:1.6;">
                <p style="margin:0 0 12px 0;">
                  We regret to inform you that after careful consideration, your submitted article has not been accepted for publication in our journal.
                </p>
                <p style="margin:0 0 12px 0;">
                  Our editorial team and reviewers provided detailed feedback regarding your submission:
                </p>
                <blockquote style="margin:15px 0; padding:15px 20px; background-color:#fef2f2; border-left:4px solid #ef4444; border-radius:8px; color:#7f1d1d;">
                  ${value}
                </blockquote>
                <p style="margin:12px 0 0 0;">
                  We encourage you to review the comments and consider revising your work for future submissions. We truly appreciate the time and effort you devoted to your research.
                </p>
              </td>
            </tr>

            <!-- Article Info -->
            <tr>
              <td style="background-color:#f9fafb; padding:25px 35px;">
                <h3 style="margin:0 0 15px 0; color:#b91c1c; font-size:18px;">Article Summary</h3>
                <table cellpadding="6" cellspacing="0" width="100%" style="color:#374151; font-size:14px;">
                  <tr>
                    <td width="35%" style="font-weight:bold;">Title:</td>
                    <td>${article.title}</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Status:</td>
                    <td style="color:#b91c1c; font-weight:600;">${article.status}</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Submission Date:</td>
                    <td>${article.createdAt}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Closing -->
            <tr>
              <td align="center" style="padding:25px 35px 15px 35px; font-size:14px; color:#6b7280; line-height:1.6;">
                Thank you for considering our journal for your work.<br>
                <strong>The Editorial Board</strong>
              </td>
            </tr>

            <!-- Footer -->
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
      rejectArticleStatus({
        id: article.id,
        comments: value,
        status: "Rejected",
      }),
    ).then((response) => {
      dispatch(
        addNotification({
          title: article.title,
          message: `Your Article has been rejected".`,
          email: article.email,
          status: "Rejected",
        }),
      );
      dispatch(fetchCopyEdit());
      setSuccessMessage("Reject Article Response:" + response);
    });
  };

  const handleModification = (article: Article) => {
    dispatch(
      sendArticleEmail({
        toEmail: article.email,
        authorName: article.givenName,
        articleTitle: article.title,
        status: "Rejected",
        body: `
  <html>
  <body style="margin:0; padding:0; background-color:#f5f7fa; font-family:'Segoe UI', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background-color:#b91c1c; padding:30px;">
                <h1 style="margin:0; color:#ffffff; font-size:26px; letter-spacing:0.5px;">
                  Decision on Your Article Submission
                </h1>
              </td>
            </tr>
            
            <!-- Greeting -->
            <tr>
              <td style="padding:25px 35px 10px 35px; font-size:18px; color:#111827;">
                Dear <strong>${article.givenName} ${article.familyName}</strong>,
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:10px 35px 20px 35px; font-size:15px; color:#374151; line-height:1.6;">
                <p style="margin:0 0 12px 0;">
                  We regret to inform you that after careful consideration, your submitted article has not been accepted for publication in our journal.
                </p>
                <p style="margin:0 0 12px 0;">
                  Our editorial team and reviewers provided detailed feedback regarding your submission:
                </p>
                <blockquote style="margin:15px 0; padding:15px 20px; background-color:#fef2f2; border-left:4px solid #ef4444; border-radius:8px; color:#7f1d1d;">
                  ${article.underReviewComments}
                </blockquote>
                <p style="margin:12px 0 0 0;">
                  We encourage you to review the comments and consider revising your work for future submissions. We truly appreciate the time and effort you devoted to your research.
                </p>
              </td>
            </tr>

            <!-- Article Info -->
            <tr>
              <td style="background-color:#f9fafb; padding:25px 35px;">
                <h3 style="margin:0 0 15px 0; color:#b91c1c; font-size:18px;">Article Summary</h3>
                <table cellpadding="6" cellspacing="0" width="100%" style="color:#374151; font-size:14px;">
                  <tr>
                    <td width="35%" style="font-weight:bold;">Title:</td>
                    <td>${article.title}</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Status:</td>
                    <td style="color:#b91c1c; font-weight:600;">${article.status}</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Submission Date:</td>
                    <td>${article.createdAt}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Closing -->
            <tr>
              <td align="center" style="padding:25px 35px 15px 35px; font-size:14px; color:#6b7280; line-height:1.6;">
                Thank you for considering our journal for your work.<br>
                <strong>The Editorial Board</strong>
              </td>
            </tr>

            <!-- Footer -->
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
      modifyCopyEditor({
        articleId: article.id,
        copy: true,
      }),
    ).then(() => {
      dispatch(
        addNotification({
          title: article.title,
          message: `Modification Request.`,
          email: article.email,
          status: "Modification",
        }),
      );
      dispatch(updateUserComment({ userComments: "", articleId: article.id }));
      dispatch(
        assignCopyEditor({
          articleId: article.id,
          copyeditor: article.copyeditor ?? "",
          status: "Copy Editor",
          comments: new_value != "" ? new_value : article.underReviewComments,
        }),
      ).then(() => dispatch(fetchCopyEdit()));

      showAlert("Article Sent fot modification");
    });
  };
  const handleInputChange = (
    articleId: number,
    field: "reviewer",
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
    if (!input.reviewer) {
      alert("please add copy editor name");
      return;
    }
    dispatch(
      sendArticleEmail({
        toEmail: article.email,
        authorName: article.givenName,
        articleTitle: article.title,
        status: "Production",
        body: `
<html>
  <body style="margin:0; padding:0; background-color:#f5f7fa; font-family:'Segoe UI', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background-color:#059669; padding:30px;">
                <h1 style="margin:0; color:#ffffff; font-size:26px; letter-spacing:0.3px;">
                  Your Article Has Moved to Production
                </h1>
              </td>
            </tr>
            
            <!-- Greeting -->
            <tr>
              <td style="padding:25px 35px 10px 35px; font-size:18px; color:#111827;">
                Dear <strong>${article.givenName} ${
                  article.familyName
                }</strong>,
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:10px 35px 20px 35px; font-size:15px; color:#374151; line-height:1.7;">
                <p style="margin:0 0 12px 0;">
                  Congratulations! Your article has successfully completed the copy editing phase and is now in the <strong>production stage</strong>.
                </p>
                <p style="margin:0 0 12px 0;">
                  Our production team will now finalize layout design, formatting, and proofing to prepare your work for official publication.
                </p>
                <p style="margin:0;">
                  You will receive a final approval notification once the production process is complete.
                </p>
              </td>
            </tr>

            <!-- Article Details -->
            <tr>
              <td style="background-color:#f9fafb; padding:25px 35px;">
                <h3 style="margin:0 0 15px 0; color:#059669; font-size:18px;">Article Details</h3>
                <table cellpadding="6" cellspacing="0" width="100%" style="color:#374151; font-size:14px;">
                  <tr>
                    <td width="35%" style="font-weight:bold;">Title:</td>
                    <td>${article.title}</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Status:</td>
                    <td><strong style="color:#059669;">Production</strong></td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Submission Date:</td>
                    <td>${article.createdAt?.toString()}</td>
                  </tr>
                  ${
                    input.reviewer
                      ? `<tr>
                          <td width="35%" style="font-weight:bold;">Copy Edited By:</td>
                          <td>${input.reviewer}</td>
                        </tr>`
                      : ""
                  }
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:25px 35px 10px 35px; font-size:14px; color:#6b7280;">
                We appreciate your continued trust and collaboration.<br>
                <strong style="color:#111827;">The Editorial & Production Team</strong>
              </td>
            </tr>

            <!-- Footer Info -->
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
      assignToProduction({
        articleId: article.id,
        productionNotes: input.reviewer,
        status: "Production",
      }),
    ).then(() => {
      dispatch(
        addNotification({
          title: article.title,
          message: `Reviewer ${input.reviewer} has been assigned to your article "${article.title}".`,
          email: article.email,
          status: "Production",
        }),
      );
      dispatch(updateUserComment({ articleId: article.id, userComments: "" }));
      dispatch(modifyCopyEditor({ articleId: article.id, copy: false }));
      dispatch(fetchCopyEdit());
      showAlert("Article assigned to Production successfully!");
    });
  };
  return (
    <main>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="p-5 md:bg-[#00b4d8] flex justify-center items-center ">
          <h1 className="text-sm font-semibold flex items-center gap-2 text-black md:text-white">
            Copy Editor Articles management
          </h1>
        </header>
        {loading ? (
          <p>Loading...</p>
        ) : CopyEditor.length === 0 ? (
          <div className="text-center p-4 bg-[#00b4d8] text-white m-8 rounded">
            No articles currently Copy Editor.
          </div>
        ) : (
          <div className=" overflow-scroll h-[calc(100vh-50px)]">
            {CopyEditor.map((article) => {
              //console.log("data", article.modifyCopyEditor);

              return (
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
                    <strong>Submitted By:</strong> {article.givenName}|
                    {article.familyName}|{article.email} | {article.affiliation}
                  </p>
                  <p>Abstract:</p>
                  <QuillViewer value={article.abstracts ?? ""} />

                  <p>
                    <strong>Reviewer:</strong> {article.reviewerAssigned}
                  </p>
                  <p>
                    <strong>Submitted On:</strong> {article.createdAt}
                  </p>
                  <p>
                    <strong>Review Started:</strong> {article.reviewStartDate}
                  </p>
                  <p>
                    <strong>Review Deadline:</strong> {article.reviewEndDate}
                  </p>

                  <p>
                    <strong>PDF:</strong>
                    <a
                      href={`/uploads/${article.pdf}`}
                      target="_blank"
                      className="#00b4d8"
                      rel="noreferrer"
                    >
                      View PDF
                    </a>
                  </p>

                  <div className="pb-2">
                    <strong>Comments By Under Review:</strong>
                    <pre> {article.underReviewComments}</pre>
                  </div>
                  <div>
                    {article.modifyCopyEditor === false ? (
                      ""
                    ) : article.userComments != "" ? (
                      <div className="border-2 rounded-sm p-2 ">
                        <p className="text-black font-bold">
                          Article resubmitted by user with the information
                          below:
                        </p>
                        <p className="text-red-400 capitalize">
                          {article.userComments}
                        </p>
                      </div>
                    ) : (
                      <p className="text-red-200">
                        The articles have been shared with the user for
                        necessary changes.
                      </p>
                    )}
                  </div>

                  {successMessage && (
                    <div className="mt-2 p-2 bg-green-100 text-green-700 rounded">
                      {successMessage}
                    </div>
                  )}

                  <div className="mt-3 space-x-2">
                    {article.status === "Copy Editor" && (
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
                            Assign To Production
                          </button>

                          <Modification
                            inputValues={article.underReviewComments}
                            onChange={(v) => setNewValue(v)}
                            button="Modification Request"
                            bg="bg-red-400"
                            title="Recruit Reviewer"
                            description="Please provide reason for rejecting this article."
                            onConfirm={() => handleModification(article)}
                          />
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
