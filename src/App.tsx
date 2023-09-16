import "./App.css";
import Header from "./Header";
import AppContainer from "./AppContainer";
import AppRouter from "./AppRouter";
import { me } from "./utils/apiUtils";
import { useEffect } from "react";
import { User } from "./types/users";
import { useUserContext } from "./context/userContext";

const getCurrentUser = async (setCurrentUser: (currentUser: User) => void) => {
  // try{
  const currentUser = await me();
  currentUser.username ? setCurrentUser(currentUser) : setCurrentUser(null);
  // }catch(e:any){}
};
function App() {
  const { setUser } = useUserContext();
  useEffect(() => {
    getCurrentUser(setUser);
  }, [setUser]);

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
