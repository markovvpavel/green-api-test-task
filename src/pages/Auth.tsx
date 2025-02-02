import { AuthCover } from "@/components/Auth/AuthCover";
import { AuthForm } from "@/components/Auth/AuthForm";
import { AuthHelp } from "@/components/Auth/AuthHelp";

export const AuthPage = () => {
  return (
    <div className="h-full w-full flex">
      <div className="h-full w-full md:w-1/2 lg:w-[520px] py-8 px-16 flex flex-col justify-between">
        <AuthForm />
        <AuthHelp />
      </div>
      <div className="hidden md:w-1/2 md:block lg:w-[calc(100%-520px)] h-full">
        <AuthCover />
      </div>
    </div>
  );
};
