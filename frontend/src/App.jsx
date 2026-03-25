import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Health from "./pages/Health";
import Board from "./pages/Board";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="health" element={<Health />} />
        <Route path="board" element={<Board />} />
      </Route>
    </Routes>
  );
}
