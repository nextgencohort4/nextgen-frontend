import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useProfileMutation} from "@/redux/api/userApiSlice.ts";
import {toast} from "react-toastify";
import {setCredentials} from "@/redux/features/authSlice.ts";
import {RootState} from "@/redux/store.ts";
import {Input} from "@/components/ui/input.tsx";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {Button} from "@/components/ui/button.tsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {toastConfig} from "@/components/toastConfig.ts";
import Container from "@/Container.tsx";
import {SkeletonDemo} from "@/components/Loader.tsx";
import RevelOnScroll from "@/components/RevealOnScroll.tsx";

const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [updateProfile, {isLoading}] = useProfileMutation();

    const {userInfo} = useSelector((state: RootState) => state.auth);

    const {search} = useLocation();
    const searchParam = new URLSearchParams(search);
    const redirect = searchParam.get("redirect") || "/profile";

    useEffect(() => {
        if (userInfo) {
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
            setEmail(userInfo.email);
            setPhoneNumber(userInfo.phoneNumber);
        }
    }, [userInfo]);

    const validateForm = () => {
        if (!firstName || !lastName || !email || !phoneNumber) {
            toast.error("All fields are required", toastConfig);
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Invalid email format", toastConfig);
            return false;
        }
        if (password && !/^[a-zA-Z0-9]{8,30}$/.test(password)) {
            toast.error("Password must be 8-30 characters long and include only letters and numbers", toastConfig);
            return false;
        }
        if (!/^0\d{10}$/.test(phoneNumber)) {
            toast.error("Invalid phone number format", toastConfig);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await updateProfile({firstName, lastName, email, password, phoneNumber}).unwrap();
            dispatch(setCredentials({...response}));
            navigate(redirect);
            toast.success("Profile updated successfully!", toastConfig);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || error.message || "An error occurred while updating the profile", toastConfig);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <RevelOnScroll>
            <Container>
                <section className="flex flex-col items-center justify-center min-h-screen px-4">
                    <h2 className="text-2xl font-bold mb-8">Update Profile</h2>

                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        <div className="flex flex-col md:flex-row md:gap-4 gap-1 mb-6">
                            <div className="flex flex-col flex-1">
                                <label htmlFor="firstName" className="block text-sm font-bold">
                                    First Name
                                </label>
                                <Input
                                    className="border border-gray-500 p-2 w-full"
                                    type="text"
                                    placeholder="Enter your first name"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col flex-1">
                                <label htmlFor="lastName" className="block text-sm font-bold">
                                    Last Name
                                </label>
                                <Input
                                    className="border border-gray-500 p-2 w-full"
                                    type="text"
                                    placeholder="Enter your last name"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 mb-6">
                            <label htmlFor="email" className="block text-sm font-bold">
                                E-mail Address
                            </label>
                            <Input
                                className="border border-gray-500 p-2 w-full"
                                type="email"
                                placeholder="Enter email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1 mb-6">
                            <label htmlFor="password" className="block text-sm font-bold">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    className="border border-gray-500 p-2 w-full pr-10"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password (optional)"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible size={20}/> : <AiOutlineEye size={20}/>}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 mb-6">
                            <label htmlFor="phoneNumber" className="block text-sm font-bold">
                                Phone Number
                            </label>
                            <Input
                                className="border border-gray-500 p-2 w-full"
                                type="text"
                                placeholder="Enter phone number"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row md:gap-4 items-center justify-between">
                            <Button
                                className="bg-[#FF773E] hover:bg-[#FF773E] font-bold w-full md:w-auto mb-4 md:mb-0"
                                disabled={isLoading}
                                type="submit"
                            >
                                {isLoading ? "Updating..." : "Update Profile"}
                            </Button>

                            <Link to="/orders" className="text-gray-500 hover:underline">
                                My Orders
                            </Link>
                        </div>

                        {isLoading && <SkeletonDemo/>}
                    </form>
                </section>
            </Container>
        </RevelOnScroll>
    );
};

export default Profile;
