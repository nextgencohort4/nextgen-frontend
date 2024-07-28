import React from "react";
import {IoMdCheckmark} from "react-icons/io";

interface ProgressStepsProps {
    step1: boolean;
    step2: boolean;
    step3: boolean;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({step1, step2, step3}) => {
    return (
        <div className="flex justify-center items-center space-x-2 sm:space-x-4 my-10 px-4 overflow-x-auto w-full">
            <Step label="Cart" completed={step1}/>

            <Line completed={step1}/>
            <Step label="Checkout" completed={step2}/>

            <Line completed={step2}/>
            <Step label="Complete" completed={step3}/>
        </div>
    );
};

const Step: React.FC<{ label: string; completed: boolean }> = ({label, completed,}) => (
    <div
        className={`flex flex-col items-center ${completed ? "text-[#ff6b2d] font-bold" : "text-gray-300"}`}>
        <span className="text-xs sm:text-sm md:text-base whitespace-nowrap">{label}</span>
        {completed && (
            <div className="mt-1 sm:mt-2 text-base sm:text-lg text-center">
                <IoMdCheckmark className="text-[#fff] rounded-full bg-[#472911] font-bold"/>
            </div>
        )}
    </div>
);

const Line: React.FC<{ completed: boolean }> = ({completed}) => (
    <div
        className={`h-0.5 w-8 sm:w-16 md:w-24 lg:w-32 ${completed ? "bg-[#ff6b2d]" : "bg-gray-300"}`}/>
);

export default ProgressSteps;
