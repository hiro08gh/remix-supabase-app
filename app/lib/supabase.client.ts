import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
	if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
		throw new Error("環境変数が設定されていません");
	}

	return createBrowserClient(
		process.env.SUPABASE_URL,
		process.env.SUPABASE_ANON_KEY,
	);
};
