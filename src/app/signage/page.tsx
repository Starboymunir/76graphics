import { getPageContent } from "@/lib/content";
import SignageLanding from "@/components/services/SignageLanding";
import type { Metadata } from "next";

const PAGE_KEY = "signage";

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent(PAGE_KEY);
  return {
    title: content?.meta?.title ?? "Custom Business Signage | 76 Graphics",
    description: content?.meta?.description ?? "Custom business signage that gets you noticed.",
  };
}

export default function SignagePage() {
  const content = getPageContent(PAGE_KEY);
  if (!content) return null;
  return <SignageLanding content={content} />;
}
