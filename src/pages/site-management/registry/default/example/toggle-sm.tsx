import { Italic } from "lucide-react"

import { Toggle } from "@/pages/site-management/registry/default/ui/toggle"

export default function ToggleSm() {
  return (
    <Toggle size="sm" aria-label="Toggle italic">
      <Italic className="h-4 w-4" />
    </Toggle>
  )
}
