import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Admin from "../pages/Admin";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
