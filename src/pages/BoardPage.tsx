import { Link, useParams } from "react-router";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

export default function BoardPage() {
  const { boardId } = useParams();

  return (
    <div className="fixed inset-0">
      <Tldraw persistenceKey={`board-${boardId}`} />
      <Link
        to="/boards"
        className="absolute left-1/2 top-2 z-[1000] -translate-x-1/2 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-zinc-50"
      >
        ← Back to boards
      </Link>
    </div>
  );
}