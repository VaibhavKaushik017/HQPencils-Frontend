import { Button } from "./ui/button";
import { Input } from "./ui/input";

function CustomSketchForm(data: any) {
  console.log(data);
  return (
    <div className="pb-24 w-[92%] mx-auto">
      <form action="">
        <Input placeholder="No. of faces" value={data?.data?.faces} />
        <Input placeholder="Size" value={data?.data?.size} />
        <Input placeholder="Charge" value={data?.data?.charge} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default CustomSketchForm;
