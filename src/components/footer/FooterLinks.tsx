import {FaRegEnvelope} from "react-icons/fa";
import {BsTelephoneFill} from "react-icons/bs";
import {Link} from "react-router-dom";

const FooterLinks = () => {
    return (
        <div
            className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-11 lg:mt-0 mt-10 w-[60vw]">
            <ul className="flex flex-col gap-3">
                <h1 className="font-bold">My account</h1>
                <Link className="hover:underline transform duration-300" to="/login">
                    <li>Login/Register</li>
                </Link>
                <Link className="hover:underline transform duration-300" to="/profile">
                    <li>My account</li>
                </Link>
                <li>Order Status</li>
                <Link className="hover:underline transform duration-300" to="/orders">
                    <li>Order History</li>
                </Link>
                <li>Track my order</li>
            </ul>

            <ul className="flex flex-col gap-3">
                <h1 className="font-bold">Help</h1>
                <Link className="hover:underline transform duration-300" to="/contact">
                    <li>Get Help</li>
                </Link>
                <li>Order Status</li>
                <li>Returns</li>
                <Link className="hover:underline transform duration-300" to="/checkout">
                    <li>Payment Options</li>
                </Link>
            </ul>

            <ul className="flex flex-col gap-3">
                <h1 className="font-bold">Company</h1>
                <Link className="hover:underline transform duration-300" to="/about">
                    <li>About us</li>
                </Link>
                <li>News</li>
                <li>Service</li>
                <li>Our policy</li>
                <li>Customer care</li>
            </ul>

            <ul className="flex flex-col gap-3">
                <h1 className="font-bold">Hotlines</h1>
                <div className="flex items-center gap-1">
                    <FaRegEnvelope className="text-lg sm:text-xl lg:text-2xl flex-shrink-0"/>
                    <li className="text-sm">mail@trendyshoes.com</li>
                </div>
                <div className="flex items-center gap-1">
                    <BsTelephoneFill className="text-lg sm:text-xl lg:text-2xl flex-shrink-0"/>
                    <li className="text-sm sm:text-base">+2349099204983</li>
                </div>
            </ul>
        </div>
    );
};

export default FooterLinks;
