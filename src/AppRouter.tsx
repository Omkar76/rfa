import { useRoutes } from "raviger";
import { Home } from "./components/Home";
import { Form } from "./components/Form";
import About from "./components/About";
import { FormPreview } from "./components/Preview";
import ErrorPage from "./components/Error";
import Login from "./components/Login";
import Submissions from "./components/Submissions";
import SubmissionDetails from "./components/SubmissionDetails";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/about": () => <About />,
  "/forms/:id": ({ id }: { id: string }) => <Form formID={+id} />,
  "/forms/preview/:id": ({ id }: { id: string }) => (
    <FormPreview formID={+id} />
  ),
  "/forms/submissions/:id": ({ id }: { id: string }) => (
    <Submissions formID={+id} />
  ),
  "/forms/:id/submissions/:submissionId": ({
    id,
    submissionId,
  }: {
    id: string;
    submissionId: string;
  }) => <SubmissionDetails formId={+id} submissionId={+submissionId} />,
  "/*": () => <ErrorPage />,
};

export default function AppRouter() {
  const component = useRoutes(routes);
  return component;
}
