export interface Iconprops{
    size : "sm" | "md" | "lg";
    onClick ?: () => void
}

export const iconSizevariants = {
    "sm" : "size-2",
    "md" : "size-4",
    "lg" : "size-6",
}