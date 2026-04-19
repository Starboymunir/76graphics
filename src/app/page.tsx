import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Packages from "@/components/Packages";
import Testimonials from "@/components/Testimonials";
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
        <Portfolio />
        <Packages />
        <Testimonials />
        <CaseStudies />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
