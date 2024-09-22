import "@/pages/site-management/registry/themes.css";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/pages/site-management/components/page-header";
import { ThemeCustomizer } from "@/pages/site-management/components/theme-customizer";
import { ThemeWrapper } from "@/pages/site-management/components/theme-wrapper";
import { Outlet } from "react-router-dom";
import { ThemesTabs } from "./tabs";
import { useState } from "react";

export default function ThemesPage() {
  const [bgtheme, setBgtheme] = useState<any>("");
  return (
    <ThemeWrapper defaultTheme="zinc">
      <div
        className={`relative flex min-h-screen flex-col bg-background items-center  ${bgtheme}`}
      >
        <div className="container  flex-1">
          <div className="relative flex w-full flex-col items-start md:flex-row">
            <PageHeader className="w-full">
              <PageHeaderHeading className="hidden md:block">
                Add colors. Make it yours.
              </PageHeaderHeading>
              <PageHeaderHeading className="md:hidden">
                Make it yours
              </PageHeaderHeading>
              <PageHeaderDescription>
                Hand-picked themes that you can copy and paste into your apps.
              </PageHeaderDescription>
              <PageActions>
                <ThemeCustomizer setBgtheme={setBgtheme} bgtheme={bgtheme} />
              </PageActions>
            </PageHeader>
          </div>
          <ThemesTabs />
          <Outlet />
        </div>
      </div>
    </ThemeWrapper>
  );
}
