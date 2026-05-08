import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
// import Packages from "@/components/Packages"; // Hidden until client finalizes pricing
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import CaseStudies from "@/components/CaseStudies";
import FinalCTA from "@/components/FinalCTA";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import KineticMarquee from "@/components/KineticMarquee";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <KineticMarquee />
        <Process />
        <Portfolio />
        {/* <Packages /> — Hidden until client finalizes pricing */}
        <WhyUs />
        <Testimonials />
        <CaseStudies />
        <FinalCTA />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
