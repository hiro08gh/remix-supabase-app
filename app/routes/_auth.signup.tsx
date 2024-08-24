import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authService } from "~/services/auth";

export const schema = z.object({
	email: z.string().email({ message: "メールアドレスが有効ではありません" }),
	password: z
		.string()
		.min(6, { message: "パスワードは6文字以上で設定してください" }),
});

export const meta: MetaFunction = () => {
	return [{ title: "新規登録" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();
	const submission = parseWithZod(formData, { schema });

	if (submission.status !== "success") {
		return json(submission.reply());
	}

	const { signUp, headers } = authService(request);
	const { error } = await signUp(
		submission.value.email,
		submission.value.password,
		"http://localhost:5173/auth/callback",
	);
	if (error) {
		return json({ message: error.message, status: 400 });
	}

	return redirect("/protected", {
		headers,
	});
};

export default function SignUp() {
	const [form, { email, password }] = useForm({
		onValidate({ formData }) {
			return parseWithZod(formData, { schema });
		},
	});
	const navigation = useNavigation();
	const isSubmitting = navigation.formAction === "/signin";

	return (
		<div className="w-full h-screen lg:grid lg:grid-cols-2">
			<div className="flex items-center justify-center py-12">
				<Form method="post" {...getFormProps(form)}>
					<div className="mx-auto grid w-[350px] gap-6">
						<div className="grid gap-2 text-center">
							<h1 className="text-3xl font-bold">新規登録</h1>
						</div>
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">メールアドレス</Label>
								<Input {...getInputProps(email, { type: "email" })} />
								{email.errors}
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">パスワード</Label>
								</div>
								<Input {...getInputProps(password, { type: "password" })} />
								{password.errors}
							</div>
							<Button
								type="submit"
								name="_action"
								disabled={isSubmitting}
								className="w-full"
							>
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
