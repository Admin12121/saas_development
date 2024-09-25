import { useState } from "react";
import { FormElements } from "./FormElements";
import SidebarBtnElement from "./SidebarBtnElement";
import { Input } from "@/pages/site-management/registry/new-york/ui/input";
import { Search } from "lucide-react";

type FormElement = {
  name: string;
  element: any;
};

type FormElementsType = {
  [key: string]: any;
};

const formElements: FormElementsType = FormElements;

const FormElementsSidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const formElementsArray: FormElement[] = Object.keys(formElements)
    .map((key) => ({
      name: key,
      element: formElements[key],
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredElements = formElementsArray
    .map((item) => ({
      ...item,
      relevance: item.name.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0,
    }))
    .sort((a, b) => b.relevance - a.relevance || a.name.localeCompare(b.name))
    .map((item) => item.element);

  return (
    <div>
      <div className="relative dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white rounded-lg w-full mb-3">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search"
          className="pl-8 border-0 focus:outline-none focus-visible:ring-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col mt-3 gap-2 place-items-center">
        {filteredElements.map((formElement, index) => (
          <SidebarBtnElement key={index} formElement={formElement} />
        ))}
      </div>
    </div>
  );
};

export default FormElementsSidebar;