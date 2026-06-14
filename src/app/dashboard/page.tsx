"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plane, Calendar, Clock, ArrowRight, LogOut, User } from "lucide-react"
import { Booking } from "@/types"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/AuthContext"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "My Bookings",
    description: "View and manage all your CloudNine flight bookings.",
}

function BookingSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-3">
            <div className="h-3 w-24 bg-[#E0E0E0] rounded" />
            <div className="h-6 w-48 bg-[#E0E0E0] rounded" />
            <div className="h-3 w-32 bg-[#E0E0E0] rounded" />
            </div>
            <div className="space-y-2">
            <div className="h-4 w-28 bg-[#E0E0E0] rounded" />
            <div className="h-4 w-20 bg-[#E0E0E0] rounded" />
            </div>
            <div className="h-8 w-24 bg-[#E0E0E0] rounded-lg" />
        </div>
        </div>
    )
}

export default function DashboardPage() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")
    const router = useRouter()

    const { user, logout } = useAuth()

    useEffect(() => {
    async function fetchData() {
        // Fetch bookings
        try {
            const res = await fetch("/api/bookings")
            if (res.status === 401) {
                router.push("/login")
                return
            }
            const data = await res.json()
            if (data.error) {
                setError(data.error)
                return
            }
            setBookings(data)
        } catch (error) {
            console.error(error)
            setError("Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    fetchData()
    }, [])

    async function handleLogout() {
        await logout()
        router.push("/")
    }

    return (
        <main className="min-h-screen bg-[#F5F5F5] pt-24 pb-16" suppressHydrationWarning>

            {/* Header */}
            <div className="relative py-16 px-6 mb-10 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-[#0a0a0a] via-[#1a0a0a] to-[#2a0a0a]" />
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#E63946]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#E63946]/5 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-[#E63946]/20 border border-[#E63946]/30 text-[#E63946] text-sm px-4 py-2 rounded-full mb-4">
                            <User size={14} />
                            My Account
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white">
                            Welcome, <span className="text-[#E63946]">{user?.name || "Traveller"}</span>
                        </h1>
                        <p className="text-[#888] mt-2">Manage all your flight bookings</p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-xl transition-colors duration-200 text-sm"
                    >
                        <LogOut size={16} />
                        Logout
                    </motion.button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="flex flex-col gap-4">
                        {[...Array(3)].map((_, i) => <BookingSkeleton key={i} />)}
                    </div>
                    ) : bookings.length === 0 ? (
                        <div className="text-center py-24">
                            <Plane size={48} className="text-[#ccc] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#0a0a0a] mb-2">No bookings yet</h3>
                            <p className="text-[#666] mb-6">Start exploring flights and book your first trip!</p>
                            <button
                                onClick={() => router.push("/flights")}
                                className="bg-[#E63946] hover:bg-[#c1121f] text-white font-medium px-6 py-3 rounded-xl transition-colors duration-200"
                            >
                                Browse Flights
                            </button>
                        </div>
                    ) : (

                        <div className="flex flex-col gap-4">
                            <p className="text-[#666] text-sm">{bookings.length} booking{bookings.length > 1 ? "s" : ""} found</p>
                            {bookings.map((booking, index) => (
                            <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">

                                    {/* Route */}
                                    <div className="flex-1">
                                        <p className="text-xs text-[#666] mb-2">{booking.airline}</p>
                                        <div className="flex items-center gap-3">
                                        <div>
                                            <p className="text-2xl font-bold text-[#0a0a0a]">{booking.from_code}</p>
                                            <p className="text-xs text-[#666]">{booking.from_city}</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <ArrowRight size={16} className="text-[#E63946]" />
                                            <p className="text-xs text-[#666]">{booking.duration}</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-[#0a0a0a]">{booking.to_code}</p>
                                            <p className="text-xs text-[#666]">{booking.to_city}</p>
                                        </div>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-sm text-[#666]">
                                        <Calendar size={14} className="text-[#E63946]" />
                                        <span>{booking.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-[#666]">
                                        <Clock size={14} className="text-[#E63946]" />
                                        <span>{booking.departure_time} → {booking.arrival_time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-[#666]">
                                        <Plane size={14} className="text-[#E63946]" />
                                        <span>{booking.seats} seat{booking.seats > 1 ? "s" : ""}</span>
                                        </div>
                                    </div>

                                    {/* Price + Status */}
                                    <div className="flex flex-col items-end gap-2">
                                        <p className="text-2xl font-bold text-[#0a0a0a]">${booking.total_price}</p>
                                        <span className="bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                                        {booking.status}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                            ))}
                    </div>
                )}
            </div>
        </main>
    )
}