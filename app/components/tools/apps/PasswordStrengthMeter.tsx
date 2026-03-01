'use client'

import { useState } from "react"
import { Key } from "lucide-react"
import ToolPanel from "../components/ToolPanel"
import Input from "../../Input"
import Label from "../../Label"

const TOTAL_SCORE = 8

function PasswordStrengthMeter() {
  const [meterLength, setMeterLength] = useState(0)
  const [meterColour, setMeterColour] = useState("bg-red-500")
  const [password, setPassword] = useState("")

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)

    // Simple strength logic (replace with full evaluator later)
    let score = 0
    if (value.length >= 12) score += 2
    if (/[a-z]/.test(value)) score++
    if (/[A-Z]/.test(value)) score++
    if (/\d/.test(value)) score++
    if (/[^a-zA-Z0-9]/.test(value)) score++
    if (!/\s/.test(value)) score++
    if (!/^([a-zA-Z0-9!@#$%^&*()_+=-])\1+$/.test(value)) score++

    const lengthPercentage = Math.min((score / TOTAL_SCORE) * 100, 100)
    setMeterLength(lengthPercentage)

    if (score <= 2) setMeterColour("bg-red-500")
    else if (score <= 4) setMeterColour("bg-yellow-500")
    else if (score <= 6) setMeterColour("bg-blue-500")
    else setMeterColour("bg-green-500")
  }

  return (
    <ToolPanel title="Password Strength Meter" description="Check the strength of your password" icon={Key}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-lg">
            Please enter your password:
          </Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password to check its strength"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Password Strength:</span>
            <span className="text-sm opacity-75">
              {meterLength === 0 ? 'No password' : 
               meterLength <= 25 ? 'Weak' :
               meterLength <= 50 ? 'Fair' :
               meterLength <= 75 ? 'Good' : 'Strong'}
            </span>
          </div>
          <div className="h-2 w-full bg-gray-300 dark:bg-gray-700 rounded overflow-hidden">
            <div
              className={`h-full ${meterColour} transition-all duration-300`}
              style={{ width: `${meterLength}%` }}
            ></div>
          </div>
        </div>
      </div>
    </ToolPanel>
  )
}

export default PasswordStrengthMeter
