import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Sustainability from "@/components/Sustainability";
import CaseStudies from "@/components/CaseStudies";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Testimonials />
        <Sustainability />
        <CaseStudies />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
