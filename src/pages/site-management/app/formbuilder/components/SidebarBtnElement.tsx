import { FormElement } from "./FormElements";
import { Button } from "@/pages/site-management/registry/new-york/ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

const SidebarBtnElement = ({ formElement }: { formElement: FormElement }) => {
  const { label } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <Button
      // variant={"outline"}
      variant={"secondary"}
      ref={draggable.setNodeRef}
      className={cn(
        "flex w-full p-2 pl-3 items-center justify-between",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      {label}
      <GripVertical size={16} />
    </Button>
  );
};

export function SidebarBtnElementDragOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label } = formElement.designerBtnElement;

  return (
    <Button
      className="flex w-full p-2 pl-3 items-center justify-between cursor-grab"
      variant={"outline"}
    >
      {label}
      <GripVertical size={16} />
    </Button>
  );
}

export default SidebarBtnElement;
