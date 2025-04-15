"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function SignUp(params: SignUpParams) {
  const { uid, email, name } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User Already exists",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
      createdAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.log("Error creating user", error);
    if (error?.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "Email already in user",
      };
    }
    return {
      success: false,
      message: "Failed to create User.",
    };
  }
}

export async function SignIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User does not exist.Create an account instead.",
      };
    }
    await setSessionCookie(idToken);
  } catch (error) {
    console.log("Error signing user", error);
    return {
      success: false,
      message: "Failed to log into the account.",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: 60 * 60 * 24 * 5 * 1000,
  });
  cookieStore.set("session", sessionCookie, {
    maxAge: 60 * 60 * 24 * 5 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}
