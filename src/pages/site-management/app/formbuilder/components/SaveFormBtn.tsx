import React, { useTransition } from "react";
import useDesigner from "./hooks/useDesigner";
import { Button } from "./ui/button";
import { Download as HiSaveAs } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "./ui/use-toast";
// import { UpdateFormContent } from "@/actions/form";

const SaveFormBtn = ({ id }: { id: number }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  // const updateFormContent = async () => {
  //   try {
  //     const jsonElements = JSON.stringify(elements);
  //     // await UpdateFormContent(id, jsonElements);
  //     console.log(jsonElements)
  //     toast({
  //       title: "Success",
  //       description: "Your form has been saved!!!!!",
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "something went wrong",
  //       variant: "destructive",
  //     });
  //   }
  // };


  const handleSubmit = () => {
    const jsonElements = JSON.stringify(elements);
    console.log(jsonElements)
  }

  return (
    <Button
      variant="secondary"
      className="gap-2"
      disabled={loading}
      onClick={() => {
        // startTransition(updateFormContent);
        handleSubmit()
      }}
    >
      <HiSaveAs className="w-4 h-4" />
      Save
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
};

export default SaveFormBtn;



