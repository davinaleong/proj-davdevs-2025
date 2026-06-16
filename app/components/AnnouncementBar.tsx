'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { AnnouncementConfig } from '@/app/config/announcement'

interface AnnouncementBarProps {
    config: AnnouncementConfig
}

const themeClasses: Record<NonNullable<AnnouncementConfig['theme']>, string> = {
    neutral: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700',
    info:    'bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-b border-blue-200 dark:border-blue-800',
    warning: 'bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-b border-amber-200 dark:border-amber-800',
    success: 'bg-green-50 dark:bg-green-950 text-green-800 dark:text-green-200 border-b border-green-200 dark:border-green-800',
    promo:   'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-b border-violet-700',
}

const linkClasses: Record<NonNullable<AnnouncementConfig['theme']>, string> = {
    neutral: 'underline hover:no-underline font-semibold',
    info:    'underline hover:no-underline font-semibold',
    warning: 'underline hover:no-underline font-semibold',
    success: 'underline hover:no-underline font-semibold',
    promo:   'underline hover:no-underline font-semibold text-white',
}

export default function AnnouncementBar({ config }: AnnouncementBarProps) {
    const { enabled, message, linkLabel, linkHref, dismissible, storageKey, theme = 'neutral' } = config

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!enabled) return
        if (dismissible && storageKey) {
            const dismissed = localStorage.getItem(storageKey)
            if (dismissed) return
        }
        setVisible(true)
    }, [enabled, dismissible, storageKey])

    function dismiss() {
        setVisible(false)
        if (dismissible && storageKey) {
            localStorage.setItem(storageKey, '1')
        }
    }

    if (!enabled || !visible) return null

    return (
        <div
            role="banner"
            aria-label="Announcement"
            className={`relative w-full px-4 py-2.5 text-sm text-center ${themeClasses[theme]}`}
        >
            <span>
                {message}
                {linkLabel && linkHref && (
                    <>
                        {' '}
                        <a href={linkHref} className={linkClasses[theme]}>
                            {linkLabel}
                        </a>
                    </>
                )}
            </span>

            {dismissible && (
                <button
                    onClick={dismiss}
                    aria-label="Dismiss announcement"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                >
                    <X size={14} />
                </button>
            )}
        </div>
    )
}
