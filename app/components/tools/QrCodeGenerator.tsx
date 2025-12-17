'use client'

import { useState } from "react"
import { QrCode } from "lucide-react"
import { QRCode } from "react-qrcode-logo"
import ToolPanel from "./ToolPanel"
import Input from "../Input"
import Group from "../Group"
import Label from "../Label"

export default function QrCodeGenerator() {
  const [text, setText] = useState("https://example.com")
  const [size, setSize] = useState(200)
  const [fgColor, setFgColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")

  return (
    <ToolPanel title="QR Code Generator" description="Create custom QR codes for URLs or text" icon={QrCode} className="max-w-lg mx-auto">
      <Group variant="vertical" className="gap-4">
        <Group variant="vertical">
          <Label>Text / URL:</Label>
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL to encode"
          />
        </Group>

        <Group variant="vertical">
          <Label>Size (px):</Label>
          <Input
            type="number"
            min={50}
            max={1000}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </Group>

        <Group variant="vertical">
          <Label>Foreground Color:</Label>
          <Input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
          />
        </Group>

        <Group variant="vertical">
          <Label>Background Color:</Label>
          <Input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </Group>
      </Group>

      <div className="flex justify-center p-4 rounded-sm bg-gray-50 dark:bg-gray-950 ">
        <QRCode
          value={text}
          size={size}
          fgColor={fgColor}
          bgColor={bgColor}
          quietZone={10}
        />
      </div>
    </ToolPanel>
  )
}
