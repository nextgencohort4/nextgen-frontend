import {createBrowserRouter, ScrollRestoration} from "react-router-dom";
import SearchResults from "@/components/navbar/SearchResults.tsx";
import Layout from "@/Layout.tsx";
import Home from "@/pages/Home.tsx";
import Login from "@/pages/auth/Login.tsx";
import Register from "@/pages/auth/Register.tsx";
import Contact from "@/pages/Contact.tsx";
import Shop from "@/pages/Shop.tsx";
import Cart from "@/pages/cart/Cart.tsx";
import ProductDetails from "@/pages/products/ProductDetails.tsx";
import Favorites from "@/pages/Favorites.tsx";
import ErrorPage from "@/ErrorPage.tsx";
import Profile from "@/pages/users/Profile.tsx";
import PrivateRoute from "@/components/PrivateRoute.tsx";
import Checkout from "@/pages/cart/Checkout.tsx";
import OrderDetails from "@/pages/order/OrderDetails.tsx";
import AboutMain from "@/pages/about/AboutMain.tsx";
import PaymentSuccessConfetti from "@/pages/order/PaymentSuccessConfetti.tsx";
import AdminRoute from "@/pages/admin/AdminRoute.tsx";
import ProductList from "@/pages/admin/ProductList.tsx";
import AddProduct from "@/pages/admin/AddProduct.tsx";

const Routes = () => {
    return createBrowserRouter([
        {
            path: "/",
            element: (
                <>
                    <ScrollRestoration/>
                    <Layout/>
                </>
            ),
            children: [
                {path: "", element: <Home/>},
                {path: "login", element: <Login/>},
                {path: "register", element: <Register/>},
                {path: "contact", element: <Contact/>},
                {path: "shop", element: <Shop/>},
                {path: "about", element: <AboutMain/>},
                {path: "cart", element: <Cart/>},
                {path: "product/:id", element: <ProductDetails/>},
                {path: "favorites", element: <Favorites/>},
                {path: "search", element: <SearchResults/>},
                {path: "checkout", element: <Checkout/>},
                {path: "success", element: <PaymentSuccessConfetti/>},

                // Only registered users routes
                {
                    path: "",
                    element: <PrivateRoute/>,
                    children: [
                        {path: "profile", element: <Profile/>},
                        {path: "orders", element: <OrderDetails/>},
                    ],
                },

                // Admin user routes
                {
                    path: "admin",
                    element: <AdminRoute/>,
                    children: [
                        {path: "add-product", element: <AddProduct/>},
                        {path: "product-list", element: <ProductList/>},
                    ],
                },
            ],
            errorElement: <ErrorPage/>,
        }
    ]);
};

export default Routes;
