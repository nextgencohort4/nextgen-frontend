import {WritableDraft} from "immer";
import {CartItem} from "@/types/Cart.ts";

interface CartState {
    cartItems: CartItem[];
    itemsPrice: string;
    shippingPrice: string;
    taxPrice: string;
    totalPrice: string;
}

export const addDecimals = (num: number): string => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state: WritableDraft<CartState>): void => {
    // Calculate the items price
    state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );

    // Calculate the shipping price
    state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);

    // Calculate the tax price
    state.taxPrice = addDecimals(Number((0.15 * Number(state.itemsPrice)).toFixed(2)));

    // Calculate the total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    // Save the cart to localStorage
    localStorage.setItem("cart", JSON.stringify(state));
};
