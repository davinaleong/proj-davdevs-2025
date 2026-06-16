// ─────────────────────────────────────────────────────────────────────────────
// Popup Dialog Configuration
//
// EDIT THIS FILE to control the popup dialog across the site.
//
// Trigger modes:
//   "onLoad"  — auto-opens after `triggerDelayMs` milliseconds on page load
//   "manual"  — controlled externally (pass `open` / `onClose` props)
// ─────────────────────────────────────────────────────────────────────────────

export type PopupTrigger = "onLoad" | "manual"

export interface PopupPrimaryButton {
    label: string
    /** Full URL or internal path. */
    href: string
    /** Open in new tab. Defaults to false. */
    newTab?: boolean
}

export interface PopupSecondaryButton {
    label: string
    /** If omitted, acts as a plain close/dismiss button. */
    href?: string
    newTab?: boolean
}

export interface PopupTertiaryButton {
    label: string
    /** The string that will be copied to clipboard when clicked. */
    codeToCopy: string
    /** Label shown briefly after a successful copy. Defaults to "Copied!" */
    copiedLabel?: string
}

export interface PopupConfig {
    /** Toggle the popup on/off without removing the config. */
    enabled: boolean
    trigger: PopupTrigger
    /** Delay in ms before auto-open (only used when trigger is "onLoad"). */
    triggerDelayMs?: number
    /**
     * localStorage key used to suppress the popup after dismissal.
     * Change this key whenever you want to show the popup again to everyone (e.g. new campaign).
     * Set to undefined to always show on load.
     */
    storageKey?: string

    // ── Content ────────────────────────────────────────────────────────────
    title: string
    /** Supports plain text. For richer content, use the `children` prop on the component. */
    content: string

    // ── Buttons (all optional — omit any you don't need) ───────────────────
    primaryButton?: PopupPrimaryButton
    secondaryButton?: PopupSecondaryButton
    tertiaryButton?: PopupTertiaryButton
}

// ─────────────────────────────────────────────────────────────────────────────
// ✏️  SITE-WIDE POPUP
//     Set `enabled: true` to activate. Shown once per storageKey session.
// ─────────────────────────────────────────────────────────────────────────────
export const sitePopup: PopupConfig = {
    enabled: false,
    trigger: "onLoad",
    triggerDelayMs: 2000,
    storageKey: "popup-site-v1",

    title: "Something new is here 🎉",
    content:
        "We've just launched something we're really excited about. Take a look and let us know what you think!",

    primaryButton: {
        label: "Show me",
        href: "/",
    },
    secondaryButton: {
        label: "Maybe later",
    },
}

// ─────────────────────────────────────────────────────────────────────────────
// ✏️  EBOOKS STORE POPUP
//     Example with a promo code — shows a tertiary "Copy Code" button.
// ─────────────────────────────────────────────────────────────────────────────
export const ebooksStorePopup: PopupConfig = {
    enabled: false,
    trigger: "onLoad",
    triggerDelayMs: 3000,
    storageKey: "popup-ebooks-store-v1",

    title: "Store Opening Soon",
    content:
        "Our LemonSqueezy store is currently under review. Save the promo code below — it'll be ready for you the moment we go live.",

    tertiaryButton: {
        label: "Copy promo code",
        codeToCopy: "LAUNCH10",
        copiedLabel: "Copied!",
    },
    secondaryButton: {
        label: "Got it",
    },
}

// ─────────────────────────────────────────────────────────────────────────────
// Add more popups here as needed, e.g.:
//
// export const newsletterPopup: PopupConfig = { ... }
// ─────────────────────────────────────────────────────────────────────────────
