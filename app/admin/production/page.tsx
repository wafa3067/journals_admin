// app/admin/review/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../api/hooks/hooks";
import { sendArticleEmail } from "../adminSlice/emailSlice";
import { assignToProduction } from "../adminSlice/copyeditorSlice";
import AlertInputDialog from "../components/alert_input";
import { rejectArticleStatus } from "../adminSlice/rejectArticalStatusSlice";
import { Article, fetchProduction } from "../adminSlice/productionSlice";
import { useAlert } from "@/app/components/AlertProvider";
import { addNotification } from "../adminSlice/notificationSlice";
import Modification from "../components/modification";
import {
  updateProductionComments,
  updateProductModification,
  updateUserProductionComments,
} from "@/app/api/slice/getArticleSlice";
import QuillViewer from "@/app/components/rectquilviwer";

export default function Page() {
  const dispatch = useAppDispatch();
  const { articles, loading } = useAppSelector((state) => state.production);
  const [new_value, setNewValue] = useState("");

  useEffect(() => {
    dispatch(fetchProduction());
    setNewValue(`Dear Author,
Your manuscript is in the final review stage. Please submit the final version of your paper in LaTeX or Word format using the attached template file.
Kind regards,
Editorial Office`);
  }, [dispatch]);

  const CopyEditor = articles.filter((a) => a.status === "Production");
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
                  ${new_value}
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
      addNotification({
        title: article.title,
        message: `Modification Request.`,
        email: article.email,
        status: "Modification",
      }),
    );
    dispatch(
      updateProductionComments({
        productionComments: new_value,
        articleId: article.id,
      }),
    ).then(() => dispatch(fetchProduction()));

    showAlert("Article Sent fot modification");
  };
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
    ).then(() => {
      dispatch(
        addNotification({
          title: article.title,
          message: `Your Article has been rejected".`,
          email: article.email,
          status: "Under Review",
        }),
      );
      showAlert("Article Rejected successfully!");

      dispatch(fetchProduction());
    });
  };

  const { showAlert } = useAlert();

  const handleAssignReviewer = (article: Article) => {
    dispatch(
      sendArticleEmail({
        toEmail: article.email,
        authorName: article.givenName,
        articleTitle: article.title,
        status: "Approved",
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
                  🎉 Your Article Has Been Approved for Publication
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
                  Congratulations! Your article has been <strong>officially approved</strong> after successfully completing all editorial and production checks.
                </p>
                <p style="margin:0 0 12px 0;">
                  Our team will now proceed with the final layout and scheduling for publication. Once released, your article will be featured on our journal’s website and included in the upcoming issue.
                </p>
                <p style="margin:0;">
                  We sincerely appreciate your hard work and valuable contribution to our research community.
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
                    <td><strong style="color:#059669;">Approved</strong></td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Submission Date:</td>
                    <td>${article.createdAt?.toString()}</td>
                  </tr>
                  ${
                    article.copyeditor
                      ? `<tr>
                          <td width="35%" style="font-weight:bold;">Copy Edited By:</td>
                          <td>${article.copyeditor}</td>
                        </tr>`
                      : ""
                  }
                </table>
              </td>
            </tr>

            <!-- Appreciation -->
            <tr>
              <td align="center" style="padding:25px 35px; font-size:15px; color:#374151; line-height:1.6; background-color:#ecfdf5;">
                <em>“Quality research deserves recognition — thank you for helping us advance knowledge.”</em>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:25px 35px 10px 35px; font-size:14px; color:#6b7280;">
                With best regards,<br>
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
        productionNotes: "",
        status: "Approved",
      }),
    ).then(() => {
      dispatch(
        updateProductModification({ articleId: article.id, production: false }),
      );
      dispatch(
        addNotification({
          title: article.title,
          message: `your article "${article.title}" has been approved for publication.`,
          email: article.email,
          status: "Approved",
        }),
      );
      dispatch(
        updateProductModification({ articleId: article.id, production: false }),
      );
      dispatch(
        updateUserProductionComments({
          articleId: article.id,
          userProductionComments: "",
        }),
      );
      showAlert("Article Approved successfully!");

      dispatch(fetchProduction());
    });
  };
  return (
    <main>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:bg-[#00b4d8] p-5 shadow-sm flex justify-center items-center ">
          <h1 className="text-sm font-bold flex items-center gap-2 text-black md:text-white">
            Production Articles management
          </h1>
        </header>
        {loading ? (
          <p>Loading...</p>
        ) : CopyEditor.length === 0 ? (
          <div className="text-center p-4 bg-[#00b4d8] text-white m-8 rounded">
            No articles currently under review.
          </div>
        ) : (
          <div className=" overflow-scroll h-[calc(100vh-50px)]">
            {CopyEditor.map((article) => {
              return (
                <div
                  key={article.id}
                  className="bg-white m-8 rounded-xl shadow p-6 mb-6 transition-transform hover:-translate-y-1"
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
                    <strong>PDF:</strong>{" "}
                    <a
                      href={`/uploads/${article.pdf}`}
                      target="_blank"
                      className="#00b4d8"
                      rel="noreferrer"
                    >
                      View PDF
                    </a>
                  </p>

                  {article.productionComments && (
                    <div className="text-black capitalize">
                      <p className="font-bold">ProductionNotes:</p>
                      <p> {article.productionComments}</p>
                    </div>
                  )}
                  {article.userProductionComments != "" &&
                  article.userProductionComments != null ? (
                    <div className="border-2 rounded-sm p-2 ">
                      <p className="text-black font-bold">
                        Article resubmitted by user with the information below:
                      </p>
                      <p className="text-red-400 capitalize">
                        {article.userProductionComments}
                      </p>
                      <p>Final File</p>
                      <a
                        href={
                          article.finalFile ? article.finalFile.toString() : ""
                        }
                        target="_blank"
                        className="#00b4d8"
                        rel="noreferrer"
                      >
                        View Final File
                      </a>
                    </div>
                  ) : null}
                  <div className="mt-3 space-x-2">
                    {article.status === "Production" && (
                      <div className="space-y-2  mb-4 ">
                        <div className="flex flex-row gap-2">
                          <button
                            className="bg-[#00b4d8] text-white px-3 py-1 rounded hover:bg-[#00b4d8]"
                            onClick={() => handleAssignReviewer(article)}
                          >
                            Approve
                          </button>

                          <Modification
                            inputValues={`Dear Author,
Your manuscript is in the final review stage. Please submit the final version of your paper in LaTeX or Word format using the attached template file.
Kind regards,
Editorial Office
    `}
                            onChange={(v) => setNewValue(v)}
                            button="Modification Request"
                            bg="bg-red-400"
                            title="Recruit Reviewer"
                            description="Please provide reason for requesting modification."
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
