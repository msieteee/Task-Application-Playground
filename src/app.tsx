import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { GlobalStyle } from "./components/GlobalStyle";
import Login from "./pages/login";

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
