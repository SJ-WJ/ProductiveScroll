import { NavLink, Outlet } from "react-router";

const link = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm ${
    isActive ? "bg-zinc-100 font-medium text-zinc-900" : "text-zinc-600 hover:bg-zinc-50"
  }`;

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-white text-zinc-900">
      <nav className="flex w-56 shrink-0 flex-col gap-1 border-r border-zinc-200 p-4">
        <span className="mb-4 px-3 font-semibold">ProductiveScroll</span>
        <NavLink to="/" end className={link}>Feed</NavLink>
        <NavLink to="/boards" className={link}>Boards</NavLink>
        <NavLink to="/tags" className={link}>Tags</NavLink>
        <NavLink to="/boards/demo" className={link}>Demo board</NavLink>
      </nav>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}