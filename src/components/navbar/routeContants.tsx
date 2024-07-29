import React, {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {IoSearchOutline} from "react-icons/io5";
import {FaRegHeart} from "react-icons/fa";
import {MdOutlineShoppingCart} from "react-icons/md";
import {Input} from "@/components/ui/input.tsx";
import {CartItem} from "@/types/Cart.ts";

// Define the structure of the Redux state
interface RootState {
    cart: {
        cartItems: CartItem[];
    };
}

export const headerLinks = [
    {
        label: "Home",
        route: "/"
    },
    {
        label: "Shop",
        route: "/shop"
    },
    {
        label: "About",
        route: "/about"
    },
    {
        label: "Help?",
        route: "/contact"
    }
];

interface QueryItemsProps {
    onLinkClick?: () => void;
}

export const QueryItems: React.FC<QueryItemsProps> = ({onLinkClick}) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const navigate = useNavigate();

    // Get cart items from Redux state
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    // Calculate total number of items in cart
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery(""); // reset the search query on successful search
            onLinkClick?.(); // Close sidenav after search
        }
    };

    return (
        <div className="lg:flex items-center">
            <form onSubmit={handleSearch} className="relative lg:px-10">
                <IoSearchOutline
                    className="absolute top-3 text-lg text-[#000] dark:bg-gray-800 dark:text-white lg:left-12 left-5"/>
                <Input
                    className="text-[#000] dark:bg-gray-800 dark:text-white font-bold rounded-full lg:px-8 px-10"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
            </form>
            <div className="flex gap-5 lg:mt-0 mt-5">
                <Link to="/favorites" onClick={onLinkClick}>
                    <FaRegHeart size={25}/>
                </Link>
                <Link to="/cart" className="relative" onClick={onLinkClick}>
                    <MdOutlineShoppingCart size={25}/>
                    {itemCount > 0 && (
                        <p
                            className="absolute -top-2 -right-2 bg-[#e15420] font-bold text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {itemCount}
                        </p>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default QueryItems;
