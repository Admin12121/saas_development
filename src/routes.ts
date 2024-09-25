export const publicRoutes = [
    "/",
    "/home",
    "/register",
    "/login",
    "/login/:username",
    "/available-domains",
    "/active-account/:username",
];

export const protectedRoutes = [
    "/dashboard",
    "/dashboard/.*",
];

export const rolebaseRoutes = [
    { path: "/dashboard/domain", roles: ["superadmin"] }
];

export const authRoutes = [
    "/register",
    "/login",
    "login/:username",
    "active-account/:username",
];

export const Default_Login_Redirect = "/dashboard";