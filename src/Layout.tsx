import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "@/components/navbar/Navigation.tsx";
import Footer from "@/components/footer/Footer.tsx";

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <ToastContainer/>
            <Navigation/>
            <div style={{flex: 1}}>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;
