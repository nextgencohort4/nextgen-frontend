import {Link} from "react-router-dom";
import {FaShopware} from "react-icons/fa";

const Logo = () => {
    return (
        <div>
            <Link className="flex flex-col items-center" to="/">
                <FaShopware className="object-cover text-[#e0551b]" size={40}/>
                <span className="text-xs text-white font-bold capitalize">shoes</span>
            </Link>
        </div>
    );
};

export default Logo;
