import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./Home";
import { Login } from "./Login";
import { Register } from "./Register";
import { MyProps } from "./MyProps";
import { Profile } from "./Profile";
import { AddProp } from "./AddProp";

function App() {
  
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/mine" element={<MyProps />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add" element={<AddProp />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
