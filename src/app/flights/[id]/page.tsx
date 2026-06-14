"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plane, Clock, ArrowRight, Calendar, Users, ChevronLeft } from "lucide-react"
import { Flight } from "@/types"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

function FlightDetailSkeleton() {
    return (
        <main className="min-h-screen bg-[#F5F5F5] pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6">
            {/* Back button skeleton */}
            <div className="h-5 w-32 bg-[#E0E0E0] rounded animate-pulse mb-8" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Image skeleton */}
                <div className="h-64 rounded-2xl bg-[#E0E0E0] animate-pulse" />

                {/* Details card skeleton */}
                <div className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="h-5 w-32 bg-[#E0E0E0] rounded mb-6" />
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-2">
                        <div className="h-10 w-20 bg-[#E0E0E0] rounded" />
                        <div className="h-4 w-24 bg-[#E0E0E0] rounded" />
                        <div className="h-4 w-16 bg-[#E0E0E0] rounded" />
                    </div>
                    <div className="h-6 w-24 bg-[#E0E0E0] rounded" />
                    <div className="space-y-2 items-end flex flex-col">
                        <div className="h-10 w-20 bg-[#E0E0E0] rounded" />
                        <div className="h-4 w-24 bg-[#E0E0E0] rounded" />
                        <div className="h-4 w-16 bg-[#E0E0E0] rounded" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-[#F5F5F5] rounded-xl p-4 space-y-2">
                        <div className="h-3 w-16 bg-[#E0E0E0] rounded" />
                        <div className="h-4 w-20 bg-[#E0E0E0] rounded" />
                    </div>
                    ))}
                </div>
                </div>
            </div>

            {/* Right — Booking card skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm animate-pulse h-fit">
                <div className="h-5 w-36 bg-[#E0E0E0] rounded mb-6" />
                <div className="h-10 w-28 bg-[#E0E0E0] rounded mb-6" />
                <div className="h-4 w-32 bg-[#E0E0E0] rounded mb-3" />
                <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#E0E0E0] rounded-lg" />
                <div className="w-8 h-6 bg-[#E0E0E0] rounded" />
                <div className="w-10 h-10 bg-[#E0E0E0] rounded-lg" />
                </div>
                <div className="bg-[#F5F5F5] rounded-xl p-4 mb-6 space-y-2">
                <div className="h-4 w-full bg-[#E0E0E0] rounded" />
                <div className="h-4 w-3/4 bg-[#E0E0E0] rounded" />
                </div>
                <div className="h-12 w-full bg-[#E0E0E0] rounded-xl" />
            </div>
            </div>
        </div>
        </main>
    )
}

export default function FlightDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [flight, setFlight] = useState<Flight | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [seats, setSeats] = useState<number>(1)
    const [booking, setBooking] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        async function fetchFlight() {
            try {
                const { id } = await params
                const res = await fetch(`/api/flights/${id}`)
                const data = await res.json()
                if (data.error) {
                router.push("/flights")
                return
                }
                setFlight(data)
            } catch (error) {
                console.error(error)
                router.push("/flights")
            } finally {
                setLoading(false)
            }
        }
        fetchFlight()
    }, [])

    async function handleBooking() {
        setBooking(true)
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ flight_id: flight?.id, seats }),
            })
            const data = await res.json()
            if (!res.ok) {
                toast.error(data.error || "Something went wrong")
                return
            }
            toast.success("Flight booked successfully!")
            setTimeout(() => router.push("/dashboard"), 2000)
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        } finally {
            setBooking(false)
        }
    }

    if (loading) {
    return <FlightDetailSkeleton />
    }

    if (!flight) return null

    const totalPrice = (Number(flight.price) * seats).toFixed(2)

    return (
        <main className="min-h-screen bg-[#F5F5F5] pt-24 pb-16" suppressHydrationWarning>
            <div className="max-w-5xl mx-auto px-6">

                {/* Back Button */}
                <Link
                    href="/flights"
                    className="inline-flex items-center gap-2 text-[#666] hover:text-[#0a0a0a] transition-colors mb-8"
                >
                    <ChevronLeft size={18} />
                    Back to Flights
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left — Flight Info */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative h-64 rounded-2xl overflow-hidden"
                        >
                            <Image
                                src={flight.image}
                                alt={flight.to_city}
                                fill
                                className="object-cover"
                                sizes="100vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                            
                            <div className="absolute bottom-6 left-6">
                                <p className="text-white/70 text-sm">{flight.airline}</p>
                                <h1 className="text-white text-3xl font-bold">{flight.from_city} → {flight.to_city}</h1>
                            </div>
                        </motion.div>

                        {/* Flight Details Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm"
                        >
                            <h2 className="text-lg font-bold text-[#0a0a0a] mb-6">Flight Details</h2>

                            {/* Route */}
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <p className="text-4xl font-bold text-[#0a0a0a]">{flight.from_code}</p>
                                    <p className="text-[#666] mt-1">{flight.from_city}</p>
                                    <p className="text-[#E63946] font-medium mt-1">{flight.departure_time}</p>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-px bg-[#E0E0E0]" />
                                        <Plane size={20} className="text-[#E63946]" />
                                        <div className="w-16 h-px bg-[#E0E0E0]" />
                                    </div>
                                    <p className="text-xs text-[#666]">{flight.duration}</p>
                                </div>

                                <div className="text-right">
                                    <p className="text-4xl font-bold text-[#0a0a0a]">{flight.to_code}</p>
                                    <p className="text-[#666] mt-1">{flight.to_city}</p>
                                    <p className="text-[#E63946] font-medium mt-1">{flight.arrival_time}</p>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-[#F5F5F5] rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar size={14} className="text-[#E63946]" />
                                        <p className="text-xs text-[#666]">Date</p>
                                    </div>
                                    <p className="font-semibold text-[#0a0a0a] text-sm">{flight.date}</p>
                                </div>

                                <div className="bg-[#F5F5F5] rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock size={14} className="text-[#E63946]" />
                                        <p className="text-xs text-[#666]">Duration</p>
                                    </div>
                                    <p className="font-semibold text-[#0a0a0a] text-sm">{flight.duration}</p>
                                </div>

                                <div className="bg-[#F5F5F5] rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users size={14} className="text-[#E63946]" />
                                        <p className="text-xs text-[#666]">Seats Left</p>
                                    </div>
                                    <p className="font-semibold text-[#0a0a0a] text-sm">{flight.seats}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right — Booking Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-6 shadow-sm h-fit sticky top-28"
                    >
                        <h2 className="text-lg font-bold text-[#0a0a0a] mb-6">Book This Flight</h2>

                        {/* Price */}
                        <div className="mb-6">
                            <p className="text-xs text-[#666] mb-1">Price per seat</p>
                            <p className="text-4xl font-bold text-[#0a0a0a]">${flight.price}</p>
                        </div>

                        {/* Seats Selector */}
                        <div className="mb-6">
                            <p className="text-sm font-medium text-[#0a0a0a] mb-3">Number of Seats</p>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setSeats(s => Math.max(1, s - 1))}
                                    className="w-10 h-10 rounded-lg border border-[#E0E0E0] flex items-center justify-center text-[#0a0a0a] hover:bg-[#F5F5F5] transition-colors font-bold"
                                >
                                    -
                                </button>

                                <span className="text-xl font-bold text-[#0a0a0a] w-8 text-center">{seats}</span>

                                <button
                                    onClick={() => setSeats(s => Math.min(flight.seats, s + 1))}
                                    className="w-10 h-10 rounded-lg border border-[#E0E0E0] flex items-center justify-center text-[#0a0a0a] hover:bg-[#F5F5F5] transition-colors font-bold"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="bg-[#F5F5F5] rounded-xl p-4 mb-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-[#666]">Total Price</p>
                                <p className="text-xl font-bold text-[#E63946]">${totalPrice}</p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-xs text-[#666]">{seats} seat{seats > 1 ? "s" : ""} × ${flight.price}</p>
                                <ArrowRight size={14} className="text-[#666]" />
                            </div>
                        </div>

                        {/* Book Button */}
                        <button
                            onClick={handleBooking}
                            disabled={booking}
                            className="w-full bg-[#E63946] hover:bg-[#c1121f] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                        >
                        {booking ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <Plane size={18} />
                                Book Now
                            </>
                        )}
                        </button>

                        <p className="text-xs text-[#666] text-center mt-3">
                            You must be logged in to book
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}