import fs from "fs";
import path from "path";

const CONTENT_PATH = path.join(process.cwd(), "data", "content.json");

/* ── Types ── */

export interface HeroContent {
  image: string;
  tag: string;
  headline1: string;
  headline2: string;
  headline3?: string;
  description: string;
  ctaText: string;
  ctaText2?: string;
}

export interface PageContent {
  hero: HeroContent;
  gallery?: {
    scene1?: string;
    scene2?: string;
  };
  includes?: {
    sectionLabel?: string;
    heading: string;
    items: string[];
  };
  infoBox?: { title: string; text: string };
  infoBox2?: { title: string; text: string };
  quote?: { text: string; author: string };
  useCases?: string[];
  featuredImage?: string;
  cta?: {
    headline: string;
    description: string;
    ctaText: string;
  };
  meta?: { title: string; description: string };
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  tags: string;
  photo: string;
  summary?: string;
  url?: string;
}

/* ── Reads ── */

export function getAllContent(): Record<string, unknown> {
  const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
  return JSON.parse(raw);
}

export function getPageContent(page: string): PageContent | null {
  const all = getAllContent();
  return (all[page] as PageContent) ?? null;
}

export function getPortfolio(): PortfolioItem[] {
  const all = getAllContent();
  return (all.portfolio as PortfolioItem[]) ?? [];
}

/* ── Writes ── */

export function updatePageContent(page: string, content: PageContent): void {
  const all = getAllContent();
  all[page] = content;
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(all, null, 2), "utf-8");
}

export function updatePortfolio(items: PortfolioItem[]): void {
  const all = getAllContent();
  all.portfolio = items;
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(all, null, 2), "utf-8");
}
