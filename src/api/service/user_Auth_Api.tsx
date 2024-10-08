import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "@/api/service/localStorageServices";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_KEY_BACKEND_DOMAIN}/`,
  prepareHeaders: (headers) => {
    const { access_token } = getToken();
    if (access_token) {
      headers.set('authorization', `Bearer ${access_token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Handle token expiration
    // Optionally, you can refresh the token here
  } else if (result.error && result.error.status === 'FETCH_ERROR') {
    // Handle no internet or backend not responding
  }

  return result;
};

export const userAuthapi = createApi({
  reducerPath: "userAuthapi",
  baseQuery: baseQueryWithReauth,
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
    registersubUser: builder.mutation({
      query: (user) => {
        return {
          url: "api/account/user-register/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
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
    activesubUser: builder.mutation({
      query: (user) => {
        return {
          url: "api/account/user-register/verify-otp/",
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
    getavailableDomain: builder.query({
      query: () => {
        return {
          url: "api/account/active-domain-list/",
          method: "GET",
        };
      },
    }),
    verifyDomain: builder.mutation({
      query: ({id}) => {
        const  { access_token }  = getToken();
        return {
          url: `api/account/domains/${id}/verify/`,
          method: "POST",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    updateDomainStatus: builder.mutation({
      query: ({data, id}) => {
        console.log(id)
        const  { access_token }  = getToken();
        return {
          url: `api/account/user-domain-info/${id}/`,
          method: "PATCH",
          body: data,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    registerForm: builder.mutation({
      query:({actualData}) => {
        const {access_token} = getToken();
        return {
          url: `api/form/form/`,
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      }
    }),
    updateForm: builder.mutation({
      query:({actualData, id}) => {
        const {access_token} = getToken();
        return {
          url: `api/form/form/${id}/`,
          method: "PATCH",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      }
    }),
    getForm: builder.query({
      query:({form_type}) => {
        return {
          url: `api/form/form/${form_type ? `?form_type=${form_type}` : ""}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      }
    }),
    getSiteSetup : builder.query({
      query:({type}) => {
        return{
          url: `api/form/site-management/${type ? `?type=${type}` : ""}`,
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      }
    }),
    updateSetup : builder.mutation({
      query:({actualData, id}) => {
        const {access_token} = getToken();
        return {
          url: `api/form/site-management/${id}/`,
          method: "PATCH",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      }
    }),
    postSetup : builder.mutation({
      query:({actualData}) => {
        const {access_token} = getToken();
        return {
          url: `api/form/site-management/`,
          method: "POST",
          body: actualData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      }
    }),
  }),
});

export const {
  useDomainVerifierMutation,
  useDomainCheckMutation,
  useRegistersubUserMutation,
  useRegisterUserMutation,
  useRegisterAdminMutation,
  useLoginUserMutation,
  useActiveUserMutation,
  useActivesubUserMutation,
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
  useGetavailableDomainQuery,
  useVerifyDomainMutation,
  useUpdateDomainStatusMutation,
  useRegisterFormMutation,
  useUpdateFormMutation,
  useGetFormQuery,
  useGetSiteSetupQuery,
  useUpdateSetupMutation,
  usePostSetupMutation,
} = userAuthapi;
