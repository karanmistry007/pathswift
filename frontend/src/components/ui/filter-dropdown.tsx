
"use client"

import * as React from "react"
import { Globe, Tag, User, ChevronDown, Search, Check, X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { TypeIcon as type, type LucideIcon } from "lucide-react"


interface Option {
    value: string
    label: string
}

interface FilterOption extends Option {
    icon: LucideIcon
}

const filterOptions: FilterOption[] = [
    {
        value: "domain",
        label: "Domain",
        icon: Globe,
    },
    {
        value: "tag",
        label: "Tag",
        icon: Tag,
    },
    {
        value: "creator",
        label: "Creator",
        icon: User,
    },
]

interface FilterDropdownProps {
    onSelectionChange?: (values: string[]) => void
    className?: string
    placeholder?: string
    searchPlaceholder?: string
    emptyMessage?: string
    maxDisplayItems?: number
}

export function FilterDropdown({
    onSelectionChange,
    className,
    placeholder = "Filter",
    searchPlaceholder = "Search filters...",
    emptyMessage = "No filters found.",
    maxDisplayItems = 2,
}: FilterDropdownProps) {
    const [open, setOpen] = React.useState(false)
    const [selected, setSelected] = React.useState<string[]>([])
    const [searchQuery, setSearchQuery] = React.useState("")

    const filteredOptions = React.useMemo(() => {
        if (!searchQuery) return filterOptions
        const lowerQuery = searchQuery.toLowerCase()
        return filterOptions.filter((option) => option.label.toLowerCase().includes(lowerQuery))
    }, [searchQuery])

    const handleSelectionChange = React.useCallback(
        (values: string[]) => {
            setSelected(values)
            onSelectionChange?.(values)
        },
        [onSelectionChange],
    )

    const toggleSelection = React.useCallback(
        (value: string) => {
            const newSelection = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]
            handleSelectionChange(newSelection)
        },
        [selected, handleSelectionChange],
    )

    const removeItem = React.useCallback(
        (valueToRemove: string, e?: React.MouseEvent) => {
            e?.stopPropagation()
            const newSelection = selected.filter((value) => value !== valueToRemove)
            handleSelectionChange(newSelection)
        },
        [selected, handleSelectionChange],
    )

    const clearAll = React.useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            handleSelectionChange([])
            setSearchQuery("")
        },
        [handleSelectionChange],
    )

    const displayedItems = selected.slice(0, maxDisplayItems)
    const remainingCount = selected.length - maxDisplayItems

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "w-[240px] justify-between bg-background hover:bg-accent/10",
                        "min-h-10 h-auto py-2 px-3",
                        selected.length > 0 && "border-primary/30",
                        className,
                    )}
                >
                    <div className="flex flex-wrap gap-1.5 items-center">
                        {selected.length === 0 ? (
                            <span className="text-muted-foreground text-sm">{placeholder}</span>
                        ) : (
                            <>
                                {displayedItems.map((value) => {
                                    const option = filterOptions.find((opt) => opt.value === value)
                                    if (!option) return null
                                    return (
                                        <Badge
                                            key={value}
                                            variant="secondary"
                                            className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-normal"
                                        >
                                            <option.icon className="h-3 w-3" />
                                            {option.label}
                                            <button
                                                onClick={(e) => removeItem(value, e)}
                                                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-accent/50"
                                            >
                                                <X className="h-3 w-3" />
                                                <span className="sr-only">Remove {option.label} filter</span>
                                            </button>
                                        </Badge>
                                    )
                                })}
                                {remainingCount > 0 && (
                                    <Badge
                                        variant="secondary"
                                        className="flex items-center gap-1 px-1.5 py-0.5 text-xs font-normal bg-primary/10 text-primary hover:bg-primary/20"
                                    >
                                        <Plus className="h-3 w-3" />
                                        {remainingCount} more
                                    </Badge>
                                )}
                                {selected.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        onClick={clearAll}
                                        className="h-auto p-0 text-xs font-normal hover:bg-transparent hover:text-muted-foreground/70"
                                    >
                                        Clear all
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0" align="start" sideOffset={8}>
                <Command className="rounded-md border shadow-md">
                    <div className="flex items-center border-b px-3">
                        <Search className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                        <CommandInput
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                            className="h-9 flex-1"
                        />
                    </div>
                    <CommandList>
                        <CommandEmpty className="py-2 text-sm text-center">{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {filteredOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={() => toggleSelection(option.value)}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 cursor-pointer aria-selected:bg-accent",
                                        selected.includes(option.value) && "bg-accent",
                                    )}
                                >
                                    <div className="flex items-center gap-2 flex-1">
                                        <option.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                                        <span className="text-sm">{option.label}</span>
                                    </div>
                                    {selected.includes(option.value) && <Check className="h-4 w-4 text-primary shrink-0" />}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

