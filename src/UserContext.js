import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const storedDoctor = localStorage.getItem("doctor");
    const storedAdmin = localStorage.getItem("admin");

    if (storedUser) {
      return JSON.parse(storedUser);
    } else if (storedDoctor) {
      return JSON.parse(storedDoctor);
    } else if (storedAdmin) {
      return JSON.parse(storedAdmin);
    }
    return null;
  });

  // Logout function to clear state and localStorage
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("doctor");
    localStorage.removeItem("doctorToken");
    localStorage.removeItem("doctorId");
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");

    setUser(null); // Clear context state
  };
  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
