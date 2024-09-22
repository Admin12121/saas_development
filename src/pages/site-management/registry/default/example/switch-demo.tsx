import { Label } from "@/pages/site-management/registry/default/ui/label"
import { Switch } from "@/pages/site-management/registry/default/ui/switch"

export default function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
