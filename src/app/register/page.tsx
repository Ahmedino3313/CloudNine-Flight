"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Lock, Eye, EyeOff, Plane } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Register",
    description: "Create your CloudNine account and start booking flights.",
}

export default function RegisterPage() {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    async function handleRegister() {
        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            toast.error("All fields are required")
            return
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters")
            return
        }

        setLoading(true)
        try {
            const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
            })

            const data = await res.json()

            if (!res.ok) {
            toast.error(data.error || "Something went wrong")
            return
            }

            router.push("/login?registered=true")
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-6 py-24" suppressHydrationWarning>
            <div className="w-full max-w-md">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E63946] rounded-2xl mb-4">
                        <Plane size={28} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#0a0a0a]">Create your account</h1>
                    <p className="text-[#666] mt-2">Join CloudNine and start flying</p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-sm"
                >
                    {/* Name */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-[#0a0a0a] mb-2 block">Full Name</label>
                        <div className="flex items-center gap-3 bg-[#F5F5F5] rounded-xl px-4 py-3">
                            <User size={16} className="text-[#E63946] shrink-0" />
                            <input
                                type="text"
                                placeholder="Enter full name"
                                value={name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                className="bg-transparent text-[#0a0a0a] text-sm outline-none w-full placeholder:text-[#999]"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-[#0a0a0a] mb-2 block">Email Address</label>
                        <div className="flex items-center gap-3 bg-[#F5F5F5] rounded-xl px-4 py-3">
                        <Mail size={16} className="text-[#E63946] shrink-0" />
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            className="bg-transparent text-[#0a0a0a] text-sm outline-none w-full placeholder:text-[#999]"
                        />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-[#0a0a0a] mb-2 block">Password</label>
                        <div className="flex items-center gap-3 bg-[#F5F5F5] rounded-xl px-4 py-3">
                        <Lock size={16} className="text-[#E63946] shrink-0" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Min 6 characters"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            className="bg-transparent text-[#0a0a0a] text-sm outline-none w-full placeholder:text-[#999]"
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-[#666] hover:text-[#0a0a0a] transition-colors"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label className="text-sm font-medium text-[#0a0a0a] mb-2 block">Confirm Password</label>
                        <div className="flex items-center gap-3 bg-[#F5F5F5] rounded-xl px-4 py-3">
                        <Lock size={16} className="text-[#E63946] shrink-0" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Repeat your password"
                            value={confirmPassword}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                            className="bg-transparent text-[#0a0a0a] text-sm outline-none w-full placeholder:text-[#999]"
                        />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full bg-[#E63946] hover:bg-[#c1121f] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                        "Create Account"
                        )}
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-sm text-[#666] mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#E63946] font-medium hover:underline">
                            Login
                        </Link>
                    </p>
                </motion.div>
            </div>
        </main>
    )
}