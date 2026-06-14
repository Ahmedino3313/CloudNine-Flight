"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { Plane, MapPin, Calendar, Search, Clock, ArrowRight } from "lucide-react"
import { Flight } from "@/types"
import Link from "next/link"
import Image from "next/image"

const FLIGHTS_PER_PAGE = 6

function FlightSkeleton() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-40 bg-[#E0E0E0] shrink-0" />
                <div className="flex-1 p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1 space-y-3">
                    <div className="h-3 bg-[#E0E0E0] rounded w-24" />
                    <div className="h-6 bg-[#E0E0E0] rounded w-48" />
                    <div className="h-3 bg-[#E0E0E0] rounded w-32" />
                </div>
                <div className="h-4 bg-[#E0E0E0] rounded w-36" />
                <div className="flex flex-col items-end gap-2">
                    <div className="h-8 bg-[#E0E0E0] rounded w-20" />
                    <div className="h-3 bg-[#E0E0E0] rounded w-16" />
                    <div className="h-8 bg-[#E0E0E0] rounded w-24" />
                </div>
                </div>
            </div>
        </div>
    )
}

function FlightsPage() {
    const [flights, setFlights] = useState<Flight[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [from, setFrom] = useState<string>("")
    const [to, setTo] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [page, setPage] = useState<number>(1)

    const searchParams = useSearchParams()

    useEffect(() => {
        const fromParam = searchParams.get("from") || ""
        const toParam = searchParams.get("to") || ""
        const dateParam = searchParams.get("date") || ""
        setFrom(fromParam)
        setTo(toParam)
        setDate(dateParam)
    }, [searchParams])

    function changePage(newPage: number) {
        setPage(newPage)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    async function fetchFlights() {
    setLoading(true)
    try {
        const params = new URLSearchParams()
        if (from.trim()) params.append("from", from.trim())
        if (to.trim()) params.append("to", to.trim())
        if (date.trim()) params.append("date", date.trim())

        const res = await fetch(`/api/flights?${params.toString()}`)
        const data = await res.json()
        setFlights(data)
        setPage(1)
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
    }

    useEffect(() => {
        fetchFlights()
    }, [])

    const totalPages = Math.ceil(flights.length / FLIGHTS_PER_PAGE)
    const paginated = flights.slice((page - 1) * FLIGHTS_PER_PAGE, page * FLIGHTS_PER_PAGE)

    return (
        <main className="min-h-screen bg-[#F5F5F5] pt-24 pb-16" suppressHydrationWarning>

            {/* Header */}
            <div className="relative py-20 px-6 mb-10 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-linear-to-br from-[#0a0a0a] via-[#1a0a0a] to-[#2a0a0a]" />

                    {/* Decorative circles */}
                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#E63946]/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#E63946]/5 rounded-full blur-3xl" />

                    {/* Plane decorative icon */}
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10 hidden md:block"
                    >
                        <Plane size={180} className="text-[#E63946]" />
                    </motion.div>

                    <div className="relative z-10 max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 bg-[#E63946]/20 border border-[#E63946]/30 text-[#E63946] text-sm px-4 py-2 rounded-full mb-5"
                        >
                            <Plane size={14} />
                            500+ destinations worldwide
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold text-white mb-3"
                        >
                            Find Your <span className="text-[#E63946]">Flight</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-[#888] text-lg"
                        >
                            Search, compare and book the best deals
                        </motion.p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6">

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-4 shadow-sm mb-10"
                >
                    <div className="flex flex-col md:flex-row gap-3">

                        {/* From */}
                        <div className="flex-1 flex items-center gap-3 bg-[#F5F5F5] rounded-xl px-4 py-3">
                            <MapPin size={16} className="text-[#E63946] shrink-0" />

                            <div className="w-full">
                                <p className="text-xs text-[#666] mb-0.5">From</p>

                                <input
                                    type="text"
                                    placeholder="New York"
                                    value={from}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = e.target.value.replace(/[^a-zA-Z\s]/g, "")
                                        setFrom(value)
                                    }}
                                    onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
                                        e.preventDefault()
                                        const pasted = e.clipboardData.getData("text").replace(/[^a-zA-Z\s]/g, "")
                                        setFrom(pasted)
                                    }}
                                    className="bg-transparent text-[#0a0a0a] text-sm font-medium outline-none w-full placeholder:text-[#999]"
                                />
                            </div>
                        </div>

                        {/* To */}
                        <div className="flex-1 flex items-center gap-3 bg-[#F5F5F5] rounded-xl px-4 py-3">
                            <Plane size={16} className="text-[#E63946] shrink-0" />

                            <div className="w-full">
                                <p className="text-xs text-[#666] mb-0.5">To</p>

                                <input
                                    type="text"
                                    placeholder="London"
                                    value={to}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = e.target.value.replace(/[^a-zA-Z\s]/g, "")
                                        setTo(value)
                                    }}
                                    onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
                                        e.preventDefault()
                                        const pasted = e.clipboardData.getData("text").replace(/[^a-zA-Z\s]/g, "")
                                        setTo(pasted)
                                    }}
                                    className="bg-transparent text-[#0a0a0a] text-sm font-medium outline-none w-full placeholder:text-[#999]"
                                />
                            </div>
                        </div>

                        {/* Date */}
                        <div className="flex-1 flex items-center gap-3 bg-[#F5F5F5] rounded-xl px-4 py-3">
                            <Calendar size={16} className="text-[#E63946] shrink-0" />
                            <div className="w-full">

                                <p className="text-xs text-[#666] mb-0.5">Date</p>

                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                                    className="bg-transparent text-[#0a0a0a] text-sm font-medium outline-none w-full"
                                />
                            </div>
                        </div>

                        {/* Search */}
                        <button
                            onClick={fetchFlights}
                            className="flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#c1121f] text-white font-medium px-6 py-3 rounded-xl transition-colors duration-200 cursor-pointer"
                        >
                            <Search size={18} />
                            <span>Search</span>
                        </button>
                    </div>
                </motion.div>

                {/* Results */}
                {loading ? (
                    <div className="flex flex-col gap-4">
                        <div className="h-4 bg-[#E0E0E0] rounded w-32 animate-pulse" />
                        {[...Array(4)].map((_, i) => <FlightSkeleton key={i} />)}
                    </div>
                ) : flights.length === 0 ? (
                    <div className="text-center py-24">
                        <Plane size={48} className="text-[#ccc] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-[#0a0a0a] mb-2">No flights found</h3>
                        <p className="text-[#666]">Try different search terms</p>
                    </div>
                ) : (
                    <>
                        <p className="text-[#666] text-sm mb-4">{flights.length} flights found</p>

                        <div className="flex flex-col gap-4">
                            {paginated.map((flight, index) => (
                                <motion.div
                                key={flight.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        <div className="relative w-full md:w-48 h-40 md:h-auto shrink-0">
                                            <Image
                                                src={flight.image}
                                                alt={flight.to_city}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 192px"
                                            />
                                        </div>

                                        <div className="flex-1 p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                                            <div className="flex-1">
                                                <p className="text-xs text-[#666] mb-1">{flight.airline}</p>
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <p className="text-2xl font-bold text-[#0a0a0a]">{flight.from_code}</p>
                                                        <p className="text-xs text-[#666]">{flight.from_city}</p>
                                                    </div>

                                                    <div className="flex flex-col items-center gap-1">
                                                        <ArrowRight size={16} className="text-[#E63946]" />
                                                        <p className="text-xs text-[#666]">{flight.duration}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-2xl font-bold text-[#0a0a0a]">{flight.to_code}</p>
                                                        <p className="text-xs text-[#666]">{flight.to_city}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-[#666] text-sm">
                                                <Clock size={14} className="text-[#E63946]" />
                                                <span>{flight.departure_time} → {flight.arrival_time}</span>
                                            </div>

                                            <div className="flex flex-col items-end gap-2">
                                                <p className="text-2xl font-bold text-[#0a0a0a]">${flight.price}</p>
                                                <p className="text-xs text-[#666]">{flight.seats} seats left</p>
                                                <Link
                                                    href={`/flights/${flight.id}`}
                                                    className="bg-[#E63946] hover:bg-[#c1121f] text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors duration-200"
                                                >
                                                    View Deal
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-10">
                            <button
                                onClick={() => changePage(Math.max(1, page - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 rounded-lg border border-[#E0E0E0] text-sm font-medium text-[#666] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => changePage(i + 1)}
                                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                                    page === i + 1
                                        ? "bg-[#E63946] text-white"
                                        : "border border-[#E0E0E0] text-[#666] hover:bg-white"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => changePage(Math.min(totalPages, page + 1))}
                                disabled={page === totalPages}
                                className="px-4 py-2 rounded-lg border border-[#E0E0E0] text-sm font-medium text-[#666] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                        )}
                    </>
                )}
            </div>
        </main>
    )
}

export default function FlightsPageWrapper() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-[#E63946] border-t-transparent rounded-full animate-spin" /></div>}>
        <FlightsPage />
        </Suspense>
    )
}