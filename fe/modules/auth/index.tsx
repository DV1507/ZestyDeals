"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Signup from "./components/signup";
import SignIn from "./components/signin";
import { useState } from "react";

export function Authentication() {
  const [currentTab, setCurrentTab] = useState<"signIn" | "signUp">("signIn");
  const onTabChange = (value: string) => {
    setCurrentTab(value as "signIn" | "signUp");
  };
  return (
    <Tabs value={currentTab} onValueChange={onTabChange} className="w-[500px]">
      <TabsList className="grid w-full grid-cols-2 min-h-12">
        <TabsTrigger className="h-full" value="signIn">
          Sign In
        </TabsTrigger>
        <TabsTrigger className="h-full" value="signUp">
          Sign Up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="signUp">
        <Signup setCurrentTab={setCurrentTab} />
      </TabsContent>
      <TabsContent value="signIn">
        <SignIn setCurrentTab={setCurrentTab} />
      </TabsContent>
    </Tabs>
  );
}
