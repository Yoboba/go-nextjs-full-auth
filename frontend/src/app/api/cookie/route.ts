import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = cookies();
    const cookieObject = cookieStore.get("jwt");
    if (cookieObject) {
        return NextResponse.json({
            cookie: cookieObject,
        });
    } else {
        return NextResponse.json({
            cookie: null,
        });
    }
}
