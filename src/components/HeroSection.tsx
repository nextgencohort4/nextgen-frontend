import heroImage from "@/assets/pngwing.com 1.webp";
import Container from "@/Container.tsx";
import {Button} from "@/components/ui/button.tsx";
import LazyImage from "@/components/LazyImage.tsx";
import {Link} from "react-router-dom";

const HeroSection = () => {
    return (
        <div className="bg-gradient-to-b from-[#180a01] to-[#6e3002] text-[#fff] py-10">
            <Container>
                <div className="flex md:flex-row flex-col-reverse justify-center items-center gap-20 py-24">
                    <div className="flex flex-col gap-5">
                        <h1 className="lg:text-[64px] md:text-[70px] text-[40px] md:leading-[65px] leading-10 font-bold">
                            Discover your <br/> best shoes
                        </h1>
                        <p className="text-[20px] leading-[23.7px]">
                            Step into comfort and style with our <br/> premium selection of footwear.
                        </p>
                        <Link to="/shop">
                            <Button className="bg-[#E0551B] hover:bg-[#E0551B] w-[98px]">
                                Shop Now
                            </Button>
                        </Link>
                    </div>

                    <div className="">
                        <LazyImage
                            src={heroImage}
                            alt="hero"
                            className="lg:w-[530px] lg:h-[402px]"
                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HeroSection;
