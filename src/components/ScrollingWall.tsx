import { wallColumns, type WallItem } from "../data/wallItems";
 
// Seconds per loop, and how far into the loop each column starts, so the columns never line up.
const COLUMN_TIMING = [
  { duration: 50, delay: 0 },
  { duration: 65, delay: 20 },
  { duration: 43, delay: 10 },
];
 
function Tile({ item }: { item: WallItem }) {
  if (item.kind === "text") {
    return (
      <div className="flex flex-col gap-2.5 rounded-tile bg-zinc-800 p-3.5">
        <span className="text-2xs font-medium text-zinc-400">{item.source}</span>
        <p className="text-sm font-medium text-zinc-100">{item.quote}</p>
        <span className="text-2xs text-zinc-400">{item.handle}</span>
      </div>
    );
  }
 
  if (item.kind === "article") {
    return (
      <div className="overflow-hidden rounded-tile bg-zinc-800">
        <div style={{ height: item.height, background: item.color }} />
        <div className="flex flex-col gap-1 px-3 pt-2.5 pb-3">
          <span className="text-2xs text-zinc-400">{item.domain}</span>
          <p className="text-[13px] leading-[18px] font-semibold text-zinc-100">{item.title}</p>
        </div>
      </div>
    );
  }
 
  return (
    <div className="relative overflow-hidden rounded-tile" style={{ height: item.height, background: item.color }}>
      <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2 py-0.5 text-2xs font-medium text-zinc-900">
        {item.source}
      </span>
      {item.duration && (
        <span className="absolute right-2.5 bottom-2.5 rounded-full bg-black/60 px-1.5 py-0.5 text-2xs font-medium text-white">
          {item.duration}
        </span>
      )}
      <p className="absolute inset-x-2.5 bottom-2.5 pr-11 text-xs font-semibold text-white text-shadow-tile">{item.title}</p>
    </div>
  );
}
 
export default function ScrollingWall() {
  return (
    <div aria-hidden="true" className="wall-mask grid min-h-0 flex-1 grid-cols-3 gap-3 overflow-hidden px-8">
      {wallColumns.map((column, i) => (
        <div
          key={i}
          className="wall-col"
          style={{ animationDuration: `${COLUMN_TIMING[i].duration}s`, animationDelay: `-${COLUMN_TIMING[i].delay}s` }}
        >
          {[...column, ...column].map((item, j) => (
            <div key={j} className="mb-3">
              <Tile item={item} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}