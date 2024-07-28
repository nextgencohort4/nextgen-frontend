import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "@/utils/constants.ts";
import {RootState} from "@/redux/store.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
        const state = getState() as RootState;
        const token = state.auth.userInfo?.user?.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
            console.log("Token being sent:", token);
            console.log("Headers after setting token:", headers);
        } else {
            console.log("No token found in state");
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Product", "User", "Cart", "Order"],
    endpoints: () => ({})
});
