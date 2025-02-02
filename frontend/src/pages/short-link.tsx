import { AppSidebar } from "@/components/app-sidebar"
import Filters from "@/components/layout/filters"
import LinkCard from "@/components/layout/link-card"
import SearchBar from "@/components/layout/search-bar"
import Sort from "@/components/layout/sort"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { useState } from "react"


// ? PROPS TYPE
type Props = {}

// ? SORT TYPE
interface useSortDataItems {
    name: string;
    sort: string;
}

// ? DEFINE SORTING DATA
const useSortData: useSortDataItems[] = [
    { name: "Created", sort: "creation" },
    { name: "Modified", sort: "modified" },
    { name: "Importance", sort: "is_important" },
    { name: "Due Date", sort: "date" },
    { name: "Reminder", sort: "send_reminder" },
    { name: "Status", sort: "status" },
    { name: "Description", sort: "description" },
];


// ? FILTER TYPE
interface useStatusFiltersItems {
    name: string;
}

// ? DEFINE STATUS DROPDOWN DATA
const useStatusFilterData: useStatusFiltersItems[] = [
    { name: "Open" },
    { name: "Completed" },
    { name: "Cancelled" },
]


const ShortLink = (props: Props) => {

    // ? HOOKS
    const [currentSort, setCurrentSort] = useState("creation");
    const [currentSortDirection, setCurrentSortDirection] = useState("desc");
    const [filters, setFilters] = useState<any[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [refreshState, setRefreshState] = useState(true);

    // ? UPDATE REFRESH STATE
    const handleRefreshState = (state: boolean) => setRefreshState(state);



    // ? HANDLE FILTERS DATA
    const handleFilters = (key: string, value: string, child_table = "") => {
        setFilters((prevFilters) => {
            // ? FIND THE INDEX OF EXISTING FILTER BASED ON KEY OR CHILD TABLE
            const index = prevFilters.findIndex(
                (filter: any) => filter[0] === (child_table || key)
            );

            const updatedFilters = [...prevFilters];
            const fieldIndex = child_table ? 3 : 2; // ? DETERMINE FIELD BASED ON CHILD TABLE

            if (index !== -1) {
                const values = updatedFilters[index][fieldIndex] || [];

                // ? REMOVE VALUE IF IT EXISTS
                if (values.includes(value)) {
                    updatedFilters[index][fieldIndex] = values.filter(
                        (item: string) => item !== value
                    );

                    // ? REMOVE FILTER COMPLETELY IF EMPTY
                    if (updatedFilters[index][fieldIndex].length === 0) {
                        updatedFilters.splice(index, 1);
                    }
                } else {
                    // ? ADD VALUE IF NOT EXISTS
                    updatedFilters[index][fieldIndex] = [...values, value];
                }
            } else {
                // ? ADD NEW FILTER IF NOT EXISTS
                updatedFilters.push(
                    child_table
                        ? [child_table, key, "in", [value]]
                        : [key, "in", [value]]
                );
            }

            return updatedFilters;
        });
    };

    // ? HANDLE CLEAR FILTERS
    const handleClearFilters = () => setFilters([]);
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
                        <div className="toolbar flex justify-between items-center">

                            {/* TOOLBAR SECTION 1 */}
                            <div className="toolbar-section-1 flex gap-5 justify-start items-center">

                                {/* FILTER */}
                                <div className="filter">
                                    <Filters
                                        filters={filters}
                                        useStatusFilterData={useStatusFilterData}
                                        getAllCategories={[{ name: "Test", category: "Test" }]}
                                        handleFilters={handleFilters}
                                        handleClearFilters={handleClearFilters}
                                        setRefreshState={setRefreshState}
                                        defaultFilter={[]}
                                    />
                                </div>

                                {/* SORT */}
                                <div className="sort">
                                    <Sort
                                        currentSort={currentSort}
                                        currentSortDirection={currentSortDirection}
                                        useSortData={useSortData}
                                        setCurrentSort={setCurrentSort}
                                        setCurrentSortDirection={setCurrentSortDirection}
                                        setRefreshState={setRefreshState}
                                    />
                                </div>
                            </div>

                            {/* TOOLBAR SECTION 2 */}
                            <div className="toolbar-section-2 flex gap-5 justify-start items-center">

                                {/* SEARCHBAR */}
                                <div className="search-bar">
                                    <SearchBar
                                        placeholder="Search Links..."
                                        onChange={(value) => console.log("Search value:", value)}
                                        onSubmit={(value) => console.log("Form submitted with:", value)}
                                    />
                                </div>

                                {/* CREATE LINK */}
                                <div className="create-link">
                                    <Button
                                        variant={"default"}>
                                        Create Link
                                    </Button>
                                </div>

                            </div>

                        </div>

                        <div className="main-content my-5">
                            <LinkCard />
                        </div>

                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

export default ShortLink