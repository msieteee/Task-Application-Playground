import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp > now) {
          setUser(JSON.parse(storedUser));
          if (storedUserId) setUserId(storedUserId);

          const timeout = setTimeout(logoutUser, (decoded.exp - now) * 1000);
          return () => clearTimeout(timeout);
        } else {
          logoutUser();
        }
      } catch (e) {
        logoutUser();
      }
    }
  }, []);

  const logoutUser = () => {
    setUser(null);
    setUserId(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  };

  const loginUser = (userData, token) => {
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    if (userData.id || userData.userId) {
      const id = userData.id ?? userData.userId;

      setUserId(id);
      localStorage.setItem("userId", id);
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp) {
        const now = Date.now() / 1000;
        const timeout = setTimeout(logoutUser, (decoded.exp - now) * 1000);
        return () => clearTimeout(timeout);
      }
    } catch (e) {
      logoutUser();
    }
  };

  const getUser = () => {
    if (user && userId) {
      return { user, userId };
    }

    const storedUser = localStorage.getItem("user");
    const storedUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp > now) {
          return {
            user: JSON.parse(storedUser),
            userId: storedUserId,
          };
        } else {
          logoutUser();
          return null;
        }
      } catch {
        logoutUser();
        return null;
      }
    }

    return null;
  };

  return (
    <AuthContext.Provider
      value={{ user, userId, loginUser, logoutUser, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
