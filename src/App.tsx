import "./App.css";
import Header from "./Header";
import AppContainer from "./AppContainer";
import { Form } from "./Form";
import { useState } from "react";
import { Home } from "./Home";
enum Page {
  FORM,
  HOME,
}
function App() {
  const [page, setPage] = useState<Page>(Page.HOME);
  const openForm = () => {
    setPage(Page.FORM);
  };
  const closeForm = () => {
    setPage(Page.HOME);
  };

  return (
    <AppContainer>
      <div className="flex flex-col items-center p-4 mx-auto bg-white shadow-lg rounded-xl w-[500px] max-w-[90vw]">
        <Header title="React + Tailwind" />
        {page === Page.HOME && <Home {...{ openForm }} />}
        {page === Page.FORM && <Form {...{ closeForm }} />}
      </div>
    </AppContainer>
  );
}

export default App;
