import Footer from "./Footer";
import Navbar from "./Navbar";
import FAQSection from "./FAQSection";
import HeroSection from "./HeroSection";
import PricingSection from "./PricingSection";
import FeaturesSection from "./FeaturesSection";

export const metadata = {
    title: "Introducing the ultimate testimonial collection and management platform"
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