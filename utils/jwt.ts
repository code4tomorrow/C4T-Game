import { parse } from "cookie-es";
import type { CookieSerializeOptions } from "cookie-es";
import type { SignOptions } from "jsonwebtoken";
import { setCookie } from "h3";
import { EUserRole } from "~~/enums/userRole";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import type { CompatibilityEvent } from "h3";

export interface AuthState {
    id: string,
    roles?: EUserRole[] | string[]; 
}

export const validateAuthState = (authState: AuthState): AuthState => ({
    ...authState,
});

const jwtSecretKey = process.env.JWT_SECRET_KEY || "jwtsecrettoken";

export const decodeJwt = (token: string): AuthState => {
    try {
      const authState = jwt.verify(token, jwtSecretKey) as AuthState;
      return validateAuthState(authState);
    } catch (error) {
      return null;
    }
};

// Encode authentication state as JWT cookie in server response
export const jwtCookieName = "jwt";
export const authCookieName = "has_access";

const jwtSignOptions: SignOptions = { 
    expiresIn: "7d" 
};
const jwtCookieOptions: CookieSerializeOptions = { 
    path: "/", 
    httpOnly: true
};

const authCookieOptions: CookieSerializeOptions = {
    path: "/",
    httpOnly: false,
}

export const setAuthState = (user: User | null, res: CompatibilityEvent): AuthState => {
    const authState = validateAuthState({ id: user.id, roles: user.roles });
    setCookie(res, jwtCookieName, jwt.sign(authState, jwtSecretKey, jwtSignOptions), jwtCookieOptions);
    if (!!authState) setCookie(res, authCookieName, "true", authCookieOptions);
    return authState;
  };

export const getTokenFromHeaders = (headers: { cookie?: string }) : string  => {
    const cookies: Record<string, string> = parse(headers.cookie || "");
    return cookies[jwtCookieName]
};