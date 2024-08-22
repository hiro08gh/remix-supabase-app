import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{
			name: "description",
			content: "Welcome to Remix on Cloudflare!",
		},
	];
};

export default function Index() {
	return (
		<div className="font-sans p-4">
			<h1 className="text-3xl mb-4">Welcome to Remix on Cloudflare</h1>
		</div>
	);
}
