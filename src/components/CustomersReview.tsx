import Container from "@/Container.tsx";
import ReviewsCarousel from "@/components/ReviewsCarousel.tsx";

const CustomersReview = () => {
    return (
        <div className="bg-[linear-gradient(to_right,#fde6e6_50%,#f67018_50%)] w-[100%] py-10">
            <Container>
                <div className="flex  flex-col  gap-5">
                    <h1 className="text-[40px] dark:text-black font-bold leading-10">
                        "WHAT OUR <br/> <span className="text-[#E0551B] whitespace-nowrap">CUSTOMER SAYS</span>"
                    </h1>

                    <ReviewsCarousel/>
                </div>
            </Container>
        </div>
    );
};

export default CustomersReview;
