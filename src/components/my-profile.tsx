import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { RootState } from "../redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

function MyProfile() {
  const { user } = useSelector((state: RootState) => state.userReducer);

  return (
    <div className="py-10">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Card className="flex items-center">
            <CardHeader>
              <Avatar className="w-20 h-20">
                <AvatarImage src={user?.photo} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="h-full pt-5 flex flex-col gap-1">
              <CardTitle>{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
              <CardDescription>{user?.role}</CardDescription>
            </CardContent>
            <CardFooter className="w-full justify-end">
              <Button>Edit</Button>
            </CardFooter>
          </Card>
        </CardContent>
        <CardContent>
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Personal Information</h1>
                <Button className="w-fit">Edit</Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="grid w-[50%] gap-4 grid-cols-2">
                <div>
                  <p>Name</p>
                  <p>{user?.name}</p>
                </div>
                <div>
                  <p>Email</p>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <p>Gender</p>
                  <p>{user?.gender}</p>
                </div>
                <div>
                  <p>Date of Birth</p>
                  <p>{user?.dob}</p>
                </div>
              </CardDescription>
            </CardContent>
          </Card>
        </CardContent>
        <CardContent>
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Address</h1>
                <Button className="w-fit">Edit</Button>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="grid w-[50%] gap-4 grid-cols-2">
                <div>
                  <p>Country</p>
                  <p>--</p>
                </div>
                <div>
                  <p>City</p>
                  <p>--</p>
                </div>
                <div>
                  <p>Postal Code</p>
                  <p>--</p>
                </div>
                <div>
                  <p>State</p>
                  <p>--</p>
                </div>
              </CardDescription>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyProfile;
