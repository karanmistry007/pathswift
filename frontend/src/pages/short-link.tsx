import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"



import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { FilterDropdown } from "@/components/ui/filter-dropdown"


type Props = {}

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

const ShortLink = (props: Props) => {

    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>

                    {/* HEADER */}
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            <h6 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                                Links
                                            </h6>
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>

                    {/* MAIN SECTION */}
                    <main className="main p-5">

                        {/* TOOLBAR */}
                        <div className="toolbar">

                            {/* FILTER */}
                            <div className="filter">
                                <FilterDropdown
                                    onSelectionChange={setSelectedFilters}
                                    placeholder="Select filters..."
                                    searchPlaceholder="Search filters..."
                                />
                            </div>

                        </div>

                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

export default ShortLink