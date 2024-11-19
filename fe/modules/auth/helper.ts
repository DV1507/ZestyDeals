import useAxiosPost from "@/hooks/axios/useAxiosPost";
import { z } from "zod";
import { loginSchema, signupSchema } from "./validation-schema";

export const useSignUpPostApi = () => {
  const { isLoading, post, isError } = useAxiosPost("/user/signup");
  const signUpApi = async (payload: z.infer<typeof signupSchema>) => {
    const res = await post(payload);
    return res;
  };
  return { isLoading, signUpApi, isError };
};

export const useSignInPostApi = () => {
  const { isLoading, post, isError } = useAxiosPost("/user/signin");
  const signInApi = async (payload: z.infer<typeof loginSchema>) => {
    const res = await post(payload);
    return res;
  };
  return { isLoading, signInApi, isError };
};
