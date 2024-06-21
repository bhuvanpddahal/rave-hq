import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/Accordion";
import Image from "next/image";

const faqItems = [
    {
        question: "What is RaveHQ?",
        answer: "RaveHQ is a user-friendly platform designed to help businesses collect, manage, and showcase customer testimonials effectively."
    },
    {
        question: "Is RaveHQ free to use?",
        answer: "Yes! We offer a plan that is free of cost which includes all the essential features you need to get started with testimonial collection and management."
    },
    {
        question: "Do I need a credit card to sign up for RaveHQ?",
        answer: "No credit card is required to sign up for RaveHQ."
    },
    {
        question: "How can I collect testimonials with RaveHQ?",
        answer: "While RaveHQ doesn't currently offer testimonial creation widgets you can embed on your website, you can leverage our API to programmatically collect testimonials. Our documentation provides details on how to structure data and send API requests to create testimonials."
    },
    {
        question: "Can I edit or filter my testimonials?",
        answer: "While RaveHQ doesn't offer the edit functionality, you still can filter testimonials based on various criteria for easier management."
    },
    {
        question: "Does RaveHQ offer widgets?",
        answer: "No. We don't offer any widgets, the only way to create testimonials from your site is to request to our api endpoint with necessary information. It might get introduced in the future though."
    },
    {
        question: "How can I display testimonials on my website?",
        answer: "While RaveHQ doesn't offer pre-built testimonial widgets in the free plan, you can leverage the API data to display testimonials on your website or copy the testimonial directly from your RaveHQ testimonials page."
    },
    {
        question: "Can I integrate RaveHQ with social media platforms?",
        answer: "Social media integration is not currently available. However, you can manually copy and share your testimonials on social media platforms."
    },
    {
        question: "Does RaveHQ offer any analytics for my app's performance?",
        answer: "Yes, RaveHQ offers analytics to help you understand the performance of your app and gain valuable insights with beautiful charts!"
    }
];

const FAQSection = () => {
    return (
        <section id="faq" className="bg-white">
            <div className="relative max-w-7xl mx-auto flex flex-col items-center justify-center gap-16 lg:gap-20 px-4 py-10 lg:py-20">
                <div className="relative flex flex-col items-center justify-center text-center">
                    <h1 className="font-black text-zinc-800 text-4xl lg:text-5xl tracking-tight">
                        Get your questions
                        <span className="text-primary"> answered</span>
                    </h1>
                    <p className="max-w-4xl text-base lg:text-lg font-medium text-slate-700 mt-3 lg:mt-4">
                        We aim to answer some of the most common questions users have about our platform. If your question isn&apos;t addressed here, feel free to reach out to our friendly support team.
                    </p>
                </div>
                <div className="relative max-w-lg w-full lg:ml-[240px] shrink-0">
                    <Image
                        src="/questions.png"
                        alt="Questions"
                        height={200}
                        width={200}
                        className="hidden lg:block absolute top-0 right-[calc(100%+40px)]"
                    />
                    <Accordion type="single" collapsible>
                        {faqItems.map((item, index) => (
                            <AccordionItem key={index} value={`value-${index + 1}`}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
};

export default FAQSection;