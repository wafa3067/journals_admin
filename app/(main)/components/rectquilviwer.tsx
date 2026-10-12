import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function QuillViewer({ value }: { value: string }) {
  return (
    <div className="quill-viewer">
      {/* Inline styles */}
      <style>
        {`
          .quill-viewer {
          
            margin: 0 auto;
          }

          .quill-viewer .ql-toolbar {
            display: none !important;
          }

          .quill-viewer .ql-container {
            border: none !important;
          }


      


    


        
          

        `}
      </style>

      <ReactQuill value={value} readOnly={true} theme="snow" />
    </div>
  );
}
