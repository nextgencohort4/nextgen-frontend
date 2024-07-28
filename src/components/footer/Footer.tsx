import FooterSocials from "./FooterSocials.tsx";
import FooterLinks from "./FooterLinks.tsx";
import Newsletter from "@/components/footer/Newsletter.tsx";
import RevelOnScroll from "@/components/RevealOnScroll.tsx";

const Footer = () => {
    return (
        <RevelOnScroll>
            <div className="xl:px-20 md:px-10 sm:px-2 px-4 py-5 bg-[#180A00] text-[#fff]">
                <div className="flex flex-col justify-center gap-10">
                    <h1 className="text-center lg:text-xl font-bold">Get a 20% off on all products</h1>
                    <Newsletter/>
                    <div className="lg:flex">
                        <FooterSocials/>
                        <FooterLinks/>
                    </div>
                </div>
            </div>
        </RevelOnScroll>
    );
};

export default Footer;
