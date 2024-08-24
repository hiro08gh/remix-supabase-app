import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, redirect } from "@remix-run/react";
import { authService } from "~/services/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { getSession } = authService(request);
	const { data } = await getSession();
	if (data?.user) {
		return redirect("/protected");
	}

	return null;
};

export default function Auth() {
	return <Outlet />;
}
