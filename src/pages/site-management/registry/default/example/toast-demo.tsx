"use client"

import { useToast } from "@/pages/site-management/registry/default/hooks/use-toast"
import { Button } from "@/pages/site-management/registry/default/ui/button"
import { ToastAction } from "@/pages/site-management/registry/default/ui/toast"

export default function ToastDemo() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Scheduled: Catch up ",
          description: "Friday, February 10, 2023 at 5:57 PM",
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        })
      }}
    >
      Add to calendar
    </Button>
  )
}
