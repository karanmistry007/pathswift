"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MdOutlineYoutubeSearchedFor } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchBarProps {
    placeholder?: string
    onChange?: (value: string) => void
    onSubmit?: (value: string) => void
}

export default function SearchBar({ placeholder = "Search...", onChange, onSubmit }: SearchBarProps) {
    const [expanded, setExpanded] = useState(false)
    const [value, setValue] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const isMobile = useMediaQuery("(max-width: 640px)")

    // Media query hook
    function useMediaQuery(query: string) {
        const [matches, setMatches] = useState(false)

        useEffect(() => {
            const media = window.matchMedia(query)
            if (media.matches !== matches) {
                setMatches(media.matches)
            }

            const listener = () => setMatches(media.matches)
            window.addEventListener("resize", listener)
            return () => window.removeEventListener("resize", listener)
        }, [matches, query])

        return matches
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        onChange?.(newValue)
    }

    const handleSubmit = () => {
        if (value.trim()) {
            onSubmit?.(value);
            setExpanded(false);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit()
        } else if (e.key === "Escape") {
            setExpanded(false)
        }
    }

    const handleIconClick = () => {
        if (isMobile) {
            // Toggle expanded state
            setExpanded(!expanded)
            if (!expanded) {
                // Focus the input when expanding
                setTimeout(() => inputRef.current?.focus(), 10)
            }
        }
    }

    // Handle clicks outside to collapse on mobile
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (expanded && containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setExpanded(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [expanded])

    // Focus input when expanded
    useEffect(() => {
        if (expanded && inputRef.current) {
            inputRef.current.focus()
        }
    }, [expanded])

    return (
        <div ref={containerRef} className={cn("border border-neutral-200 rounded-md ", isMobile ? "w-auto" : "w-full max-w-[320px]")}>
            {/* Mobile search icon button (only visible when collapsed) */}
            {isMobile && !expanded && (
                <button
                    type="button"
                    onClick={handleIconClick}
                    className={cn(
                        "h-9 w-9 flex items-center justify-center bg-background",
                        value && "border-primary/50",
                    )}
                    aria-label="Search"
                >
                    {value ? (
                        <MdOutlineYoutubeSearchedFor className="h-6 w-6 text-primary" />
                    ) : (
                        <MdOutlineSearch className="h-6 w-6 text-muted-foreground/60" />
                    )}
                </button>
            )}

            {/* Search input container */}
            <div
                className={cn(
                    "transition-all duration-200 ease-in-out",
                    isMobile && !expanded && "hidden",
                    isMobile && expanded && "absolute w-[calc(100dvw_-_40px)] top-0 left-0 z-50",
                )}
            >
                <div className="relative max-w-screen-lg mx-auto">
                    <Input
                        ref={inputRef}
                        type="search"
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onBlur={() => isMobile && !value && setExpanded(false)}
                        className="w-full pl-9 rounded-lg border-none"
                    />

                    {/* Search icon inside input */}
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground/60">
                        <MdOutlineSearch className="h-6 w-6" />
                    </div>
                </div>
            </div>
        </div>
    )
}

