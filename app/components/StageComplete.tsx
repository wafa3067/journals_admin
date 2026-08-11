"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface StageCompletedMessageProps {
  stage: string;
  description?: string;
}

const StageCompletedMessage: React.FC<StageCompletedMessageProps> = ({
  stage,
  description,
}) => {
  return (
    <div className="max-w-xl mx-auto mt-16 bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-100">
      <CheckCircle2 className="w-14 h-14 text-[#00b4d8] mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        {stage} Stage Completed
      </h1>
      <p className="text-gray-600 leading-relaxed">
        {description ??
          `Your article has successfully completed the ${stage.toLowerCase()} stage. 
          Our team will now proceed to the next step in the publication process.`}
      </p>
      <div className="mt-6 text-sm text-gray-400">
        <p>Thank you for your contribution to our journal.</p>
        <p className="font-semibold text-gray-500 mt-1">— Editorial Team</p>
      </div>
    </div>
  );
};

export default StageCompletedMessage;
