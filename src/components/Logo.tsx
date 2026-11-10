type LogoProps = { inverted?: boolean };

export default function Logo({ inverted = false }: LogoProps) {
  return (
    <div className = "flex items-center gap-2">
      <div className = {`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold tracking-tight ${inverted ? "bg-white text-zinc-900" : "bg-zinc-900 text-white"}`}>
        PS
      </div>
      <span className="font-semibold">ProductiveScroll</span>
    </div>
  );
}