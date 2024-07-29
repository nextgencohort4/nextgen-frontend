import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import NavItems from "./NavItems.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "../ui/dropdown-menu.tsx";
import MobileView from "./MobileView.tsx";
import Logo from "./Logo.tsx";
import {QueryItems} from "./routeContants.tsx";
import Container from "@/Container.tsx";
import {RootState} from "@/redux/store.ts";
import {logout} from "@/redux/features/authSlice.ts";
import {toast} from "react-toastify";
import {toastConfig} from "@/components/toastConfig.ts";
import ModeToggle from "@/components/ModeToggle.tsx";

interface User {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: string;
    status: string;
    token: string;
    userId: string;
}

interface UserInfo {
    user: User;
}

const Navigation: React.FC = () => {
    const {userInfo} = useSelector((state: RootState) => state.auth) as { userInfo: UserInfo | null };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        sessionStorage.removeItem("jwtToken");
        document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        dispatch(logout());
        navigate("/");

        toast.success("Logged out successfully", toastConfig);
        console.log("Logged out successfully");
    };

    const isAdmin = userInfo?.user.role === "admin";

    return (
        <div className="sticky top-0 z-20 bg-[#000] dark:bg-gray-900 text-white shadow">
            <Container className="flex items-center justify-between py-3">
                <Logo/>
                <div className="flex flex-row items-center justify-end gap-4 lg:gap-6 xl:gap-10 flex-grow">
                    <div className="md:block hidden">
                        <NavItems/>
                    </div>
                    <div className="flex items-center justify-end gap-3 w-auto min-w-[100px]">
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <span className="whitespace-nowrap text-sm lg:text-base text-white">
                                        {userInfo ? `Hello, ${userInfo.user.firstName}` : "Join | Sign In"}
                                    </span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white dark:bg-gray-800">
                                    {userInfo ? (
                                        <>
                                            <Link className="font-bold" to="/profile">
                                                <DropdownMenuItem
                                                    className="cursor-pointer capitalize text-black dark:text-white">
                                                    Profile
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuItem
                                                className="cursor-pointer capitalize font-bold text-black dark:text-white"
                                                onClick={handleLogout}>
                                                Logout
                                            </DropdownMenuItem>

                                            {isAdmin && (
                                                <>
                                                    <DropdownMenuSeparator/>
                                                    <Link className="font-bold" to="/admin/add-product">
                                                        <DropdownMenuItem
                                                            className="cursor-pointer capitalize text-black dark:text-white">
                                                            Add Product
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <Link className="font-bold" to="/admin/product-list">
                                                        <DropdownMenuItem
                                                            className="cursor-pointer capitalize text-black dark:text-white">
                                                            Product List
                                                        </DropdownMenuItem>
                                                    </Link>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <Link className="font-bold" to="/login">
                                            <DropdownMenuItem
                                                className="cursor-pointer capitalize text-black dark:text-white">
                                                Get Started
                                            </DropdownMenuItem>
                                        </Link>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <MobileView/>
                    </div>
                    <div className="lg:block hidden">
                        <QueryItems/>
                    </div>
                    <ModeToggle/>
                </div>
            </Container>
        </div>
    );
};

export default Navigation;
