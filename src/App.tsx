import "./App.css";
import Header from "./Header";
import AppContainer from "./AppContainer";
import AppRouter from "./AppRouter";

function App() {
  return (
    <AppContainer>
      <div className="flex flex-col items-center p-4 mx-auto bg-white shadow-lg rounded-xl max-w-md min-w-[60vw]">
        <Header title="React + Tailwind" />

        <AppRouter />
      </div>
    </AppContainer>
  );
}

export default App;
