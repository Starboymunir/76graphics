import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import Process from "@/components/Process";
import ShowcaseRail from "@/components/ShowcaseRail";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import ByTheNumbers from "@/components/ByTheNumbers";
import FinalCTA from "@/components/FinalCTA";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import KineticMarquee from "@/components/KineticMarquee";
import WrapApplyDemo from "@/components/WrapApplyDemo";
import WrapConfigurator from "@/components/WrapConfigurator";

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
        <ShowcaseRail />
        <WrapConfigurator />
        <WrapApplyDemo />
        <WhyUs />
        <ByTheNumbers />
        <Testimonials />
        <FinalCTA />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
