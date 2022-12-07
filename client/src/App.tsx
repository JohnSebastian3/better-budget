import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Homepage from "./Pages/Homepage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Context from "./Pages/Context";

function App() {
  return (
    <BrowserRouter>
      <Context>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </div>
      </Context>
    </BrowserRouter>
  );
}

export default App;
