import { useRoutes } from "raviger";
import { Home } from "./components/Home";
import { Form } from "./components/Form";
import About from "./components/About";
import { FormPreview } from "./components/Preview";
import ErrorPage from "./components/Error";
import { formExists } from "./utils/forms";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/forms/:id": ({ id }: { id: string }) =>
    formExists(+id) ? <Form formID={+id} /> : <ErrorPage />,
  "/forms/preview/:id": ({ id }: { id: string }) =>
    formExists(+id) ? <FormPreview formID={+id} /> : <ErrorPage />,
  "/*": () => <ErrorPage />,
};

export default function AppRouter() {
  const component = useRoutes(routes);
  return component;
}
