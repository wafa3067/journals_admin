import { BACKEND_URL } from "@/app/api/actions/articleActions";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf"; // from react-pdf

const ViewPDF: React.FC = () => {
  const router = useRouter();
  const { pdfData } = router.query; // Extract encoded pdfData from the URL

  const [pdf, setPdf] = useState<string | null>(null);

  useEffect(() => {
    if (pdfData && typeof pdfData === "string") {
      const decodedPdfData = decodeURIComponent(pdfData); // Decode the PDF data
      setPdf(decodedPdfData); // Set the decoded pdfData in state
    }
  }, [pdfData]);

  if (!pdf) {
    return <p>Loading PDF...</p>;
  }
  // data:application/pdf;base64,${pdf} -< offlince
  const pdfUrlonline = `${BACKEND_URL}/${pdf}`;
  return (
    <div>
      <h1>PDF Viewer</h1>
      <Document file={pdfUrlonline}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default ViewPDF;
