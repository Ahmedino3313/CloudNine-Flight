"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface AuthUser {
    id: number
    name: string
    email: string
}

interface AuthContextType {
    user: AuthUser | null
    loading: boolean
    refreshUser: () => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    refreshUser: async () => {},
    logout: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    async function refreshUser() {
        try {
            const res = await fetch("/api/auth/me")
            if (res.ok) {
                const data = await res.json()
                setUser(data)
            } else {
                setUser(null)
            }
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        await fetch("/api/auth/logout", { method: "POST" })
        setUser(null)
    }

    useEffect(() => {
        refreshUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
        {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}