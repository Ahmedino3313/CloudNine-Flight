import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import pool from "@/lib/db"

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value

        if (!token) {
            return NextResponse.json(
                { error: "Please login to book a flight" },
                { status: 401 }
            )
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number }
        const { flight_id, seats } = await req.json()

        // Get flight details
        const flight = await pool.query(
            "SELECT * FROM flights WHERE id = $1",
            [flight_id]
        )

        if (flight.rows.length === 0) {
            return NextResponse.json(
                { error: "Flight not found" },
                { status: 404 }
            )
        }

        const flightData = flight.rows[0]

        // Check seats availability
        if (flightData.seats < seats) {
            return NextResponse.json(
                { error: "Not enough seats available" },
                { status: 400 }
            )
        }

        const total_price = flightData.price * seats

        // Create booking
        const booking = await pool.query(
            "INSERT INTO bookings (user_id, flight_id, seats, total_price) VALUES ($1, $2, $3, $4) RETURNING *",
            [decoded.id, flight_id, seats, total_price]
        )

        // Update available seats
        await pool.query(
            "UPDATE flights SET seats = seats - $1 WHERE id = $2",
            [seats, flight_id]
        )

        return NextResponse.json(
            { message: "Flight booked successfully", booking: booking.rows[0] },
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

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value

        if (!token) {
            return NextResponse.json(
                { error: "Please login to view bookings" },
                { status: 401 }
            )
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number }

        const result = await pool.query(
            `SELECT b.*, f.from_city, f.to_city, f.from_code, f.to_code, 
            f.date, f.departure_time, f.arrival_time, f.airline, f.duration
            FROM bookings b 
            JOIN flights f ON b.flight_id = f.id 
            WHERE b.user_id = $1 
            ORDER BY b.created_at DESC`,
            [decoded.id]
        )

        return NextResponse.json(result.rows, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}