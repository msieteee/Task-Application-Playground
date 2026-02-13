import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { GlobalStyle } from "./components/GlobalStyle";
import AuthProvider from "./context/AuthContext";
import LoginPage from "./pages/Login";
import TaskPage from "./pages/Tasks";

const App = () => (
  <AuthProvider>
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
