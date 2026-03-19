import { NextResponse } from "next/server";
import sql from "@/lib/db"; 
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const res = await req.json()
    const {name,email,password} = res

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}