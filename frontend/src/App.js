import './App.css';
import { Routes, Route } from "react-router-dom";

import Register from "./register.js";
import Login from "./login.js";
import Todos from "./todos.js";


function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todos" element={<Todos />} />
    </Routes>
  );
}
export default App;
