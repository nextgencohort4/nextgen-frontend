import {useState} from "react";
import {useSelector} from "react-redux";
import {GiHamburgerMenu} from "react-icons/gi";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import NavItems from "@/components/navbar/NavItems.tsx";
import QueryItems from "@/components/navbar/routeContants.tsx";
import {RootState} from "@/redux/store.ts";
import {Link} from "react-router-dom";

const MobileView = () => {
    const {userInfo} = useSelector((state: RootState) => state.auth);
    const [isOpen, setIsOpen] = useState(false);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <GiHamburgerMenu className="h-6 w-6 cursor-pointer lg:hidden"/>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6">
                    <NavItems onLinkClick={handleLinkClick}/>
                    <Separator/>
                    <div onClick={handleLinkClick}>
                        <QueryItems onLinkClick={handleLinkClick}/>
                    </div>
                </nav>
                {!userInfo && (
                    <Link
                        to="/login"
                        className="mt-6 block px-2 py-1 text-lg"
                        onClick={handleLinkClick}
                    >
                        Login / Sign Up
                    </Link>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default MobileView;
