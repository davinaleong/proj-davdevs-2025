'use client'

import React, { useState } from "react"
import { ChevronDown } from "lucide-react"
import Swatch from "./Swatch"

export interface ColorItem {
  title: string
  hex: string
  rgb: string
  hsl: string
  oklch: string
  lab: string
  lch: string
  textColor: string
}

type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'oklch' | 'lab' | 'lch'

export interface ColorGroup {
  groupTitle: string
  colors: ColorItem[]
}

interface ColorPalettesProps {
  groups: ColorGroup[]
}

const colorFormatLabels: Record<ColorFormat, string> = {
  hex: 'HEX',
  rgb: 'RGB', 
  hsl: 'HSL',
  oklch: 'OKLCH',
  lab: 'LAB',
  lch: 'LCH'
}

export default function ColorPalettes({ groups }: ColorPalettesProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedFormat, setSelectedFormat] = useState<ColorFormat>('hex')
  const [isFormatDropdownOpen, setIsFormatDropdownOpen] = useState(false)

  // Handle empty groups case
  if (!groups || groups.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No color palettes available.
      </div>
    )
  }

  const uniqueTabs = Array.from(
    new Set(groups.map((group) => group.groupTitle.split(" – ")[0]))
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4 pb-4">
        <div className="flex flex-wrap gap-2">
          {uniqueTabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor:pointer ${
                activeTab === index
                  ? "bg-blue-500 text-white"
                  : "border bg-gray-50 border-gray-300 dark:bg-gray-950 dark:border-gray-700 hover:opacity-60"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <button
            onClick={() => setIsFormatDropdownOpen(!isFormatDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1 border bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded-md text-sm font-medium hover:opacity-60"
          >
            Format: {colorFormatLabels[selectedFormat]}
            <ChevronDown className="w-4 h-4" />
          </button>
          
          {isFormatDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10 min-w-[120px]">
              {Object.entries(colorFormatLabels).map(([format, label]) => (
                <button
                  key={format}
                  onClick={() => {
                    setSelectedFormat(format as ColorFormat)
                    setIsFormatDropdownOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 first:rounded-t-md last:rounded-b-md ${
                    selectedFormat === format ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {groups
        .filter((group) => group.groupTitle.startsWith(uniqueTabs[activeTab]))
        .map((group, index) => (
          <section
            key={index}
            className="p-4 border bg-gray-50 border-gray-300 dark:bg-gray-950 dark:border-gray-700 rounded-sm"
          >
            <h2 className="text-2xl font-bold mb-4">{group.groupTitle}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {group.colors.map((color, colorIndex) => (
                <Swatch key={colorIndex} {...color} selectedFormat={selectedFormat} />
              ))}
            </div>
          </section>
        ))}
    </div>
  )
}
