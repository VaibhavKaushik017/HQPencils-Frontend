import Account from "../components/account";
import MyProfile from "../components/my-profile";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

function Profile() {
  return (
    <div className="mt-24 w-[92%] mx-auto">
      <Tabs defaultValue="profile">
        <TabsList className="flex w-fit ">
          <TabsTrigger className="w-[200px]" value="profile">
            My Profile
          </TabsTrigger>
          <TabsTrigger className="w-[200px]" value="account">
            Account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <MyProfile />
        </TabsContent>
        <TabsContent value="account">
          <Account />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Profile;
