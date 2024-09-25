import useDesigner from "./hooks/useDesigner";
import FormElementsSidebar from "./FormElementsSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";

const DesignerSidebar = () => {
  const { selectedElement } = useDesigner();

  return (
    <aside className="flex flex-col p-1 flex-grow gap-2 overflow-y-auto h-full">
      <p className="text-sm text-foreground/70 p-2">Drag and Drop elements</p>
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
};

export default DesignerSidebar;
