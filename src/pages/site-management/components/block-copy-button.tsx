"use client"

import * as React from "react"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { Event } from "@/pages/site-management/lib/events"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/pages/site-management/registry/new-york/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/pages/site-management/registry/new-york/ui/tooltip"

export function BlockCopyButton({
  event,
  name,
  code,
  className,
  ...props
}: {
  event: Event["name"]
  name: string
  code: string
} & ButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className={cn(
            "[&_svg]-h-3.5 h-7 w-7 rounded-[6px] [&_svg]:w-3.5",
            className
          )}
          onClick={() => {
            navigator.clipboard.writeText(code)
            setHasCopied(true)
          }}
          {...props}
        >
          <span className="sr-only">Copy</span>
          {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-black text-white">Copy code</TooltipContent>
    </Tooltip>
  )
}
