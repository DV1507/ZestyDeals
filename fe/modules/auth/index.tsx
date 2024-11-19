import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Signup from "./components/signup";
import SignIn from "./components/signin";

export function Authentication() {
  return (
    <Tabs defaultValue="signIn" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-2 min-h-12">
        <TabsTrigger className="h-full" value="signIn">
          Sign In
        </TabsTrigger>
        <TabsTrigger className="h-full" value="signUp">
          Sign Up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="signUp">
        <Signup />
      </TabsContent>
      <TabsContent value="signIn">
        <SignIn />
      </TabsContent>
    </Tabs>
  );
}
