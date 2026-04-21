import { getPageContent } from "@/lib/content";
import EnvironmentalGraphicsLanding from "@/components/services/EnvironmentalGraphicsLanding";
import type { Metadata } from "next";

const PAGE_KEY = "environmental-graphics";

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent(PAGE_KEY);
  return {
    title: content?.meta?.title ?? "Environmental Graphics & Wall Wraps | 76 Graphics",
    description: content?.meta?.description ?? "Custom wall wraps, window graphics, and environmental branding.",
  };
}

export default function EnvironmentalGraphicsPage() {
  const content = getPageContent(PAGE_KEY);
  if (!content) return null;
  return <EnvironmentalGraphicsLanding content={content} />;
}
