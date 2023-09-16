import { navigate } from "raviger";
import { useUserContext } from "../context/userContext";

export const useRequireAuth = () => {
  const { user } = useUserContext();
  if (!user) {
    navigate("/login");
  }

  return user;
};
