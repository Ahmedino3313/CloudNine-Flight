import { NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const result = await pool.query(
            "SELECT * FROM flights WHERE id = $1",
            [id]
        )

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: "Flight not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(result.rows[0], { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}