'use client'

import { Sun, Moon, Monitor } from 'lucide-react'
import { useState, useEffect } from 'react'

type ThemeMode = 'light' | 'dark' | 'system'

export default function ThemeSwitcherButton() {
    const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        // Initialize theme from localStorage
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as ThemeMode
            if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
                return savedTheme
            }
        }
        return 'system'
    })

    useEffect(() => {
        // Apply theme when mode changes
        const root = document.documentElement
        
        if (themeMode === 'system') {
            // Remove explicit class, let system preference take over
            root.classList.remove('dark')
            localStorage.removeItem('theme')
        } else if (themeMode === 'dark') {
            // Apply dark theme
            root.classList.add('dark')
            localStorage.setItem('theme', themeMode)
        } else {
            // Apply light theme (remove dark class)
            root.classList.remove('dark')
            localStorage.setItem('theme', themeMode)
        }
    }, [themeMode])

    const cycleTheme = () => {
        setThemeMode(current => {
            switch (current) {
                case 'light':
                    return 'dark'
                case 'dark':
                    return 'system'
                case 'system':
                    return 'light'
                default:
                    return 'light'
            }
        })
    }

    const getThemeIcon = () => {
        switch (themeMode) {
            case 'light':
                return <Sun size={16} />
            case 'dark':
                return <Moon size={16} />
            case 'system':
                return <Monitor size={16} />
            default:
                return <Monitor size={16} />
        }
    }

    const getThemeTitle = () => {
        switch (themeMode) {
            case 'light':
                return 'Switch to dark mode'
            case 'dark':
                return 'Switch to system mode'
            case 'system':
                return 'Switch to light mode'
            default:
                return 'Switch theme'
        }
    }

    return (
        <button 
            type="button"
            onClick={cycleTheme}
            className="hover:opacity-70 transition-opacity"
            title={getThemeTitle()}
        >
            {getThemeIcon()}
        </button>
    )
}