"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plane, MapPin, Calendar, Search, Shield, Clock, CreditCard, Headphones } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your payment and personal data is always protected with bank level security."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our support team is available around the clock to help you with any issue."
  },
  {
    icon: CreditCard,
    title: "Best Prices",
    description: "We guarantee the best prices on all flights with no hidden fees or charges."
  },
  {
    icon: Headphones,
    title: "Easy Changes",
    description: "Need to change your flight? We make it simple with zero stress and hassle."
  },
]

const destinations = [
  { city: "London", country: "United Kingdom", price: 487, image: "/images/london.jpg" },
  { city: "Paris", country: "France", price: 520, image: "/images/paris.jpg" },
  { city: "Tokyo", country: "Japan", price: 832, image: "/images/tokyo.jpg" },
  { city: "Dubai", country: "UAE", price: 395, image: "/images/dubai.jpg" },
  { city: "Singapore", country: "Singapore", price: 390, image: "/images/singapore.jpg" },
  { city: "Sydney", country: "Australia", price: 680, image: "/images/sydney.jpg" },
]


export default function Home() {

  const router = useRouter()
  const [from, setFrom] = useState<string>("")
  const [to, setTo] = useState<string>("")
  const [date, setDate] = useState<string>("")

  function handleSearch() {
    const params = new URLSearchParams()
    if (from.trim()) params.append("from", from.trim())
    if (to.trim()) params.append("to", to.trim())
    if (date.trim()) params.append("date", date.trim())
    router.push(`/flights?${params.toString()}`)
  }

  return (
    <main className="min-h-screen" suppressHydrationWarning>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-2 rounded-full mb-4"
          >
            <Plane size={14} className="text-[#E63946]" />
            The world is waiting for you
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Fly Above
            <span className="text-[#E63946]"> The Rest</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Search and book flights to over 500 destinations worldwide. Fast, easy, and affordable.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-3 shadow-2xl max-w-3xl mx-auto w-full"
          >
            <div className="flex flex-col md:flex-row gap-2">

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

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#c1121f] text-white font-medium px-6 py-3 rounded-xl transition-colors duration-200"
              >
                <Search size={18} />
                <span>Search</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-[#E63946] text-sm font-medium uppercase tracking-widest mb-3">Top Picks</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a]">Popular Destinations</h2>
            <p className="text-[#666] mt-4 max-w-xl mx-auto">Discover our most booked routes from travellers around the world</p>
          </motion.div>

          {/* Destination Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, index) => (
              <motion.div
                key={dest.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href="/flights" className="group block relative overflow-hidden rounded-2xl aspect-4/3">
                  <Image
                    src={dest.image}
                    alt={dest.city}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/70 text-sm mb-1">{dest.country}</p>
                    <h3 className="text-white text-2xl font-bold">{dest.city}</h3>
                    <p className="text-[#E63946] font-semibold mt-1">From ${dest.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CloudNine */}
      <section className="py-24 px-6 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-[#E63946] text-sm font-medium uppercase tracking-widest mb-3">Why Us</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a0a0a]">Why Choose CloudNine</h2>
            <p className="text-[#666] mt-4 max-w-xl mx-auto">We make booking flights simple, fast and stress free</p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-[#E63946]/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon size={22} className="text-[#E63946]" />
                </div>
                <h3 className="text-[#0a0a0a] font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}