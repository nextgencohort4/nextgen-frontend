import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {updateCart} from "@/utils/cartUtils.ts";
import {CartItem} from "@/types/Cart.ts";

interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

interface CartState {
    cartItems: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    itemsPrice: string;
    shippingPrice: string;
    taxPrice: string;
    totalPrice: string;
}

let initialState: CartState = {
    cartItems: [],
    shippingAddress: {
        address: "",
        city: "",
        postalCode: "",
        country: "",
    },
    paymentMethod: "PayPal",
    itemsPrice: "0.00",
    shippingPrice: "0.00",
    taxPrice: "0.00",
    totalPrice: "0.00",
};

const storedCart = localStorage.getItem("cart");

if (storedCart) {
    initialState = JSON.parse(storedCart);
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const {_id} = action.payload;
            const existItem = state.cartItems.find((x) => x._id === _id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === _id ? action.payload : x
                );
            } else {
                state.cartItems = [...state.cartItems, action.payload];
            }
            updateCart(state);
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            updateCart(state);
        },

        saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
            state.shippingAddress = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },

        savePaymentMethod: (state, action: PayloadAction<string>) => {
            state.paymentMethod = action.payload;
            localStorage.setItem("cart", JSON.stringify(state));
        },

        clearCartItems: (state) => {
            state.cartItems = [];
        },

        resetCart: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    savePaymentMethod,
    saveShippingAddress,
    clearCartItems,
    resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
