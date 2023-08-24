import { useRoutes } from "raviger";
import { Home } from "./components/Home";
import { Form } from "./components/Form";
import About from "./components/About";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/forms/:id": ({ id }: { id: string }) => <Form formID={+id} />,
};

export default function AppRouter() {
  const component = useRoutes(routes);
  return component;
}
