import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authService } from "~/services/auth";

export const loader = async ({ request }: ActionFunctionArgs) => {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	if (!code) {
		return new Response("Authentication faild", {
			status: 400,
		});
	}
	const { exchangeCodeForSession, headers } = authService(request);
	const { error } = await exchangeCodeForSession(code);
	if (error) {
		return redirect("/sign-in");
	}

	return redirect("/protected", {
		headers,
	});
};
