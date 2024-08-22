import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader,
} from "@supabase/ssr";

export const createSupabaseServerClient = (request: Request) => {
	const headers = new Headers();

	if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
		throw new Error("環境変数が設定されていません");
	}

	const supabaseClient = createServerClient(
		process.env.SUPABASE_URL,
		process.env.SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return parseCookieHeader(request.headers.get("Cookie") ?? "");
				},
				setAll(cookiesToSet) {
					for (const cookie of cookiesToSet) {
						const { name, value, options } = cookie;
						headers.append(
							"Set-Cookie",
							serializeCookieHeader(name, value, options),
						);
					}
				},
			},
		},
	);

	return { supabaseClient, headers };
};
