"use client"

import { useToast } from "@/pages/site-management/registry/new-york/hooks/use-toast"
import { Button } from "@/pages/site-management/registry/new-york/ui/button"
import { ToastAction } from "@/pages/site-management/registry/new-york/ui/toast"

export default function ToastDestructive() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }}
    >
      Show Toast
    </Button>
  )
}
