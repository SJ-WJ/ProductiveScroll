import { Navigate, Outlet } from "react-router";
import { useSession } from "../lib/useSession";

export default function RequireAuth() {
  const session = useSession();

  if (session === undefined) return null;
  if (session === null) return <Navigate to="/login" replace />;
  return <Outlet />;
}