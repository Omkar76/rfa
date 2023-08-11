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
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl max-w-md">
        <Header title="Welcome to lesson 5 of #react-typescript with #tailwind" />
        {page === Page.HOME && <Home {...{ openForm }} />}
        {page === Page.FORM && <Form {...{ closeForm }} />}
      </div>
    </AppContainer>
  );
}

export default App;
