import {useEffect} from "react";
import confetti from "canvas-confetti";
import ProgressSteps from "@/components/ProgressSteps.tsx";
import {Link} from "react-router-dom";
import {GoChevronLeft} from "react-icons/go";
import Container from "@/Container.tsx";
import SuccessMessage from "@/pages/order/SuccessMessage.tsx";
import RevelOnScroll from "@/components/RevealOnScroll.tsx";


const PaymentSuccessConfetti = () => {
    useEffect(() => {
        // Trigger confetti effect when component mounts
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {y: 0.6}
        });
    }, []);

    return (
        <RevelOnScroll>
            <Container>
                <ProgressSteps step1={true} step2={true} step3={true}/>
                <div className="flex flex-col items-center justify-center my-20">
                    <SuccessMessage/>
                    <Link className="flex items-center capitalize font-bold hover:underline mt-10" to="/orders">
                        <GoChevronLeft/>
                        see your order history
                    </Link>
                </div>
            </Container>
        </RevelOnScroll>
    );
};

export default PaymentSuccessConfetti;
