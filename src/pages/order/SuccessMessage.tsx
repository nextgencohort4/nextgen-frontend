import {IoIosCheckmark} from "react-icons/io";
import RevelOnScroll from "@/components/RevealOnScroll.tsx";

const SuccessMessage = () => {
    return (
        <RevelOnScroll>
            <div className="flex flex-col items-center gap-5 justify-center">
                <IoIosCheckmark className="bg-green-800 rounded-full font-bold text-white" size={40}/>
                <div className="flex flex-col">
                    <h1 className="text-2xl text-center font-bold">
                        Thank you, your order has been completed successfully!
                    </h1>
                    <p className="text-sm text-gray-600 md:text-start text-center">
                        Your request has been successfully completed and will be processed soon.
                    </p>
                </div>
            </div>
        </RevelOnScroll>
    );
};

export default SuccessMessage;
