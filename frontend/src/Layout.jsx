import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="app">
      <div className="hero">
        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/health">Health</NavLink>
          <NavLink to="/board">Board</NavLink>
        </nav>
        <Outlet />
      </div>
    </main>
  );
}
