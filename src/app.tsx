import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { GlobalStyle } from "./components/GlobalStyle";
import ProtectedForward from "./components/ProtectedForward";
import AuthProvider from "./context/AuthContext";
import TaskProvider from "./context/TaskContext";
import LoginPage from "./pages/Login";
import TaskPage from "./pages/Tasks";

const App = () => (
  <AuthProvider>
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/tasks"
          element={
            <ProtectedForward>
              <TaskProvider>
                <TaskPage />
              </TaskProvider>
            </ProtectedForward>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
