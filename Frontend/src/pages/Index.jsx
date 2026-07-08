import Header from "../components/templates/Header";
import Footer from "../components/templates/Footer";
import Hero from "../components/index/Hero";
import Stats from "../components/index/Stats";
import About from "../components/index/About";
import HowToHelp from "../components/index/HowToHelp";
import RecentRescues from "../components/index/RecentRescues";
import CallToAction from "../components/index/CallToAction";

export default function Index() {
  return (
    <div className="bg-[#FAF7EF] text-[#1C2620] font-[Inter,sans-serif] antialiased">
      <Header />
      <Hero />
      <Stats />
      <About />
      <HowToHelp />
      <RecentRescues />
      <CallToAction />
      <Footer />
    </div>
  );
}
