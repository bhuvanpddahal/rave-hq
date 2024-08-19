import Footer from "./Footer";
import Navbar from "./Navbar";
import FAQSection from "./FAQSection";
import HeroSection from "./HeroSection";
import PricingSection from "./PricingSection";
import IllustrationSection from "./IllustrationSection";

export const metadata = {
    title: "Introducing the ultimate testimonial collection and management platform"
};

const LandingPage = () => {
    return (
        <main>
            <Navbar />
            <HeroSection />
            <IllustrationSection />
            <PricingSection />
            <FAQSection />
            <Footer />
        </main>
    );
};

export default LandingPage;