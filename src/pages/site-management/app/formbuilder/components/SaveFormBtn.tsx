import useDesigner from "./hooks/useDesigner";
import { Button } from "./ui/button";
import { Download as HiSaveAs } from "lucide-react";
import { useUpdateFormMutation } from "@/api/service/user_Auth_Api"
import Spinner from "@/components/ui/spinner";

const SaveFormBtn = ({ id }: { id: number }) => {
  const { elements } = useDesigner();
  const [ update , {isLoading}] = useUpdateFormMutation();

  const handleSubmit = async () => {
    const actualData = {"content": elements}
    const res = await update({id, actualData})
    if(res.data){
      console.log("daved well done")
    }else{
      console.log("something went wrong")
    }
  }

  return (
    <Button
      variant="secondary"
      className="gap-2"
      disabled={isLoading}
      onClick={() => {
        handleSubmit()
      }}
    >
      <HiSaveAs className="w-4 h-4" />
      Save
      {isLoading && <Spinner/>}
    </Button>
  );
};

export default SaveFormBtn;



