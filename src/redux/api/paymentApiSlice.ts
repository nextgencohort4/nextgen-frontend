import {apiSlice} from "@/redux/api/apiSlice.ts";
import {ORDERS_URL, PAYMENT_URL, PRODUCT_URL} from "@/utils/constants.ts";

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        processCart: builder.mutation({
            query: (data) => ({
                url: `${PAYMENT_URL}`,
                method: "POST",
                body: data
            })
        }),
        applyVoucher: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/applyvoucher`,
                method: "POST",
                body: data
            })
        }),
        processOrder: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            providesTags: (_result, _error, orderId) => [
                {type: "Order", id: orderId},
            ],
        }),
    }),
});

export const {
    useProcessCartMutation,
    useApplyVoucherMutation,
    useProcessOrderQuery,
} = paymentApiSlice;
