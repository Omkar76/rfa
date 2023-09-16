import React, { useEffect } from "react";
import { FormFieldData, Submission } from "../types/forms";
import { getSubmission, getFields } from "../utils/apiUtils";

interface SubmissionDetailsProps {
  formId: number;
  submissionId: number;
}

export default function SubmissionDetails({
  formId,
  submissionId,
}: SubmissionDetailsProps) {
  const [fields, setFields] = React.useState<FormFieldData[]>([]);
  const [submission, setSubmission] = React.useState<Submission | null>(null);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  useEffect(() => {
    Promise.all([getFields(formId), getSubmission(formId, submissionId)]).then(
      ([fields, submission]) => {
        setFields(fields.results);
        setSubmission(submission);
        setIsLoading(false);
      },
    );
  }, [formId, submissionId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">
        {submission?.form.title} - Submission #{submissionId}
      </h2>

      <ul>
        {submission?.answers.map((answer, index) => {
          const field = fields.find((field) => field.id === answer.form_field);
          if (!field) {
            return null;
          }
          return (
            <li key={index} className="border">
              <p>
                <span className="font-bold">{field.label}</span> -{" "}
                {answer.value}
              </p>
            </li>
          );
        })}
      </ul>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>
  );
}
