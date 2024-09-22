import { Button } from "@/pages/site-management/registry/new-york/ui/button"
import { Textarea } from "@/pages/site-management/registry/new-york/ui/textarea"

export default function TextareaWithButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  )
}
