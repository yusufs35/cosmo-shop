"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import * as Yup from "yup";
import { getYupErrors } from "@/utils/form-validation";

const FormSchema = Yup.object({
	username: Yup.string().required("Required"),
	password: Yup.string().required("Required"),
});

export const signInWithCredentials = async (prevState, formData) => {
	const fields = {
		username: formData.get("username"),
		password: formData.get("password"),
	};
	// alternative
	//const fields = Object.fromEntries(formData.entries());

	try {
		FormSchema.validateSync(fields, { abortEarly: false });
		await signIn("credentials", fields);
	} catch (error) {
		if (error instanceof AuthError) {
			return {
				message: "Authentication was failed",
			};
		} else if (error instanceof Yup.ValidationError) {
			return getYupErrors(error.inner);
		} else {
			throw error;
		}
	}
};

export const signInWithSocial = async (formData) => {
	const provider = formData.get("provider");

	try {
		await signIn(provider);
	} catch (error) {
		if (error instanceof AuthError) {
			return {
				message: "Authentication was failed",
			};
		} else {
			throw error;
		}
	}
};
