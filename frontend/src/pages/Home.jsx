import HeroSection from "../component/home/HeroSection";
import StatsSection from "../component/home/StatsSection";
import FeaturedJobs from "../component/home/FeaturedJobs";

import Categories from "../component/home/Categories";
import Testimonials from "../component/home/Testimonials";
import CTASection from "../component/home/CTASection";
import EmployerBanner from "../component/home/EmployerBanner";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <HeroSection />
        <FeaturedJobs />
        <StatsSection />
        <Categories />
        <Testimonials />
        <CTASection />
        <EmployerBanner />
      </div>
    </>
  );
}
