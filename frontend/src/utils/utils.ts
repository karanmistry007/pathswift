import { toast } from "sonner"

export const copyToClipboard = async (text: string, type: string) => {
    try {
        await navigator.clipboard.writeText(text)
        toast.success(`${type} copied to clipboard.`, {
            duration: 2000,
        })
    } catch (err) {
        toast.error("Failed to copy. Please try again.", {
            action: {
                label: "Try again",
                onClick: () => copyToClipboard(text, type),
            },
        })
    }
}

