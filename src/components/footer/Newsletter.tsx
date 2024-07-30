import {FaRegEnvelope} from "react-icons/fa";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const Newsletter = () => {
    return (
        <div
            className="md:flex items-center justify-between p-5 rounded-xl bg-[#D9D9D9] text-[#180a00] font-bold">
            <h1 className="md:mb-0 mb-5 md:text-start text-center font-bold lg:text-lg">
                SIGN UP FOR <span className="text-[#E0551B]">UPDATES</span> AND NEWSLETTER
            </h1>
            <div className="flex md:flex-row flex-col items-center gap-5">
                <div className="relative">
                    <FaRegEnvelope className="absolute top-3 text-[#909090] left-3" size={20}/>
                    <Input
                        type="email"
                        className="text-[#180a00] bg-inherit border border-[#909090] font-bold px-10"
                        placeholder="Enter your email address"
                    />
                </div>
                <Button className="bg-[#E0551B] hover:bg-[#E0551B] dark:text-white font-bold">
                    Subscribe
                </Button>
            </div>
        </div>
    );
};

export default Newsletter;
