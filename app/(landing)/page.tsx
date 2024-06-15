import Footer from "./Footer";
import Navbar from "./Navbar";
import FAQSection from "./FAQSection";
import HeroSection from "./HeroSection";
import PricingSection from "./PricingSection";
import FeaturesSection from "./FeaturesSection";

export const metadata = {
    title: "Quickly setup your project with preconfigured assets using QuickCodeKit"
};

const LandingPage = () => {
    return (
        <main>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <PricingSection />
            <FAQSection />
            <Footer />
        </main>
    )
};

export default LandingPage;