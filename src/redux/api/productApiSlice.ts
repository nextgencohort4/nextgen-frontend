import {apiSlice} from "@/redux/api/apiSlice.ts";
import {PRODUCT_URL, UPLOAD_URL} from "@/utils/constants.ts";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({keyword}) => ({
                url: `${PRODUCT_URL}`,
                method: "GET",
                params: {keyword},
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Product"],
        }),
        getProductById: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            providesTags: (_result, _error, productId) => [
                {type: "Product", id: productId},
            ],
        }),
        allProducts: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Product"],
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            providesTags: (_result, _error, productId) => [
                {type: "Product", id: productId},
            ],
        }),
        createProduct: builder.mutation({
            query: (productData) => ({
                url: `${PRODUCT_URL}`,
                method: "POST",
                body: productData,
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: builder.mutation({
            query: ({id, data}) => ({
                url: `${PRODUCT_URL}/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (_result, _error, {id}) => [
                {type: "Product", id},
            ],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, {id}) => [
                {type: "Product", id},
            ],
        }),
        createReview: builder.mutation({
            query: (reviewData) => ({
                url: `${PRODUCT_URL}/${reviewData.productId}`,
                method: "POST",
                body: reviewData,
            }),
            invalidatesTags: (_result, _error, {id}) => [
                {type: "Product", id},
            ],
        }),
        getAllReviews: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}/reviews`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        getTopRatedProducts: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/top`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Product"],
        }),
        getNewProducts: builder.query({
            query: () => ({
                url: `${PRODUCT_URL}/new`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Product"],
        }),
        getFilteredProducts: builder.query({
            query: ({checked, radio}) => ({
                url: `${PRODUCT_URL}/filtered-products`,
                method: "POST",
                body: {checked, radio},
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Product"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAllProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetAllReviewsQuery,
    useGetTopRatedProductsQuery,
    useGetNewProductsQuery,
    useGetFilteredProductsQuery,
} = productApiSlice;
