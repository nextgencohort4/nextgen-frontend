import React from "react";

interface IContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<IContainerProps> = ({children, className = ""}) => {
    return (
        <div
            className={`w-full mx-auto ${className}`}
            style={{
                paddingLeft: "clamp(1rem, 5vw, 5rem)",
                paddingRight: "clamp(1rem, 5vw, 5rem)",
                maxWidth: "clamp(100%, 90%, 1400px)"
            }}
        >
            {children}
        </div>
    );
};

export default Container;
