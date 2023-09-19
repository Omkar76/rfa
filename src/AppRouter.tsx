import { useRoutes } from "raviger";
import About from "./components/About";
import ErrorPage from "./components/Error";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Login"));
const Submissions = lazy(() => import("./components/Submissions"));
const SubmissionDetails = lazy(() => import("./components/SubmissionDetails"));
const suspenseFallback = <div>Loading...</div>;
const FormPreview = lazy(() => import("./components/Preview"));
const Form = lazy(() => import("./components/Form"));

const routes = {
  "/": () => (
    <Suspense fallback={suspenseFallback}>      
      <Home />
    </Suspense>
  ),
  "/login": () => (
    <Suspense fallback={suspenseFallback}>
      <Login />
    </Suspense>
  ),
  "/about": () => <About />,
  "/forms/:id": ({ id }: { id: string }) => (
    <Suspense fallback={suspenseFallback}>
      <Form formID={+id} />
    </Suspense>
  ),
  "/forms/preview/:id": ({ id }: { id: string }) => (
    <FormPreview formID={+id} />
  ),
  "/forms/submissions/:id": ({ id }: { id: string }) => (
    <Suspense fallback={suspenseFallback}>
      <Submissions formID={+id} />
    </Suspense>
  ),
  "/forms/:id/submissions/:submissionId": ({
    id,
    submissionId,
  }: {
    id: string;
    submissionId: string;
  }) => (
    <Suspense fallback={suspenseFallback}>
      <SubmissionDetails formId={+id} submissionId={+submissionId} />
    </Suspense>
  ),
  "/*": () => <ErrorPage />,
};

export default function AppRouter() {
  const component = useRoutes(routes);
  return component;
}
