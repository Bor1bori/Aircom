import cookie from "js-cookie";

export const setCookie = (key: string, value: string) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1,
            path: "/"
        });
    }
};

export const getCookieFromServer = (key: string, req: any) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    const rawCookie = req.headers.cookie
        .split(";")
        .find((c: any) => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split("=")[1];
};