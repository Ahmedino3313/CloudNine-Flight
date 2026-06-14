import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import pool from "@/lib/db"

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json()

        // Check if user already exists
        const existing = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        )

        if (existing.rows.length > 0) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Insert user
        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
            [name, email, hashedPassword]
        )

        return NextResponse.json(
            { message: "Account created successfully", user: result.rows[0] },
            { status: 201 }
        )

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}