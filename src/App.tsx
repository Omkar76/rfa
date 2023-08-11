import { FormEventHandler } from "react";
import "./App.css";
import Header from "./Header";
import AppContainer from "./AppContainer";
import { FormField } from "./FormField";

function App() {
  const formFieds = [
    { id: 1, label: "First Name" },
    { id: 2, label: "Last Name" },
    { id: 3, label: "Email", type: "email" },
    { id: 4, label: "Date of Birth", type: "date" },
    { id: 7, label: "Phone number", type: "tel" },
  ];

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    (event.target as HTMLFormElement).reset();
    alert("Data submitted.");
  };

  return (
    <AppContainer>
      <form
        onSubmit={onSubmit}
        className="p-4 mx-auto bg-white shadow-lg rounded-xl max-w-md"
      >
        <Header title="Welcome to lesson 5 of #react-typescript with #tailwind" />
        {formFieds.map((field) => (
          <FormField key={field.id} label={field.label} type={field.type} />
        ))}
        <button className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white">
          Submit
        </button>
      </form>
    </AppContainer>
  );
}

export default App;
