"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff, Plane } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/AuthContext"
import { Suspense } from "react"
import toast from "react-hot-toast"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Login",
    description: "Login to your CloudNine account.",
}

function LoginForm() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    const { refreshUser } = useAuth()

    useEffect(() => {
        if (searchParams.get("registered") === "true") {
            toast.success("Account created! Please login.")
        }
    }, [searchParams])

    async function handleLogin() {
        if (!email.trim() || !password) {
            toast.error("All fields are required")
            return
        }

        setLoading(true)
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim(), password }),
            })

            const data = await res.json()

            if (!res.ok) {
                toast.error(data.error || "Something went wrong")
                return
            }

            await refreshUser()
            toast.success("Welcome back!")
            router.push("/dashboard")
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
                    <h1 className="text-2xl font-bold text-[#0a0a0a]">Welcome back</h1>
                    <p className="text-[#666] mt-2">Login to your CloudNine account</p>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-sm"
                >
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
                    <div className="mb-6">
                        <label className="text-sm font-medium text-[#0a0a0a] mb-2 block">Password</label>
                        <div className="flex items-center gap-3 bg-[#F5F5F5] rounded-xl px-4 py-3">
                            <Lock size={16} className="text-[#E63946] shrink-0" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Your password"
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

                    {/* Submit */}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-[#E63946] hover:bg-[#c1121f] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                        "Login"
                        )}
                    </button>

                    {/* Register Link */}
                    <p className="text-center text-sm text-[#666] mt-6">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-[#E63946] font-medium hover:underline">
                            Create one
                        </Link>
                    </p>
                </motion.div>
            </div>
        </main>
    )
    }

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#E63946] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    )
}