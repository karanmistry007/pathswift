"use client"

import type React from "react"
import { useState } from "react"
import { MdContentCopy } from "react-icons/md"
import { GoLink } from "react-icons/go"
import { PiCursorClickLight } from "react-icons/pi"
import { FiMoreVertical } from "react-icons/fi"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import LinkDialog from "./link-dialog"
import { copyToClipboard } from "@/utils/utils"

// INTERFACE FOR LINK CARD PROPERTIES
interface LinkCardProps {
    shortLink: string
    destinationUrl: string
    status: "active" | "inactive" | "expired"
    clicks: number
    linkData?: any // KEEPING THIS AS ANY SINCE WE DON'T KNOW THE STRUCTURE NEEDED FOR LINKDIALOG
}

const LinkCard = ({ shortLink, destinationUrl, status, clicks, linkData = null }: LinkCardProps) => {
    // STATE TO CONTROL THE DIALOG VISIBILITY
    const [openDialog, setOpenDialog] = useState(false)

    // FUNCTION TO TOGGLE DIALOG VISIBILITY
    const handleDialogDisplay = (data: boolean) => {
        setOpenDialog(data)
    }

    // FUNCTION TO COPY SHORT LINK TO CLIPBOARD
    const handleCopyToClipboard = (e: React.MouseEvent) => {
        e.stopPropagation()
        copyToClipboard(shortLink, "Short link")
    }

    // FUNCTION TO HANDLE CLICKS BUTTON CLICK EVENT
    const handleClicksButton = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    // FUNCTION TO HANDLE MORE OPTIONS BUTTON CLICK EVENT
    const handleMoreButton = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    // FUNCTION TO HANDLE DESTINATION LINK CLICK EVENT
    const handleDestinationClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <>
            {/* LINK CARD COMPONENT */}
            <Card
                className="link-card cursor-pointer p-0 transition-all duration-300 ease-in-out hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]"
                onClick={() => {
                    handleDialogDisplay(true)
                }}
            >
                <CardContent className="flex items-center gap-4 p-4">
                    {/* ICON SECTION */}
                    <div className="card-icon">
                        <GoLink className="h-10 w-10 rounded-full bg-gray-100 p-2.5" />
                    </div>

                    {/* LINK DETAILS SECTION */}
                    <div className="card-details grow max-w-[60%] lg:max-w-[70%] mr-auto">
                        <div className="source-link flex items-center justify-start gap-1">
                            <h5 className="text-base font-medium">{shortLink}</h5>
                            <Button variant="link" className="h-auto p-1 hover:bg-[#f3f3f3]" onClick={handleCopyToClipboard}>
                                <MdContentCopy />
                            </Button>
                        </div>

                        <div className="destination-link overflow-hidden text-ellipsis whitespace-nowrap">
                            <a
                                href={destinationUrl}
                                className="destination-link text-sm hover:underline"
                                target="_blank"
                                onClick={handleDestinationClick}
                                rel="noreferrer"
                            >
                                {destinationUrl}
                            </a>
                        </div>
                    </div>

                    {/* BUTTONS SECTION */}
                    <div className="card-buttons flex items-center justify-center gap-4">
                        <Badge className="link-status hidden md:block" variant={status === "active" ? "default" : "secondary"}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>

                        <Button className="link-clicks hidden gap-1 md:flex" variant="outline" onClick={handleClicksButton}>
                            <PiCursorClickLight />
                            <span>{clicks} Clicks</span>
                        </Button>

                        <Button className="show-more p-2 hover:bg-[#f3f3f3]" variant="link" onClick={handleMoreButton}>
                            <FiMoreVertical />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* LINK DIALOG COMPONENT */}
            <LinkDialog
                buttonVariant="default"
                linkData={linkData}
                defaultOpen={openDialog}
                handleClose={handleDialogDisplay}
            />
        </>
    )
}

export default LinkCard
