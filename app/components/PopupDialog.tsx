'use client'

import { useState, useEffect, useCallback, ReactNode } from 'react'
import { X, Copy, Check } from 'lucide-react'
import type { PopupConfig } from '@/app/config/popup'

interface PopupDialogProps {
    config: PopupConfig
    /** Override open state — use with trigger: "manual" */
    open?: boolean
    /** Required when trigger is "manual" */
    onClose?: () => void
    /** Slot for richer content instead of config.content plain text */
    children?: ReactNode
}

export default function PopupDialog({ config, open: controlledOpen, onClose: controlledOnClose, children }: PopupDialogProps) {
    const {
        enabled,
        trigger,
        triggerDelayMs = 0,
        storageKey,
        title,
        content,
        primaryButton,
        secondaryButton,
        tertiaryButton,
    } = config

    const [internalOpen, setInternalOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const isOpen = trigger === 'manual' ? (controlledOpen ?? false) : internalOpen

    const close = useCallback(() => {
        if (trigger === 'manual') {
            controlledOnClose?.()
        } else {
            setInternalOpen(false)
            if (storageKey) localStorage.setItem(storageKey, '1')
        }
    }, [trigger, controlledOnClose, storageKey])

    // Auto-open on load
    useEffect(() => {
        if (!enabled || trigger !== 'onLoad') return
        if (storageKey && localStorage.getItem(storageKey)) return

        const timer = setTimeout(() => setInternalOpen(true), triggerDelayMs)
        return () => clearTimeout(timer)
    }, [enabled, trigger, triggerDelayMs, storageKey])

    // Escape key
    useEffect(() => {
        if (!isOpen) return
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') close()
        }
        document.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [isOpen, close])

    async function copyCode() {
        if (!tertiaryButton) return
        await navigator.clipboard.writeText(tertiaryButton.codeToCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (!enabled || !isOpen) return null

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                aria-hidden
                onClick={close}
            />

            {/* Panel */}
            <div className="relative z-10 w-full max-w-md rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl">

                {/* Header */}
                <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
                    <h2
                        id="popup-title"
                        className="text-lg font-semibold text-gray-900 dark:text-gray-50 leading-snug"
                    >
                        {title}
                    </h2>
                    <button
                        onClick={close}
                        aria-label="Close dialog"
                        className="mt-0.5 shrink-0 rounded p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 pb-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {children ?? <p>{content}</p>}
                </div>

                {/* Tertiary — Copy Code button */}
                {tertiaryButton && (
                    <div className="px-6 pt-4 pb-2">
                        <div className="flex items-center gap-3 rounded-md border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-3">
                            <code className="flex-1 font-mono text-sm text-gray-800 dark:text-gray-200 tracking-wide select-all">
                                {tertiaryButton.codeToCopy}
                            </code>
                            <button
                                onClick={copyCode}
                                aria-label={tertiaryButton.label}
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors cursor-pointer shrink-0"
                            >
                                {copied
                                    ? <><Check size={13} />{tertiaryButton.copiedLabel ?? 'Copied!'}</>
                                    : <><Copy size={13} />{tertiaryButton.label}</>
                                }
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer — Primary + Secondary */}
                {(primaryButton || secondaryButton) && (
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2 px-6 py-5">
                        {/* Secondary — Ghost button */}
                        {secondaryButton && (
                            secondaryButton.href ? (
                                <a
                                    href={secondaryButton.href}
                                    target={secondaryButton.newTab ? '_blank' : undefined}
                                    rel={secondaryButton.newTab ? 'noopener noreferrer' : undefined}
                                    className="w-full sm:w-auto text-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    {secondaryButton.label}
                                </a>
                            ) : (
                                <button
                                    onClick={close}
                                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                                >
                                    {secondaryButton.label}
                                </button>
                            )
                        )}

                        {/* Primary — CTA button */}
                        {primaryButton && (
                            <a
                                href={primaryButton.href}
                                target={primaryButton.newTab ? '_blank' : undefined}
                                rel={primaryButton.newTab ? 'noopener noreferrer' : undefined}
                                className="w-full sm:w-auto text-center px-4 py-2 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                                {primaryButton.label}
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
