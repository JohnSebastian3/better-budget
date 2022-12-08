import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Homepage from "./Pages/Homepage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { userContext } from "./Pages/Context";
import { useContext } from "react";
import './App.css'
function App() {
  const ctx = useContext(userContext);
  return (
    <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
          <Route path="/" element={<Homepage />}></Route>
            {ctx ? (
              <Route path="/dashboard" element={<Dashboard />}></Route>
            ) : (
              <>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
              </>
            )}
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
