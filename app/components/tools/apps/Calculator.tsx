'use client'

import { useState } from "react"
import { Calculator as CalculatorIcon } from "lucide-react"
import Button from "../../Button"
import ToolPanel from "../components/ToolPanel"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [operation, setOperation] = useState<string | null>(null)
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const handleOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleClear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.")
      setWaitingForNewValue(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  return (
    <ToolPanel title="Calculator" description="Simple calculator for basic math operations" icon={CalculatorIcon}>
      <div className="max-w-sm mx-auto">
        {/* Display */}
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-sm border border-gray-300 dark:border-gray-700">
          <div className="text-right text-2xl font-mono overflow-hidden">
            {display}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={handleClear} variant="secondary" className="col-span-2">
            Clear
          </Button>
          <Button onClick={() => handleOperation("÷")} variant="secondary">
            ÷
          </Button>
          <Button onClick={() => handleOperation("×")} variant="secondary">
            ×
          </Button>

          <Button onClick={() => handleNumber("7")} variant="primary">7</Button>
          <Button onClick={() => handleNumber("8")} variant="primary">8</Button>
          <Button onClick={() => handleNumber("9")} variant="primary">9</Button>
          <Button onClick={() => handleOperation("-")} variant="secondary">
            -
          </Button>

          <Button onClick={() => handleNumber("4")} variant="primary">4</Button>
          <Button onClick={() => handleNumber("5")} variant="primary">5</Button>
          <Button onClick={() => handleNumber("6")} variant="primary">6</Button>
          <Button onClick={() => handleOperation("+")} variant="secondary">
            +
          </Button>

          <Button onClick={() => handleNumber("1")} variant="primary">1</Button>
          <Button onClick={() => handleNumber("2")} variant="primary">2</Button>
          <Button onClick={() => handleNumber("3")} variant="primary">3</Button>
          <Button onClick={handleEquals} variant="secondary" className="row-span-2">
            =
          </Button>

          <Button onClick={() => handleNumber("0")} variant="primary" className="col-span-2">
            0
          </Button>
          <Button onClick={handleDecimal} variant="primary">
            .
          </Button>
        </div>
      </div>
    </ToolPanel>
  )
}