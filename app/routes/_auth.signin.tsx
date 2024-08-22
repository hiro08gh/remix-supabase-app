import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authService } from "~/services/auth";

export const meta: MetaFunction = () => {
	return [{ title: "ログイン" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const data = await request.formData();
	const { signIn, headers } = authService(request);
	const email = data.get("email")?.toString() ?? null;
	const password = data.get("password")?.toString() ?? null;
	if (email === null || password === null) {
		return json({ message: "バリデーションエラー", status: 400 });
	}

	const { error } = await signIn(email, password);
	if (error) {
		return json({ message: error.message, status: 400 });
	}

	return redirect("/protected", {
		headers,
	});
};

export default function SignIn() {
	const data = useActionData<typeof action>();
	const navigation = useNavigation();
	const isSubmitting = navigation.formAction === "/signin";

	return (
		<div className="w-full h-screen lg:grid lg:grid-cols-2">
			<div className="flex items-center justify-center py-12">
				<Form method="post">
					<div className="mx-auto grid w-[350px] gap-6">
						<div className="grid gap-2 text-center">
							<h1 className="text-3xl font-bold">ログイン</h1>
						</div>
						{data?.message && (
							<ul>
								<li>{data?.message}</li>
							</ul>
						)}
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">メールアドレス</Label>
								<Input
									id="email"
									type="email"
									name="email"
									placeholder="m@example.com"
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">パスワード</Label>
								</div>
								<Input id="password" type="password" name="password" />
							</div>
							<Button
								type="submit"
								name="_action"
								className="w-full"
								disabled={isSubmitting}
							>
								ログイン
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							<Link to="/signup" className="underline">
								新規登録
							</Link>
						</div>
					</div>
				</Form>
			</div>
			<div className="hidden bg-muted lg:block">
				<img src="" alt="" />
			</div>
		</div>
	);
}
