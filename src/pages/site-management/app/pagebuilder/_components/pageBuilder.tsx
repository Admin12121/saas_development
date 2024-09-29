"use client";

import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { MainLayout } from "../_components/layout";
import { Card } from "@/pages/site-management/registry/new-york/ui/card";
import Component from "@/pages/home/components/temp1"; // Import the Component

interface Form {
  id: number;
  published: boolean;
  name: string;
  content: any;
}

const PagebuilderForm = () => {
  const layout = Cookies.get("react-resizable-panels:layout:mail");
  const collapsed = Cookies.get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined;

  const cardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault();
        setScale((prevScale) => Math.max(0.1, prevScale + event.deltaY * -0.01));
      } else if (event.shiftKey) {
        event.preventDefault();
        setPosition((prevPosition) => ({
          x: prevPosition.x + event.deltaY,
          y: prevPosition.y,
        }));
      } else {
        setPosition((prevPosition) => ({
          x: prevPosition.x,
          y: prevPosition.y + event.deltaY,
        }));
      }
    };

    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <MainLayout
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={15}
    >
      <Card
        ref={cardRef}
        className="flex w-full h-full rounded-lg flex-grow items-center justify-center relative overflow-y-auto"
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <Component />
      </Card>
    </MainLayout>
  );
};

export default PagebuilderForm;