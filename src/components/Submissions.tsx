import React, { useEffect } from "react";
import { getSubmissions } from "../utils/apiUtils";
import { Submission } from "../types/forms";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { Link } from "raviger";

export default function Submissions({ formID }: { formID: number }) {
  const user = useRequireAuth();
  const [submissions, setSubmissions] = React.useState<Submission[]>([]);

  useEffect(() => {
    user &&
      getSubmissions(formID).then((submissions) => {
        setSubmissions(submissions.results);
      });
  }, [formID, user]);

  return (
    <>
      <h1 className="text-3xl text-center">Submissions</h1>
      <div className="flex flex-col items-center border">
        {submissions.map((submission) => (
          <div key={submission.id} className="flex items-center gap-2">
            <p className="text-xl">Submission #{submission.id}</p>
            <Link href={`/forms/${formID}/submissions/${submission.id}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                View Submission
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
