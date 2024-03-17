import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, username, password, birthday } = await req.json();

        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Birthday:", birthday);
        console.log("Email:", email);

        return NextResponse.json({ message: "User registered!" },
            { status: 201 });
        
    } catch (error) {
        return NextResponse.json(
            { message: "Error occured while registering. Try again." },
            { status: 500 }
        );
    }
}