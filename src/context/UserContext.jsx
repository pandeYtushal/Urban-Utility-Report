import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // 🧠 Load from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    const savedUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    if (savedUser) setUser(savedUser);
    setUsers(savedUsers);
  }, []);

  // 💾 Persist whenever data changes
  useEffect(() => {
    localStorage.setItem("allUsers", JSON.stringify(users));
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [users, user]);

  // 📝 Signup (create new user)
  const signup = (name, email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const userExists = users.some((u) => u.email === normalizedEmail);

    if (userExists) {
      return { success: false, message: "Email already registered!" };
    }

    const newUser = {
      name,
      email: normalizedEmail,
      password,
      photo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setUser(newUser);

    return { success: true };
  };

  // 🔐 Login
  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];

    const existingUser = allUsers.find(
      (u) => u.email === normalizedEmail && u.password === password
    );

    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem("currentUser", JSON.stringify(existingUser));
      return { success: true };
    } else {
      return { success: false, message: "Invalid email or password!" };
    }
  };

  // 🚪 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        setUser,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
