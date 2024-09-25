import * as React from "react"
import { ImperativePanelHandle } from "react-resizable-panels"


import { Button } from "@/pages/site-management/registry/new-york/ui/button";
// import { MdPreview } from "react-icons/md";
import { Eye as MdPreview } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/pages/site-management/registry/new-york/ui/dialog";
import { FormElements } from "./FormElements";
import useDesigner from "./hooks/useDesigner";
import { ThemeWrapper } from "@/pages/site-management/components/theme-wrapper";
import { Card } from "@/pages/site-management/registry/new-york/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/pages/site-management/registry/new-york/ui/resizable"
import { cn } from "@/lib/utils"

const PreviewDialogBtn = () => {
  const { elements } = useDesigner();
  const ref = React.useRef<ImperativePanelHandle>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);
    // Add your form submission logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-2">
          <MdPreview className="h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">
            Form preview
          </p>
          <p className="text-sm text-muted-foreground">
            This is how your form will look like to your users.
          </p>
        </div>
        <ResizablePanelGroup direction="horizontal" className="relative z-10">
        <ResizablePanel
          ref={ref}
          className={cn(
            "relative rounded-lg border bg-background w-full h-full", "border-border"
          )}
          defaultSize={100}
          minSize={25}
        >
        <div className="bg-accent w-full h-full flex flex-col flex-grow items-center justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
          <ThemeWrapper defaultTheme="zinc" className="flex items-center justify-center w-full">
            <Card className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
              <form onSubmit={handleSubmit} className="w-full h-full flex flex-col gap-4 flex-grow">
                {elements.map((element) => {
                  const FormComponent = FormElements[element.type].formComponent;
                  return (
                    <FormComponent key={element.id} elementInstance={element} />
                  );
                })}
              </form>
            </Card>
          </ThemeWrapper>
        </div>
        </ResizablePanel>
        <ResizableHandle
          className={cn(
            "relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 sm:block",
          )}
        />
        <ResizablePanel defaultSize={0} minSize={0} />
        </ResizablePanelGroup>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogBtn;


