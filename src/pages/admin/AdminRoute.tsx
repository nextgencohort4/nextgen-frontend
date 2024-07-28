import {useSelector} from "react-redux";
import {RootState} from "@/redux/store.ts";
import {Navigate, Outlet} from "react-router-dom";

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

const AdminRoute = () => {
    const {userInfo} = useSelector((state: RootState) => state.auth) as { userInfo: UserInfo | null };

    const isAdmin = userInfo?.user.role === "admin";

    return userInfo && isAdmin ? (
        <Outlet/>
    ) : (
        <Navigate to="/login" replace/>
    );
};

export default AdminRoute;
