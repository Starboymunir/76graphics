import { getPageContent } from "@/lib/content";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import type { Metadata } from "next";

const PAGE_KEY = "vehicle-wraps";

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent(PAGE_KEY);
  return {
    title: content?.meta?.title ?? "Custom Vehicle Wraps | 76 Graphics",
    description: content?.meta?.description ?? "Custom vehicle wraps that turn your car into a moving billboard.",
  };
}

export default function VehicleWrapsPage() {
  const content = getPageContent(PAGE_KEY);
  if (!content) return null;
  return <ServicePageTemplate content={content} />;
}
