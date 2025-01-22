import { useContext } from "react";
import AuthContext from "../Context/Auth Context/AuthContext";

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
