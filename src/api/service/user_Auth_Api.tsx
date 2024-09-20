import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "@/api/service/localStorageServices";

export const userAuthapi = createApi({
  reducerPath: "userAuthapi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_KEY_BACKEND_DOMAIN}/` }),
  endpoints: (builder) => ({
    domainVerifier: builder.mutation({
      query:({actualData})=>{
        return{
          url:`api/account/domain-register-check/`,
          method: "POST",
          body: actualData,
          headers: {
            "Content-type": "application/json",
          },
        }
      }
    }),
    domainCheck: builder.mutation({
      query:({actualData})=>{
        return{
          url:`api/account/check-domain/`,
          method: "POST",
          body: actualData,
          headers: {
            "Content-type": "application/json",
          },
        }
      }
    }),
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "/api/account/register/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    registerAdmin: builder.mutation({
      query: (user) => {
        return {
          url: "accounts/admin_register/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: ({user}) => {
        return {
          url: "api/account/login/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    activeUser: builder.mutation({
      query: (user) => {
        return {
          url: "api/account/register/verify-otp/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    resendOtp: builder.mutation({
      query: (user) => {
        return {
          url: "api/account/resend-otp/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    checkActiveUser: builder.mutation({
      query: (user) => {
        return {
          url: "api/account/check-active-user/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    checkLoginUser: builder.mutation({
      query: (user) => {
        return {
          url: "api/account/check-login-user/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getLoggedUser: builder.query({
      query: () => {
        const {access_token} = getToken();
        return {
          url: "api/account/user/profile/",
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    updateUserProfile: builder.mutation({
      query: ({ NewFormData, id }) => {
        const  { access_token }  = getToken();
        return {
          url: `accounts/profile/?id=${id}`,
          method: "PATCH",
          body: NewFormData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    twoFa: builder.mutation({
      query: ({ data }) => {
        return {
          url: "api/account/login/verify-otp/",
          method: "POST",
          body: data,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    changeUserPassword: builder.mutation({
      query: ({ actualData }) => {
        const  { access_token }  = getToken();
        return {
          url: "accounts/changepassword/",
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (user) => {
        return {
          url: "accounts/send-reset-password-email/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    resetPassword: builder.mutation({
      query: ({ actualData}) => {
        return {
          url: `accounts/reset-password/`,
          method: "POST",
          body: actualData,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    registration: builder.mutation({
      query: (actualData) => {
        return {
          url: `accounts/registration/`,
          method: "POST",
          body: actualData,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    refreshAccessToken: builder.mutation({
      query: (refreshToken) => {
        return {
          url: "accounts/token/refresh/",
          method: "POST",
          body: refreshToken, // Fix: Pass the object directly
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    userData: builder.query({
      query: ({page,page_size}) => {
        return {
          url: `/api/account/user-domain-info/?page=${page}&page_size=${page_size}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useDomainVerifierMutation,
  useDomainCheckMutation,
  useRegisterUserMutation,
  useRegisterAdminMutation,
  useLoginUserMutation,
  useActiveUserMutation,
  useResendOtpMutation,
  useCheckActiveUserMutation,
  useCheckLoginUserMutation,
  useGetLoggedUserQuery,
  useUpdateUserProfileMutation,
  useTwoFaMutation,
  useChangeUserPasswordMutation,
  useSendPasswordResetEmailMutation,
  useResetPasswordMutation,
  useRegistrationMutation,
  useRefreshAccessTokenMutation,
  useUserDataQuery,
} = userAuthapi;
