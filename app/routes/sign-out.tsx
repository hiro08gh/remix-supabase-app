import { redirect } from "@remix-run/node";

import type { ActionFunctionArgs } from "@remix-run/node";
import { authService } from "~/services/auth";

export const action = async ({ request }: ActionFunctionArgs) => {
	const { signOut, getSession, headers } = authService(request);
	const { data } = await getSession();
	if (!data?.user) {
		return redirect("/");
	}

	await signOut();
	return redirect("/signin", {
		headers,
	});
};
