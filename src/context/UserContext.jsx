import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Tushal Anand",
    email: "tushalanand4@gmail.com",
    photo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // default avatar
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
