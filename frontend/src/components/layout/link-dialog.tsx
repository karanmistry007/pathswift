"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Info, Copy, Link } from "lucide-react"
import * as z from "zod"
import { toast } from "sonner"
import { PiDownloadSimpleFill } from "react-icons/pi";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ReactElement, useEffect, useState } from "react"
import { copyToClipboard } from '@/utils/utils'
import { IconContext } from "react-icons/lib"

// Schema definition
const linkFormSchema = z.object({
    destination: z.string().url({ message: "Please enter a valid URL" }),
    shortLink: z.string().min(1, "Short link is required"),
    tags: z.array(z.string()).default([]),
    comments: z.string().optional(),
})

type LinkFormValues = z.infer<typeof linkFormSchema>

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

// Link Form Component
function LinkForm({
    defaultValues,
    onSubmit,
    onClose,
}: {
    defaultValues: Partial<LinkFormValues>
    onSubmit: (data: LinkFormValues) => void
    onClose: () => void
}) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<LinkFormValues>({
        resolver: zodResolver(linkFormSchema),
        defaultValues,
    })

    async function handleSubmit(data: LinkFormValues) {
        try {
            setIsSubmitting(true)
            console.log("Form Data:", data) // Console log the form data
            await onSubmit(data)
            toast.success("Your link has been updated.")
            onClose()
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-[1.5fr,1fr] gap-6">
                    <div className="space-y-2.5">

                        {/* Destination URL */}
                        <FormField
                            control={form.control}
                            name="destination"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FormLabel>Destination URL</FormLabel>
                                            {/* <Info className="w-3.5 h-3.5 text-muted-foreground" /> */}
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            tabIndex={-1}
                                            onClick={() => copyToClipboard(field.value, "Destination Link")}
                                        >
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <FormControl>
                                        <Input placeholder="https://example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Short Link */}
                        <FormField
                            control={form.control}
                            name="shortLink"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FormLabel>Short Link</FormLabel>
                                            {/* <Info className="w-3.5 h-3.5 text-muted-foreground" /> */}
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            tabIndex={-1}
                                            onClick={() => copyToClipboard(`dub.sh/${field.value}`, "Short Link")}
                                        >
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Tags */}
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="block">
                                        <FormLabel>Tags</FormLabel>
                                        {/* <Info className="w-3.5 h-3.5 text-muted-foreground" /> */}
                                    </div>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter tags..."
                                            value={field.value?.join(", ") || ""}
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value
                                                        .split(",")
                                                        .map((tag) => tag.trim())
                                                        .filter(Boolean),
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription>Separate tags with commas</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Comments */}
                        <FormField
                            control={form.control}
                            name="comments"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <div className="block">
                                        <FormLabel>Comments</FormLabel>
                                        {/* <Info className="w-3.5 h-3.5 text-muted-foreground" /> */}
                                    </div>
                                    <FormControl>
                                        <Textarea placeholder="Add comments..." className="resize-none h-24" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4 md:bg-muted/50 md:p-4 md:rounded-lg sm:bg-[#f3f4f6]">
                        <FormItem>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <FormLabel>QR Code</FormLabel>
                                    {/* <Info className="w-3.5 h-3.5 text-muted-foreground" /> */}
                                </div>
                                <div className="buttons flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => copyToClipboard(form.getValues("destination"), "Download")}
                                    >
                                        <PiDownloadSimpleFill className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        tabIndex={-1}
                                        onClick={() => copyToClipboard(form.getValues("destination"), "QR code URL")}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-2 bg-white rounded-lg p-4 flex justify-center items-center">
                                <img
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-g28EXruxcqr5KC6KImUMDJqqu4uwhU.png"
                                    alt="QR Code"
                                    className="w-full aspect-square h-full max-h-[150px] max-w-[150px]"
                                />
                            </div>
                        </FormItem>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-4 border-t">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save changes"}
                    </Button>
                </div>
            </form>
        </Form >
    )
}

type Props = {
    linkData: any;
    defaultOpen?: boolean;
    buttonTitle?: string;
    buttonIcon?: ReactElement;
    buttonVariant?: "default" | "outline" | "secondary";
    handleClose: (data: boolean) => void;
}

// Main Dialog Component
export const LinkDialog = (props: Props) => {
    const [open, setOpen] = useState(props.defaultOpen ? props.defaultOpen : false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const defaultValues: LinkFormValues = {
        destination: "",
        shortLink: "",
        tags: [],
        comments: "",
    }

    const handleSubmit = async (data: LinkFormValues) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("Submitted data:", data)
    }

    const content = <LinkForm defaultValues={defaultValues} onSubmit={handleSubmit} onClose={() => setOpen(false)} />


    useEffect(() => {
        setOpen(props.defaultOpen ? props.defaultOpen : false);
    }, [props.defaultOpen])


    if (isDesktop) {
        return (
            <>
                <Dialog open={open} onOpenChange={(open: boolean) => { setOpen(open); props.handleClose(open) }} >
                    <DialogTrigger asChild className={`${!props.buttonTitle && "hidden"}`}>
                        <Button variant={`${props.buttonVariant ? props.buttonVariant : "outline"}`}>{props?.buttonIcon} {props.buttonTitle}</Button>
                    </DialogTrigger>
                    <DialogContent className="xl:max-w-[1000px] overflow-y-auto max-h-[85vh]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-base font-medium">
                                <div className="p-2 bg-gray-100 rounded-full">
                                    <Link className="w-5 h-5" />
                                </div>
                                {props.linkData?.name ? `Edit ${props.linkData.name}` : "Create Link"}
                            </DialogTitle>
                        </DialogHeader>
                        {content}
                    </DialogContent>
                </Dialog>
            </>
        )
    }

    return (
        <>
            <Drawer open={open} onOpenChange={setOpen} onClose={() => { props.handleClose(false) }}>
                <DrawerTrigger asChild className={`${!props.buttonTitle && "hidden"}`}>
                    <Button variant={`${props.buttonVariant ? props.buttonVariant : "outline"}`}>{props?.buttonIcon}</Button>
                </DrawerTrigger>
                <DrawerContent className="h-auto sm:h-[85vh] p-6">
                    <DrawerHeader className="px-0">
                        <DrawerTitle className="flex items-center gap-2 text-lg font-semibold">
                            <div className="p-2 bg-gray-100 rounded-full">
                                <Link className="w-5 h-5" />
                            </div>
                            {props.linkData?.name ? `Edit ${props.linkData.name}` : "Create Link"}
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="overflow-y-auto pr-6">{content}</div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default LinkDialog

