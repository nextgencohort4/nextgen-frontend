import React from "react";
import {IoMdCheckmark} from "react-icons/io";

interface ProgressStepsProps {
    step1: boolean;
    step2: boolean;
    step3: boolean;
    step4: boolean;
    step5: boolean;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({step1, step2, step3, step4, step5}) => {
    return (
        <div className="flex flex-col items-start space-y-1 my-10 w-full max-w-md">
            <Step label="Order Placed" description="We have received your order on 15th July" completed={step1}/>
            <Line completed={step1}/>
            <Step label="Order Confirmed" description="Your order has been confirmed" completed={step2}/>
            <Line completed={step2}/>
            <Step label="Order Processed" description="Your order is being processed" completed={step3}/>
            <Line completed={step3}/>
            <Step label="Ready to Ship" description="Your order is ready for shipping" completed={step4}/>
            <Line completed={step4}/>
            <Step label="Delivered" description="Your order has been delivered" completed={step5}/>
        </div>
    );
};

const Step: React.FC<{ label: string; description: string; completed: boolean }> = ({
                                                                                        label,
                                                                                        description,
                                                                                        completed
                                                                                    }) => (
    <div className={`flex items-start ${completed ? "text-[#ff6b2d] font-bold" : "text-gray-300"}`}>
        <div className="mr-4">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                completed ? "border-[#ff6b2d] bg-[#ff6b2d]" : "border-gray-300"
            }`}>
                {completed && <IoMdCheckmark className="text-[#fff]"/>}
            </div>
        </div>
        <div className="flex flex-col">
            <span className="text-xs sm:text-sm md:text-base">{label}</span>
            <span className="text-xs sm:text-sm text-gray-500 mt-1">{description}</span>
        </div>
    </div>
);

const Line: React.FC<{ completed: boolean }> = ({completed}) => (
    <div className={`h-8 w-0.5 ml-4 ${completed ? "bg-[#ff6b2d]" : "bg-gray-300"}`}/>
);

export default ProgressSteps;
