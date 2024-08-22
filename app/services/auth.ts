import { createSupabaseServerClient } from "~/lib/supabase.server";

export const authService = (request: Request) => {
  const { supabaseClient, headers } = createSupabaseServerClient(request);

	const signUp = async (email:string, password: string, emailRedirectTo?: string) => {
		const { error } = await supabaseClient.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo,
			},
		});

		return { error, headers} 
	}

	const signIn = async (email:string, password: string) => {
		const { error } = await supabaseClient.auth.signInWithPassword({
			email,
			password,
		});

		return { error, headers} 
	}

	const signOut = async () => {
    return supabaseClient.auth.signOut();
	}

	const getSession = async () => {
		const {
			data: { session },
		} = await supabaseClient.auth.getSession();

		return { session }
	}

	return { signUp, signIn, signOut, getSession, headers }
}