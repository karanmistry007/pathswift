"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

interface SearchBarProps {
    placeholder?: string
    onChange?: (value: string) => void
    onSubmit?: (value: string) => void
}

export default function SearchBar({ placeholder = "Search...", onChange, onSubmit }: SearchBarProps) {
    return (
        <div className="relative w-full max-w-[320px]">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <Input
                type="search"
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSubmit?.(e.currentTarget.value)
                    }
                }}
                className="w-full pl-9 rounded-lg border-muted-foreground/20"
            />
        </div>
    )
}

