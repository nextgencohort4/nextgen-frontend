import {apiSlice} from "@/redux/api/apiSlice.ts";
import {USERS_URL} from "@/utils/constants.ts";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data,
                headers: {"authorization": ""}
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL
            }),
            providesTags: ["User"],
            keepUnusedDataFor: 5
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: "DELETE"
            })
        }),
        getUserDetails: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["User"]
        })
    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useGetUserDetailsQuery
} = userApiSlice;
