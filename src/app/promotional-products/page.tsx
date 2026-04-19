import { getPageContent } from "@/lib/content";
import ServicePageTemplate from "@/components/ServicePageTemplate";
import type { Metadata } from "next";

const PAGE_KEY = "promotional-products";

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent(PAGE_KEY);
  return {
    title: content?.meta?.title ?? "Custom Promotional Products | 76 Graphics",
    description: content?.meta?.description ?? "Custom promotional products that keep your brand in people's hands.",
  };
}

export default function PromotionalProductsPage() {
  const content = getPageContent(PAGE_KEY);
  if (!content) return null;
  return <ServicePageTemplate content={content} />;
}
