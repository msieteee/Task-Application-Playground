import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedForward = ({ children }) => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp < now) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        setIsValid(true);
      }
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  if (!isValid) return null;

  return <>{children}</>;
};

export default ProtectedForward;
