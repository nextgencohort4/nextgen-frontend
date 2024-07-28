import facebook from "@/assets/Vector.png";
import instagram from "@/assets/Vector (1).png";
import twitter from "@/assets/Vector (2).png";
import tiktok from "@/assets/Vector (3).png";
import Logo from "@/components/navbar/Logo.tsx";

const FooterSocials = () => {
    return (
        <div className="flex flex-col gap-10 w-[40vw]">
            <div className="flex justify-start">
                <Logo/>
            </div>

            <div className="flex items-center gap-5">
                <img src={facebook} className="w-[24px] h-[24px]" alt="facebook logo"/>
                <img src={instagram} className="w-[24px] h-[24px]" alt="instagram logo"/>
                <img src={twitter} className="w-[24px] h-[24px]" alt="twitter logo"/>
                <img src={tiktok} className="w-[24px] h-[24px]" alt="tiktok logo"/>
            </div>
        </div>
    );
};

export default FooterSocials;
