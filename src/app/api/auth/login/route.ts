import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import pool from "@/lib/db"

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()

        // Find user
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        )

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            )
        }

        const user = result.rows[0]

        // Check password
        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            )
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        )

        const response = NextResponse.json(
            { message: "Login successful", user: { id: user.id, name: user.name, email: user.email } },
            { status: 200 }
        )

        // Set token as cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7
        })

        return response

    } catch (error) {
        console.error(error)
        return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
        )
    }
    }