import { NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

function sanitizeText(value: string): string {
    return value.replace(/[^a-zA-Z\s]/g, "").trim().slice(0, 50)
}

function sanitizeDate(value: string): string | null {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    return dateRegex.test(value) ? value : null
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)

        const from = searchParams.get("from") ? sanitizeText(searchParams.get("from")!) : null
        const to = searchParams.get("to") ? sanitizeText(searchParams.get("to")!) : null
        const dateParam = searchParams.get("date")
        const date = dateParam ? sanitizeDate(dateParam) : null

        let query = "SELECT * FROM flights"
        const values: string[] = []
        const conditions: string[] = []

        if (from) {
            conditions.push(`LOWER(from_city) LIKE $${values.length + 1}`)
            values.push(`%${from.toLowerCase()}%`)
        }

        if (to) {
            conditions.push(`LOWER(to_city) LIKE $${values.length + 1}`)
            values.push(`%${to.toLowerCase()}%`)
        }

        if (date) {
            conditions.push(`date = $${values.length + 1}`)
            values.push(date)
        }

        if (conditions.length > 0) {
            query += " WHERE " + conditions.join(" AND ")
        }

        query += " ORDER BY price ASC"

        const result = await pool.query(query, values)

        return NextResponse.json(result.rows, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}