import { Checkbox } from "@/pages/site-management/registry/default/ui/checkbox"
import { Label } from "@/pages/site-management/registry/default/ui/label"

export default function LabelDemo() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}
