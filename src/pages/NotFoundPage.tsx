import { Link } from "react-router";
export default function NotFoundPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link to="/" className="text-indigo-600">Back to your library</Link>
    </div>
  );
}