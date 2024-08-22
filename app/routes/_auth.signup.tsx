import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authService } from "~/services/auth";

export const meta: MetaFunction = () => {
	return [{ title: "新規登録" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const data = await request.formData();
	const email = data.get("email")?.toString() ?? null;
	const password = data.get("password ")?.toString() ?? null;
	if (email === null || password === null) {
		return json({ message: "error", status: 400 });
	}
	const { signUp, headers } = authService(request);
	const { error } = await signUp(email, password);
	if (error) {
		return json({ message: "error", status: 400 });
	}

	return redirect("/", {
		headers,
	});
};

export default function SignUp() {
	return (
		<div className="w-full h-screen lg:grid lg:grid-cols-2">
			<div className="flex items-center justify-center py-12">
				<Form method="post">
					<div className="mx-auto grid w-[350px] gap-6">
						<div className="grid gap-2 text-center">
							<h1 className="text-3xl font-bold">新規登録</h1>
						</div>
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
							<Button type="submit" name="_action" className="w-full">
								ユーザー登録
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							<Link to="/signin" className="underline">
								ログイン
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
