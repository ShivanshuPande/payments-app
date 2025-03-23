import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/pages/Signup";
import Signin from "./components/pages/Signin";
import Dashboard from "./components/pages/Dashboard";
import { Transfer } from "./components/pages/Transfer";
import { Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/transfer" element={<Transfer />} />
      </Routes>
    </BrowserRouter>

  )}

// token has to be sent out everytime -- teh next request is processed -- a session needs to be created the token is only valid till the session
export default App;
