import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar/NavBar";
import Homepage from "./pages/Homepage/Homepage";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { userContext } from "./context/UserContext";
import { useContext } from "react";
import './App.css'
function App() {
  const ctx = useContext(userContext);
  return (
    <BrowserRouter>
        <NavBar />
          <Routes>
          <Route path="/" element={<Homepage />}></Route>
            {ctx ? (
              <>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/login" element={<Dashboard />}></Route> 
              <Route path="/register" element={<Dashboard />}></Route>
              </>
            ) : (
              <>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/dashboard" element={<Login />}></Route>
              </>
            )}
          </Routes>
    </BrowserRouter>
  );
}

export default App;
