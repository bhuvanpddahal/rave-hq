import ApiKeyModal from "./ApiKeyModal";
import NewAppModal from "./NewAppModal";
import ApiKeyHelpModal from "./ApiKeyHelpModal";
import NewTestimonialModal from "./NewTestimonialModal";
import DeleteTestimonialsModal from "./DeleteTestimonialsModal";

const Modals = () => {
    return (
        <>
            <NewAppModal />
            <ApiKeyModal />
            <ApiKeyHelpModal />
            <NewTestimonialModal />
            <DeleteTestimonialsModal />
        </>
    )
};

export default Modals;