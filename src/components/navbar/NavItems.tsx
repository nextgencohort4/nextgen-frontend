import {Link, useLocation} from "react-router-dom";
import {headerLinks} from "@/components/navbar/routeContants.tsx";

interface NavItemsProps {
    onLinkClick?: () => void;
}

const NavItems = ({onLinkClick}: NavItemsProps) => {
    const location = useLocation();

    return (
        <ul className="md:flex-between flex w-full flex-col items-start gap-10 md:flex-row">
            {headerLinks.map((link) => {
                const isActive = location.pathname === link.route;

                return (
                    <li
                        key={link.route}
                        className={`${
                            isActive
                                ? "text-primary-500 font-bold"
                                : "text-gray-500 font-normal hover:text-primary-500"
                        } flex-center p-medium-16 whitespace-nowrap transition-colors duration-200`}
                    >
                        <Link to={link.route} onClick={onLinkClick}>
                            {link.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default NavItems;
