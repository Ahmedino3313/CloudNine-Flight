import Link from "next/link"
import Image from "next/image"

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-[#0a0a0a] text-white py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <Image src="/logo.jpeg" alt="CloudNine" width={40} height={40} className="rounded-full" />
                            <span className="font-bold text-xl">
                                <span className="text-white">Cloud</span>
                                <span className="text-[#E63946]">Nine</span>
                            </span>
                        </div>
                        <p className="text-[#888] text-sm leading-relaxed max-w-xs">
                            Fly above the rest with CloudNine. Your trusted partner for booking flights worldwide, fast and affordable.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>

                        <div className="flex flex-col gap-3">
                            <Link href="/flights" className="text-[#888] hover:text-white text-sm transition-colors">Flights</Link>
                            <Link href="/dashboard" className="text-[#888] hover:text-white text-sm transition-colors">My Bookings</Link>
                            <Link href="/login" className="text-[#888] hover:text-white text-sm transition-colors">Login</Link>
                            <Link href="/register" className="text-[#888] hover:text-white text-sm transition-colors">Register</Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>

                        <div className="flex flex-col gap-3">
                            <p className="text-[#888] text-sm">support@cloudnine.com</p>
                            <p className="text-[#888] text-sm">+1 (800) 555-5786</p>
                            <p className="text-[#888] text-sm">Available 24/7</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#2a2a2a] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[#888] text-sm">&copy; {year} CloudNine. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-[#888] hover:text-white text-sm transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-[#888] hover:text-white text-sm transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}