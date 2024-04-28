import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

function CustomSketchForm(data: any) {
  const faces = data.data.faces;
  const charge = data.data.charge;
  const size = data.data.size;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-orange-400" variant="link">
          Select
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Your Custom Portrait Details</AlertDialogTitle>
          <AlertDialogDescription>
            <form action="" className="flex flex-col gap-4">
              <Input
                placeholder="No. of faces"
                disabled={faces}
                value={faces}
              />
              <Input placeholder="Size" disabled={size} value={size} />
              <Input placeholder="Charge" disabled={charge} value={charge} />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <Label htmlFor="message">
                    Suggestion for the Artist (Optional)
                  </Label>
                  <span className="text-xs">Max 500 Letters</span>
                </div>

                <Textarea
                  maxLength={500}
                  name="message"
                  placeholder="Type your message here."
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="image">
                  Upload Image <span className="text-red-500">*</span>
                </Label>
                <Input type="file" name="image" placeholder="Charge" />
              </div>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction type="submit">Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomSketchForm;
