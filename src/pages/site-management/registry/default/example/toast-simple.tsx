"use client"

import { useToast } from "@/pages/site-management/registry/default/hooks/use-toast"
import { Button } from "@/pages/site-management/registry/default/ui/button"

export default function ToastSimple() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        })
      }}
    >
      Show Toast
    </Button>
  )
}
