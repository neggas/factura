import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Firewall = async ({ children }: { children: React.ReactNode }) => {
  const userSession = await auth();

  console.log(userSession);

  if (!userSession) {
    return redirect("/auth/login");
  }

  return <>{children}</>;
};

export default Firewall;
