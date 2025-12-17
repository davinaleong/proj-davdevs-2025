'use client'

import React, { useState } from "react"
import Swatch from "./Swatch"
import Tab from "../Tab"
import TabFlex from "../TabFlex"
import DropdownMenu from "../DropdownMenu"
import ToolPanel from "./ToolPanel"
import { Palette } from "lucide-react"

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
    <ToolPanel
      title="Color Palettes"
      description="Explore curated color palettes with multiple format options"
      icon={Palette}
    >
      <div className="flex gap-4">
        <TabFlex>
          {uniqueTabs.map((tab, index) => (
            <Tab
              key={index}
              isActive={activeTab === index}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </Tab>
          ))}
        </TabFlex>
        
        <DropdownMenu
          value={selectedFormat}
          onChange={(value) => setSelectedFormat(value as ColorFormat)}
          options={Object.entries(colorFormatLabels).map(([format, label]) => ({
            label: `Format: ${label}`,
            value: format
          }))}
          placeholder="Format: HEX"
          className="min-w-[140px]"
        />
      </div>

      {groups
        .filter((group) => group.groupTitle.startsWith(uniqueTabs[activeTab]))
        .map((group, index) => (
          <section
            key={index}
          >
            <h2 className="text-2xl font-bold mb-4">{group.groupTitle}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {group.colors.map((color, colorIndex) => (
                <Swatch key={colorIndex} {...color} selectedFormat={selectedFormat} />
              ))}
            </div>
          </section>
        ))}
    </ToolPanel>
  )
}
