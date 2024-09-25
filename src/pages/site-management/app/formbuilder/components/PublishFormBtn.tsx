import  { useTransition } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpToLine as MdOutlinePublish } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import confetti from "canvas-confetti";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogCancel,
} from "./ui/alert-dialog";
// import { PublishForm } from "@/actions/form";

const PublishFormBtn = ({ id }: { id: number }) => {
  const [loading, startTransition] = useTransition();
  const router = useNavigate();

  const handleClick = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };
  // async function publishForm() {
  //   try {
  //     await PublishForm(id);

  //     toast({
  //       title: "Success",
  //       description: "Form published, share it with the public",
  //     });
      
  //     router(0)
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: "somethin went wrong",
  //       variant: "destructive",
  //     });
  //   }
  // }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 dark:bg-white dark:text-neutral-950" variant="default">
          <MdOutlinePublish className="w-4 h-4" />
          Publish
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are u absolutely sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cant be undone. After publishing you will not be able to
            edit this form <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            className="relative"
            // onClick={(e) => {
            //   e.preventDefault();
            //   startTransition(publishForm);
            // }}
            onClick={handleClick}
          >
            Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormBtn;
