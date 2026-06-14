import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value

        if (!token) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            )
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: number
            name: string
            email: string
        }

        return NextResponse.json({
            id: decoded.id,
            name: decoded.name,
            email: decoded.email
        })

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
        )
    }
}