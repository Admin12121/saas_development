import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

interface PanalProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
  data?:any
}

export function MainLayout({
  defaultLayout = [25, 80],
  defaultCollapsed = false,
  navCollapsedSize,
  children,
//   data,
}: PanalProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [maxSize, setMaxSize] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let maxSizeValue;
      if (width <= 1200 && width >= 768) {
        maxSizeValue = 50;
      } else if (width < 768) {
        maxSizeValue = 50;
      } else {
        maxSizeValue = 50;
      }
      setMaxSize(maxSizeValue);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-screen items-stretch max-w-[2400px]"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={25}
          maxSize={maxSize}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn('p-2 h-screen pr-[5px] max-md:hidden',
            isCollapsed &&
              "min-w-[68px]  transition-all duration-300 ease-in-out"
          )}
        >
          <div className="rounded-lg dark:bg-neutral-900 h-full relative w-full p-2">   
            {/* <DesignerSidebar/>        */}
          </div>
        </ResizablePanel> 
        <ResizableHandle withHandle className="bg-transparent w-2 max-md:hidden" />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30} className="p-2 pl-[5px] overflow-hidden overflow-y-auto h-screen">
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
