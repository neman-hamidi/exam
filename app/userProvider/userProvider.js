"use client";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();
const userProvider = ({ children }) => {
  const [UsernameGlobal, setUsernameGlobal] = useState("");
  const [token, setToken] = useState(false);
  const [isLoggin, setIsLoggin] = useState(false);


  const login = (token, nameGlobal) => {
    setToken(token);
    setUsernameGlobal(nameGlobal);
    setIsLoggin(true);
    localStorage.setItem("nameGlobal", nameGlobal);
    localStorage.setItem("token", JSON.stringify({ token }));
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const nameGlobal = localStorage.getItem("nameGlobal");
      setUsernameGlobal(nameGlobal)
      setIsLoggin(true);
    }
  }, []);
  const logout = () => {
    setToken(null);
    setIsLoggin(false)
    localStorage.removeItem("token");
    localStorage.removeItem("nameGlobal");
  };

  return (
    <UserContext.Provider
      value={{
        UsernameGlobal,
        token,
        isLoggin,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default userProvider;
