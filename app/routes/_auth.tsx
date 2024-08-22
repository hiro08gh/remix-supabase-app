import { Outlet, redirect } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authService } from "~/services/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getSession } = authService(request)
	const { session } = await getSession()
  if (session?.user) {
    return redirect("/protected");
  }

  return null;
};

export default function Auth() {
  return <Outlet />;
}