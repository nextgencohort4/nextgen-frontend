import {ToastOptions} from "react-toastify";
import React from "react";

interface ResponsiveStyle extends React.CSSProperties {
    [key: string]: any;
}

interface ResponsiveToastOptions extends ToastOptions {
    style?: ResponsiveStyle;
}

export const toastConfig: ResponsiveToastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
        background: "#fff",
        color: "#000000",
        borderRadius: "8px",
        padding: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontSize: "14px",
        maxWidth: "90%",
        width: "300px",
        margin: "0 auto",
        "@media (min-width: 480px)": {
            fontSize: "16px",
            padding: "14px",
            width: "350px",
        },
        "@media (min-width: 768px)": {
            fontSize: "18px",
            padding: "16px",
            width: "400px",
        },
        "@media (min-width: 1024px)": {
            fontSize: "20px",
            padding: "18px",
            width: "450px",
        },
    },
};
