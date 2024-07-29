import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "@/redux/features/cartSlice.ts";
import Container from "@/Container.tsx";
import ProgressSteps from "@/components/ProgressSteps.tsx";
import {GoChevronLeft} from "react-icons/go";
import LazyImage from "@/components/LazyImage.tsx";
import paypal from "@/assets/Rectangle 5724.png";
import googlePay from "@/assets/Rectangle 5747.png";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {toast} from "react-toastify";
import {useDeleteCartMutation, useUpdateCartMutation} from "@/redux/api/cartApiSlice.ts";
import {CartItem} from "@/types/Cart.ts";
import {toastConfig} from "@/components/toastConfig.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import RevelOnScroll from "@/components/RevealOnScroll.tsx";

interface RootState {
    cart: {
        cartItems: CartItem[];
    };
}

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);
    const {cartItems} = cart;

    const [updateCart] = useUpdateCartMutation();
    const [deleteCart] = useDeleteCartMutation();

    const handleAddToCart = async (
        product: CartItem,
        quantity: number,
        color?: string,
        size?: string | number | null
    ) => {
        try {
            const updatedItem = {
                quantity,
                size: size !== undefined ? size : product.selectedSize,
                color: color !== undefined ? color : product.selectedColor,
            };

            console.log("Updating cart with:", updatedItem);

            const result = await updateCart({cartId: product._id, formData: updatedItem}).unwrap();
            console.log("Update cart result:", result);

            dispatch(addToCart({
                ...product,
                quantity,
                selectedSize: updatedItem.size,
                selectedColor: updatedItem.color
            }));

            toast.success("Cart updated successfully", toastConfig);
        } catch (error) {
            let errorMessage = "Failed to update cart: Unknown error";

            if (typeof error === "object" && error !== null) {
                if ("status" in error) {
                    const fetchError = error as FetchBaseQueryError;
                    if (typeof fetchError.data === "object" && fetchError.data !== null && "message" in fetchError.data) {
                        errorMessage = `Failed to update cart: ${(fetchError.data as { message: string }).message}`;
                    } else {
                        errorMessage = `Failed to update cart: ${JSON.stringify(fetchError.data)}`;
                    }
                } else if (error instanceof Error) {
                    errorMessage = `Failed to update cart: ${error.message}`;
                }
            }

            console.error("Failed to update cart:", error);
            toast.error(errorMessage, toastConfig);
        }
    };

    const handleRemoveFromCart = async (id: string) => {
        try {
            await deleteCart(id).unwrap();
            dispatch(removeFromCart(id));
            toast.success("Item removed from cart", toastConfig);
        } catch (err) {
            toast.error("Failed to remove item from cart", toastConfig);
        }
    };

    const handleCheckout = () => {
        navigate("/login?redirect=/checkout");
    };

    const subtotal = cartItems.reduce(
        (acc, item) => acc + (item.discount_price || item.price) * item.quantity, 0
    );

    const shippingOptions = [
        {label: "Standard - ₦5.00", value: "standard", price: 5, date: "Sat July, 28th"},
        {label: "EXPRESS - ₦15.00", value: "express", price: 15, date: "Thu July, 18th"},
        {label: "RUSH - ₦30.00", value: "rush", price: 30, date: "Sun July, 14th"},
    ];

    const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);

    useEffect(() => {
        console.log("Current cart items:", cartItems);
    }, [cartItems]);

    const renderCartItem = (item: CartItem) => (
        <RevelOnScroll>
            <div key={item._id} className="flex flex-col gap-2 bg-[#472810] text-white px-3 py-3 sm:px-5">
                <h1 className="font-bold text-sm sm:text-base">{item.name}</h1>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                    <div className="flex flex-row gap-3">
                        {item.images && item.images.length > 0 && (
                            <LazyImage
                                src={item.images[0]}
                                alt={item.name}
                                className="w-24 h-24 sm:w-32 sm:h-32 object-cover"
                            />
                        )}
                        <div className="flex flex-col justify-between">
                            <div>
                                <Select
                                    value={item.selectedColor || ""}
                                    onValueChange={(value) => handleAddToCart(item, item.quantity, value, item.selectedSize)}
                                >
                                    <SelectTrigger
                                        className="w-24 bg-white text-black text-xs sm:text-sm capitalize font-bold">
                                        <SelectValue placeholder="Color"/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {item.colors && item.colors.map((color) => (
                                            <SelectItem
                                                key={color}
                                                value={color}
                                                className="text-black text-xs sm:text-sm capitalize font-bold"
                                            >
                                                {color}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select
                                    value={item.selectedSize?.toString() || ""}
                                    onValueChange={(value) => handleAddToCart(item, item.quantity, item.selectedColor, value)}
                                >
                                    <SelectTrigger
                                        className="w-24 bg-white text-black text-xs sm:text-sm mt-2 capitalize font-bold">
                                        <SelectValue placeholder="Size"/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {item.sizes && item.sizes.map((size) => (
                                            <SelectItem
                                                key={size?.toString() || ""}
                                                value={size?.toString() || ""}
                                                className="text-black text-xs sm:text-sm capitalize font-bold"
                                            >
                                                {size}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <p className="text-xs sm:text-sm">Item #: {item._id}</p>
                            </div>
                            <div className="mt-2">
                                <p
                                    className="cursor-pointer capitalize text-xs sm:text-sm text-[#FF750A] font-bold underline"
                                    onClick={() => handleRemoveFromCart(item._id)}
                                >
                                    remove
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between w-full sm:w-auto gap-2 sm:gap-5">
                        <div>
                            <h4 className="font-bold mb-1 text-sm">Each</h4>
                            <p className="text-xs sm:text-sm">
                                ₦{item.discount_price ? item.discount_price.toFixed(2) : item.price.toFixed(2)}
                            </p>
                            {item.discount_price && (
                                <p className="text-xs sm:text-sm line-through text-gray-400">
                                    ₦{item.price.toFixed(2)}
                                </p>
                            )}
                        </div>
                        <div>
                            <h4 className="font-bold mb-1 text-sm">Quantity</h4>
                            <Select
                                value={item.quantity.toString()}
                                onValueChange={(value) => handleAddToCart(item, Number(value), item.selectedColor, item.selectedSize)}
                            >
                                <SelectTrigger className="w-20 sm:w-24 bg-white text-black text-xs sm:text-sm">
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    {[...Array(item.countInStock || 10).keys()].map((x) => (
                                        <SelectItem
                                            key={x + 1}
                                            value={(x + 1).toString()}
                                            className="text-black text-xs sm:text-sm"
                                        >
                                            {x + 1}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <h4 className="font-bold mb-1 text-sm">Subtotal</h4>
                            <p className="text-xs sm:text-sm">
                                ₦{((item.discount_price || item.price) * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </RevelOnScroll>
    );

    return (
        <RevelOnScroll>
            <div className="my-10">
                <Container>
                    <ProgressSteps step1={true} step2={false} step3={false}/>

                    {cartItems.length === 0 ? (
                        <div>
                            <h1 className="flex gap-5">
                                Your cart is empty
                                <Link className="capitalize font-bold hover:underline" to="/shop">
                                    go to shop
                                </Link>
                            </h1>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-5">
                            <div className="flex flex-col gap-2 w-full lg:w-3/5">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Shopping Cart</h1>
                                <Link to="/shop" className="flex items-center underline">
                                    <GoChevronLeft/>
                                    <span>Continue Shopping</span>
                                </Link>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm sm:text-base text-center font-bold bg-[#7B6C60] text-white p-2 sm:p-5">
                                        Estimated Delivery Date:{" "}
                                        <span className="text-[#FF750A]">{selectedShipping.date}</span>
                                    </p>
                                    {cartItems.map((item) => (
                                        <React.Fragment key={item._id}>
                                            {renderCartItem(item)}
                                            <Separator/>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 w-full lg:w-2/5">
                                <Button
                                    className="w-full bg-[#FF773E] dark:text-white hover:bg-[#FF773E] shadow-md rounded-xl font-bold"
                                    onClick={handleCheckout}
                                >
                                    CHECKOUT
                                </Button>

                                <div className="flex flex-col gap-3 w-full">
                                    <div className="flex flex-row gap-3 sm:gap-5">
                                        <LazyImage
                                            src={paypal}
                                            alt="paypal"
                                            className="w-[48%] h-[60px] object-cover shadow-md rounded-xl p-2 cursor-pointer"
                                        />
                                        <LazyImage
                                            src={googlePay}
                                            alt="google pay"
                                            className="w-[48%] h-[60px] object-cover shadow-md rounded-xl p-2 cursor-pointer"
                                        />
                                    </div>

                                    <div>
                                        <h1 className="font-bold text-xl sm:text-2xl">Shipping Options</h1>
                                        <div>
                                            <RadioGroup
                                                value={selectedShipping.value}
                                                onValueChange={(value) =>
                                                    setSelectedShipping(
                                                        shippingOptions.find((option) => option.value === value) ||
                                                        shippingOptions[0]
                                                    )
                                                }
                                                className="flex flex-col gap-3 bg-[#7B6C60] text-white p-3 sm:p-5"
                                            >
                                                {shippingOptions.map((option) => (
                                                    <div key={option.value}>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem
                                                                value={option.value}
                                                                id={option.value}
                                                                className="border-[#FF773E] data-[state=checked]:bg-[#FF773E] data-[state=checked]:border-[#FF773E]"
                                                            />
                                                            <Label htmlFor={option.value}
                                                                   className="text-sm sm:text-base">{option.label}</Label>
                                                        </div>
                                                        <p className="text-xs sm:text-sm">Delivers by {option.date}</p>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <h1 className="font-bold text-xl sm:text-2xl">Order Summary</h1>
                                        <Separator/>

                                        <div className="flex flex-col gap-2 text-sm sm:text-base">
                                            <div className="flex justify-between">
                                                <p>Product Total</p>
                                                <p>₦{subtotal.toFixed(2)}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <div>
                                                    <p>Shipping {selectedShipping.label.split(" - ")[0]}</p>
                                                    <p className="text-xs sm:text-sm">{selectedShipping.date}</p>
                                                </div>
                                                <p>₦{selectedShipping.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p>You saved</p>
                                                <p>
                                                    -₦{cartItems
                                                    .reduce(
                                                        (acc, item) =>
                                                            acc +
                                                            (item.price - (item.discount_price || item.price)) *
                                                            item.quantity,
                                                        0
                                                    )
                                                    .toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p>Sales tax</p>
                                                <p>TBD</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator/>

                                    <div className="flex justify-between items-center font-bold">
                                        <h1>Subtotal</h1>
                                        <h1>₦{(subtotal + selectedShipping.price).toFixed(2)}</h1>
                                    </div>

                                    <Button
                                        className="w-full bg-[#FF773E] dark:text-white hover:bg-[#FF773E] shadow-md rounded-xl font-bold"
                                        onClick={handleCheckout}
                                    >
                                        CHECKOUT
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Container>
            </div>
        </RevelOnScroll>
    );
};

export default Cart;
