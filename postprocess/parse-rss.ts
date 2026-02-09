import { parse } from "https://deno.land/x/xml@2.1.3/mod.ts";

const inputFile = Deno.args[0];
const outputFile = "_data/episodes.json";

const xml = await Deno.readTextFile(inputFile);
const parsed = parse(xml) as Record<string, any>;

const channel = parsed.rss.channel;
const items = Array.isArray(channel.item) ? channel.item : [channel.item];

interface Episode {
  title: string;
  description: string;
  pubDate: string;
  rawDate: string;
  duration: string;
  image: string;
  link: string;
  audioUrl: string;
  episodeNumber: number;
  season: number;
}

function formatDuration(raw: string): string {
  const parts = String(raw).split(":").map(Number);
  let totalMinutes: number;
  if (parts.length === 3) {
    totalMinutes = parts[0] * 60 + parts[1] + (parts[2] >= 30 ? 1 : 0);
  } else if (parts.length === 2) {
    totalMinutes = parts[0] + (parts[1] >= 30 ? 1 : 0);
  } else {
    totalMinutes = Math.ceil(parts[0] / 60);
  }
  return `${totalMinutes} MIN`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function stripHtml(str: string): string {
  return String(str).replace(/<[^>]*>/g, "").trim();
}

const episodes: Episode[] = items.map((item: any) => {
  const dateObj = new Date(item.pubDate);

  const image =
    item["itunes:image"]?.["@href"] ??
    channel["itunes:image"]?.["@href"] ??
    "";

  return {
    title: String(item.title ?? ""),
    description: stripHtml(item.description ?? ""),
    pubDate: formatDate(item.pubDate),
    rawDate: dateObj.toISOString(),
    duration: formatDuration(item["itunes:duration"] ?? "0"),
    image,
    link: String(item.link ?? ""),
    audioUrl: String(item.enclosure?.["@url"] ?? ""),
    episodeNumber: Number(item["itunes:episode"] ?? 0),
    season: Number(item["itunes:season"] ?? 0),
  };
});

episodes.sort(
  (a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime()
);

await Deno.writeTextFile(outputFile, JSON.stringify(episodes, null, 2) + "\n");
await Deno.remove(inputFile);

console.log(`Wrote ${episodes.length} episodes to ${outputFile}`);
