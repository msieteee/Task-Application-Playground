import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<></>} />
      </Routes>
    </Router>
  );
};

export default App;
