import { getPageContent } from "@/lib/content";
import BrandingLanding from "@/components/services/BrandingLanding";
import type { Metadata } from "next";

const PAGE_KEY = "branding-services";

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent(PAGE_KEY);
  return {
    title: content?.meta?.title ?? "Professional Branding Services | 76 Graphics",
    description: content?.meta?.description ?? "Professional branding services for businesses that want to stand out.",
  };
}

export default function BrandingServicesPage() {
  const content = getPageContent(PAGE_KEY);
  if (!content) return null;
  return <BrandingLanding content={content} />;
}
