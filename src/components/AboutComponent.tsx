import rider from "@/assets/pngwing.com (17) 1.webp";
import Container from "@/Container.tsx";
import {Button} from "@/components/ui/button.tsx";
import LazyImage from "@/components/LazyImage.tsx";
import {Link} from "react-router-dom";

const AboutComponent = () => {
    return (
        <div
            className="lg:my-10 my-32 lg:py-0 py-10 bg-custom-brown-gradient text-[#fff]">
            <Container>
                <div className="flex lg:flex-row flex-col justify-center items-center gap-20">
                    <LazyImage
                        src={rider}
                        className="object-cover w-[472px] h-[600px] -mt-32"
                        alt=""
                    />
                    <div className="flex flex-col gap-5">
                        <h1 className="text-[#E0551B] text-2xl font-bold">About us</h1>
                        <h1 className="text-[40px] font-bold leading-10">
                            WE DELIVER <span className="text-[#E0551B]">EXCEPTIONAL</span> <br/> FOOTWEAR
                        </h1>
                        <p className="text-sm">
                            We are passionate about delivering exceptional footwear <br/> that combines comfort,
                            quality, and style, ensuring every <br/> step you take is a confident one.
                        </p>

                        <Link to="/shop">
                            <Button className="bg-[#E0551B] hover:bg-[#E0551B] dark:text-white font-bold w-[98px]">
                                Explore more
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AboutComponent;
