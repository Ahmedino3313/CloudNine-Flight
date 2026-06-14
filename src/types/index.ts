export interface User {
    id: number
    name: string
    email: string
    created_at: string
}

export interface Flight {
    id: number
    from_city: string
    to_city: string
    from_code: string
    to_code: string
    date: string
    departure_time: string
    arrival_time: string
    price: number
    seats: number
    airline: string
    image: string
    duration: string
}

export interface Booking {
    id: number
    user_id: number
    flight_id: number
    seats: number
    total_price: number
    status: string
    created_at: string
    
    // These come from the JOIN query directly
    from_city: string
    to_city: string
    from_code: string
    to_code: string
    date: string
    departure_time: string
    arrival_time: string
    airline: string
    duration: string
    flight?: Flight
}

export interface AuthUser {
    id: number
    name: string
    email: string
}