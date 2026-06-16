// ─────────────────────────────────────────────────────────────────────────────
// Announcement Bar Configuration
//
// EDIT THIS FILE to control announcement bars across the site.
//
// Two variants:
//   "global"   — shown on every site page (wired into ClientLayout)
//   "specific" — used per-page by importing the config you need and passing it
//                as a prop to <AnnouncementBar config={...} />
// ─────────────────────────────────────────────────────────────────────────────

export type AnnouncementVariant = "global" | "specific"

export interface AnnouncementConfig {
    /** Toggle the bar on/off without removing the config. */
    enabled: boolean
    variant: AnnouncementVariant
    /** Main announcement message. */
    message: string
    /** Optional inline link label — shown after the message. */
    linkLabel?: string
    /** Href for the inline link. */
    linkHref?: string
    /** Whether the user can dismiss the bar. Dismissed state is stored in localStorage. */
    dismissible: boolean
    /**
     * localStorage key used to remember dismissals.
     * Change this whenever you want to reset dismissal state for everyone (e.g. a new campaign).
     */
    storageKey?: string
    /** Visual style of the bar. */
    theme?: "neutral" | "info" | "warning" | "success" | "promo"
}

// ─────────────────────────────────────────────────────────────────────────────
// ✏️  GLOBAL ANNOUNCEMENT
//     Shown site-wide via ClientLayout. Set `enabled: true` to activate.
// ─────────────────────────────────────────────────────────────────────────────
export const globalAnnouncement: AnnouncementConfig = {
    enabled: false,
    variant: "global",
    message: "🎉 Something exciting is launching soon —",
    linkLabel: "Stay tuned",
    linkHref: "/",
    dismissible: true,
    storageKey: "announcement-global-v1",
    theme: "promo",
}

// ─────────────────────────────────────────────────────────────────────────────
// ✏️  EBOOKS ANNOUNCEMENT
//     Import and use this in ebook pages with <AnnouncementBar config={ebooksAnnouncement} />
// ─────────────────────────────────────────────────────────────────────────────
export const ebooksAnnouncement: AnnouncementConfig = {
    enabled: false,
    variant: "specific",
    message: "📖 Our LemonSqueezy store is currently under review —",
    linkLabel: "Check back soon",
    linkHref: "/ebooks",
    dismissible: true,
    storageKey: "announcement-ebooks-v1",
    theme: "info",
}

// ─────────────────────────────────────────────────────────────────────────────
// Add more specific announcements here as needed, e.g.:
//
// export const articlesAnnouncement: AnnouncementConfig = { ... }
// ─────────────────────────────────────────────────────────────────────────────
