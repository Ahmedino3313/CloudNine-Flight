"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Plane, LayoutDashboard, LogIn, Rocket, Home, LogOut } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"
import { useRouter } from "next/navigation"

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const { user, logout } = useAuth()
    const router = useRouter()

    async function handleLogout() {
        await logout()
        router.push("/")
    }

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#E0E0E0] bg-white/90 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/logo.jpeg" alt="CloudNine" width={40} height={40} className="rounded-full" />
                        <span className="font-bold text-xl tracking-tight">
                        <span className="text-[#0a0a0a]">Cloud</span>
                        <span className="text-[#E63946]">Nine</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-[#666] hover:text-[#0a0a0a] transition-colors duration-200 text-sm">
                            Home
                        </Link>

                        <Link href="/flights" className="text-[#666] hover:text-[#0a0a0a] transition-colors duration-200 text-sm">
                            Flights
                        </Link>

                        {user ? (
                        <>
                            <Link href="/dashboard" className="text-[#666] hover:text-[#0a0a0a] transition-colors duration-200 text-sm">
                            My Bookings
                            </Link>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-[#E63946] rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                    </div>
                                    <span className="text-sm font-medium text-[#0a0a0a]">
                                    {user.name.split(" ")[0]}
                                    </span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 border border-[#E0E0E0] hover:bg-[#F5F5F5] text-[#666] text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
                                >
                                    <LogOut size={14} />
                                    Logout
                                </button>                       
                            </div>
                        </>
                        ) : (
                            <>
                                <Link href="/login" className="text-[#666] hover:text-[#0a0a0a] transition-colors duration-200 text-sm">
                                    Login
                                </Link>

                                <Link href="/register" className="bg-[#E63946] hover:bg-[#c1121f] text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors duration-200">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[#0a0a0a] z-50"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setMenuOpen(false)}
                        />

                        <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed top-0 right-0 h-full w-72 bg-white border-l border-[#E0E0E0] z-50 md:hidden flex flex-col"
                        >
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E0E0E0]">
                            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
                            <Image src="/logo.jpeg" alt="CloudNine" width={36} height={36} className="rounded-full" />
                            <span className="font-bold text-lg">
                                <span className="text-[#0a0a0a]">Cloud</span>
                                <span className="text-[#E63946]">Nine</span>
                            </span>
                            </Link>
                            <button onClick={() => setMenuOpen(false)} className="text-[#666] hover:text-[#0a0a0a]">
                            <X size={22} />
                            </button>
                        </div>

                        {/* User info if logged in */}
                        {user && (
                            <div className="px-6 py-4 border-b border-[#E0E0E0] flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#E63946] rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">
                                {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-[#0a0a0a]">{user.name}</p>
                                <p className="text-xs text-[#666]">{user.email}</p>
                            </div>
                            </div>
                        )}

                        {/* Drawer Links */}
                        <div className="flex flex-col gap-2 px-4 py-6 flex-1">
                            <Link
                                href="/"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 text-[#666] hover:text-[#0a0a0a] hover:bg-[#F5F5F5] px-4 py-3 rounded-lg transition-all duration-200"
                            >
                                <Home size={18} className="text-[#E63946]" />
                                <span>Home</span>
                            </Link>

                            <Link
                                href="/flights"
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center gap-3 text-[#666] hover:text-[#0a0a0a] hover:bg-[#F5F5F5] px-4 py-3 rounded-lg transition-all duration-200"
                            >
                                <Plane size={18} className="text-[#E63946]" />
                                <span>Flights</span>
                            </Link>

                            {user ? (
                                <Link
                                    href="/dashboard"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-3 text-[#666] hover:text-[#0a0a0a] hover:bg-[#F5F5F5] px-4 py-3 rounded-lg transition-all duration-200"
                                >
                                    <LayoutDashboard size={18} className="text-[#E63946]" />
                                    <span>My Bookings</span>
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center gap-3 text-[#666] hover:text-[#0a0a0a] hover:bg-[#F5F5F5] px-4 py-3 rounded-lg transition-all duration-200"
                                >
                                    <LogIn size={18} className="text-[#E63946]" />
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>

                        {/* Drawer Footer */}
                        <div className="px-4 py-6 border-t border-[#E0E0E0]">
                            {user ? (
                                <button
                                    onClick={() => { handleLogout(); setMenuOpen(false) }}
                                    className="flex items-center justify-center gap-2 border border-[#E0E0E0] hover:bg-[#F5F5F5] text-[#666] font-medium px-5 py-3 rounded-lg transition-colors duration-200 w-full"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    href="/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#c1121f] text-white font-medium px-5 py-3 rounded-lg transition-colors duration-200 w-full"
                                >
                                    <Rocket size={18} />
                                    Get Started
                                </Link>
                            )}
                        </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}