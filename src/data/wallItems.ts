// Showcase tiles for the scrolling wall on the login page.
export type WallItem =
  | { kind: "media"; source: string; title: string; color: string; height: number; duration?: string }
  | { kind: "text"; source: string; quote: string; handle: string }
  | { kind: "article"; domain: string; title: string; color: string; height: number };
 
export const wallColumns: WallItem[][] = [
  [
    { kind: "media", source: "TikTok", title: "Why pedestrian streets boost local shops", color: "#B9A48A", height: 220, duration: "1:42" },
    { kind: "text", source: "X · Thread", quote: "The best transit maps optimize for the person standing at the stop.", handle: "@wayfindingnotes" },
    { kind: "media", source: "Instagram", title: "Shelving system study", color: "#3F4A52", height: 170 },
    { kind: "article", domain: "thetransitreader.com", title: "A 15 minute city in a winter climate", color: "#D8CFC4", height: 96 },
    { kind: "media", source: "YouTube", title: "Tactical urbanism in 48 hours", color: "#9AA88F", height: 240, duration: "6:05" },
  ],
  [
    { kind: "media", source: "YouTube", title: "Inverted method, start to finish", color: "#7A8B76", height: 260, duration: "18:24" },
    { kind: "media", source: "Pinterest", title: "Terracotta facade detail", color: "#C46F45", height: 150 },
    { kind: "text", source: "Reddit · r/urbanplanning", quote: "Snow clearing order says more about a city than its official plan.", handle: "u/northern_grid" },
    { kind: "media", source: "TikTok", title: "18 square metre apartment tour", color: "#2F2B28", height: 210, duration: "0:38" },
    { kind: "article", domain: "fieldnotes.blog", title: "Why notes should stay unfinished", color: "#6E7F8D", height: 110 },
  ],
  [
    { kind: "media", source: "Instagram", title: "Braun radio, 1961", color: "#E1D6C2", height: 180 },
    { kind: "text", source: "X · Post", quote: "Spatial interfaces need fewer panels and more places.", handle: "@uxresearcher" },
    { kind: "media", source: "YouTube", title: "How Copenhagen built its bike network", color: "#CBB9A0", height: 240, duration: "12:47" },
    { kind: "media", source: "TikTok", title: "Pour over ratios, explained fast", color: "#D9A86C", height: 160, duration: "0:21" },
    { kind: "media", source: "Instagram", title: "Concrete stair, Kyoto", color: "#4D5A63", height: 200 },
  ],
];