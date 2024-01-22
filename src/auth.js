import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

const config = {
	providers: [
		Credentials({
			credentials: {
				username: { label: "Username" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const res = await fetch("https://dummyjson.com/auth/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(credentials),
				});

				if (!res.ok) return null;
				const user = await res.json();
				return user;
			},
		}),
		GitHub,
		Google,
	],
	callbacks: {
		// bu callback mutlaka tanimlanmali
		// middleware icinde aktihf hale getirilen route lara her giriste calisir
		// eger bu callback true donerse route icine girlir, yoksa signin sayfasina gidilir
		authorized({ request, auth }) {
			const { pathname, searchParams } = request.nextUrl;

			const isUserLoggedIn = !!auth?.user;
			const isUserInLoginPage = pathname === "/login";

			if (isUserLoggedIn && isUserInLoginPage) {
				const callbackUrl = searchParams.get("callbackUrl");
				const url = new URL(
					callbackUrl || "/dashboard",
					request.nextUrl
				);
				return Response.redirect(url);
			}

			return isUserLoggedIn;
		},
	},
	pages: {
		signIn: "/login",
	},
};

// Olusturulan config nesnesine gore tum altyapiyi hazirlayan NextAuth metodudur.
export const { handlers, auth, signIn, signOut } = NextAuth(config);
