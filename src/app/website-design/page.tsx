import { getPageContent } from "@/lib/content";
import WebsiteDesignLanding from "@/components/services/WebsiteDesignLanding";
import type { Metadata } from "next";

const PAGE_KEY = "website-design";

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent(PAGE_KEY);
  return {
    title: content?.meta?.title ?? "Custom Website Design | 76 Graphics",
    description: content?.meta?.description ?? "Custom website design that converts visitors into customers.",
  };
}

export default function WebsiteDesignPage() {
  const content = getPageContent(PAGE_KEY);
  if (!content) return null;
  return <WebsiteDesignLanding content={content} />;
}
