import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/cloudflare";
import { Button } from "~/components/ui/button";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authService } from "~/services/auth";
import { useLoaderData, redirect, Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "proteced" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getSession } = authService(request)
	const { session } = await getSession()
  if (!session?.user) {
    return redirect("/signin");
  }

  return json({ user: session?.user });
};

export default function Protected() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl mb-4">ユーザーアカウント</h1>
      {user && (
				<div className="flex flex-col gap-4">
					<p>{user.email}</p>
					<Form action="/sign-out" method="post">
						<Button>ログアウト</Button>
					</Form>
				</div>
      )}
    </div>
  );
}