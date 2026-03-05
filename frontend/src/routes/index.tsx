import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Intro from "../pages/Intro";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
