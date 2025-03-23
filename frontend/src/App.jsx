import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/pages/Signup";
import Signin from "./components/pages/Signin";
import Dashboard from "./components/pages/Dashboard";
import { Transfer } from "./components/pages/Transfer";
import { Link } from "react-router-dom";

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/dashboard" element={<Dashboard />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route path="/signin" element={<Signin />} />
    //     <Route path="/transfer" element={<Transfer />} />
    //   </Routes>
    // </BrowserRouter>


    <BrowserRouter>
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to My App</h1>

      {/* Navigation Buttons */}
      <Link to="/signup">
        <button style={buttonStyle}>Go to Signup</button>
      </Link>
      <Link to="/signin">
        <button style={buttonStyle}>Go to Signin</button>
      </Link>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};


export default App;
