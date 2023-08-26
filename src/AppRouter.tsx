import { useRoutes } from "raviger";
import { Home } from "./components/Home";
import { Form } from "./components/Form";
import About from "./components/About";
import { FormPreview } from "./components/Preview";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/forms/:id": ({ id }: { id: string }) => <Form formID={+id} />,
  "/forms/preview/:id": ({ id }: { id: string }) => (
    <FormPreview formID={+id} />
  ),
};

export default function AppRouter() {
  const component = useRoutes(routes);
  return component;
}
