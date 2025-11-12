import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Load logged-in user from localStorage (if available)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Load all users from localStorage
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // Sync user state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Sync users list with localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Signup logic
  const signup = (name, email, password) => {
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return { success: false, message: "⚠️ User already exists" };
    }

    const newUser = {
      name,
      email,
      password,
      photo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    };

    setUsers([...users, newUser]);
    setUser(newUser);
    return { success: true };
  };

  // Login logic
  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "❌ Invalid email or password" };
    }

    setUser(foundUser);
    return { success: true };
  };

  // Logout logic
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, signup, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
