import { NavLink, Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <nav className="flex w-48 flex-col gap-2 border-r p-4">
        <strong>ProductiveScroll</strong>
        <NavLink to="/" end>Feed</NavLink>
        <NavLink to="/boards">Boards</NavLink>
        <NavLink to="/tags">Tags</NavLink>
        <NavLink to="/boards/demo">Demo board</NavLink>
      </nav>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}