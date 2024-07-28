import {apiSlice} from "@/redux/api/apiSlice.ts";
import {CART_URL} from "@/utils/constants.ts";

export const cartApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        cart: builder.mutation({
            query: (data) => ({
                url: `${CART_URL}`,
                method: "POST",
                body: data
            })
        }),
        updateCart: builder.mutation({
            query: ({cartId, formData}) => ({
                url: `${CART_URL}/${cartId}`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: (_result, _error, {id}) => [
                {type: "Cart", id},
            ],
        }),
        deleteCart: builder.mutation({
            query: (cartId) => ({
                url: `${CART_URL}/${cartId}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, {id}) => [
                {type: "Cart", id},
            ],
        }),
    })
});

export const {
    useCartMutation,
    useUpdateCartMutation,
    useDeleteCartMutation
} = cartApiSlice;
