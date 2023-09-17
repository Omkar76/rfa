import { navigate } from "raviger";
import { useUserContext } from "../context/userContext";
import { useEffect } from "react";

export const useRequireAuth = () => {
  const { user } = useUserContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        navigate("/login");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  return user;
};
