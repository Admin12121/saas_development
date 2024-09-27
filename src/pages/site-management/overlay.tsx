import "@/pages/site-management/registry/themes.css";
import { ThemeWrapper } from "@/pages/site-management/components/theme-wrapper";
import { Outlet } from "react-router-dom";
import { getToken } from "@/api/service/localStorageServices";

export default function ThemesPage() {
  const { user_role } = getToken();

  console.log(user_role)

  return (
    <ThemeWrapper defaultTheme="zinc">
      <Outlet />
    </ThemeWrapper>
  );
}