'use client'

import { useState } from "react"
import {
  Calculator as CalculatorIcon,
  Percent,
  Plus,
  Minus,
  X,
  Divide,
  Equal,
  SquareChevronLeft,
  Diff,
  Copy,
} from "lucide-react"
import Button from "../Button"
import ToolPanel from "./ToolPanel"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(`${parseFloat(newValue.toFixed(7))}`)
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperator)
  }

  const calculate = (
    firstValue: number,
    secondValue: number,
    operation: string
  ) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      case "%":
        return firstValue % secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(`${parseFloat(newValue.toFixed(7))}`)
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay("0")
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const toggleSign = () => {
    if (display !== "0") {
      setDisplay(display.charAt(0) === "-" ? display.slice(1) : "-" + display)
    }
  }

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(display)
    } catch (err) {
      console.error('Failed to copy result:', err)
    }
  }

  return (
    <ToolPanel title="Calculator" description="Perform basic calculations" icon={CalculatorIcon} className="max-w-md mx-auto">
      <section className="grid grid-cols-4 grid-rows-7 gap-2" role="application" aria-label="Calculator interface">
        <div className="col-span-4 row-span-2 relative">
          <div className="font-semibold text-2xl text-right grid place-items-end p-2 bg-gray-100 dark:bg-gray-900 rounded-sm overflow-hidden h-full" role="textbox" aria-label="Calculator display" aria-live="polite">
            {display}
          </div>
          <Button
            onClick={copyResult}
            variant="secondary"
            className="absolute top-2 left-2 p-1 text-xs"
            aria-label="Copy result to clipboard"
          >
            <Copy className="w-3 h-3" />
          </Button>
        </div>
        <Button
          onClick={backspace}
          variant="calc-function"
          className="p-3 justify-center"
          aria-label="Backspace"
        >
          <SquareChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          onClick={clear}
          variant="calc-function"
          className="p-3 justify-center"
          aria-label="All Clear"
        >
          <span className="font-semibold">AC</span>
        </Button>
        <Button
          onClick={() => inputOperator("%")}
          variant="calc-function"
          className="p-3 justify-center"
          aria-label="Percent"
        >
          <Percent className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => inputOperator("÷")}
          variant="calc-operation"
          className="p-3 justify-center"
          aria-label="Divide"
        >
          <Divide className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => inputNumber("7")}
          variant="calc-number"
          className="p-3 justify-center"
        >
          <span>7</span>
        </Button>
        <Button
          onClick={() => inputNumber("8")}
          variant="calc-number"
          className="p-3 justify-center"
        >
          <span>8</span>
        </Button>
        <Button
          onClick={() => inputNumber("9")}
          variant="calc-number"
          className="p-3 justify-center"
        >
          <span>9</span>
        </Button>
        <Button
          onClick={() => inputOperator("×")}
          variant="calc-operation"
          className="p-3 justify-center"
          aria-label="Multiply"
        >
          <X className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => inputNumber("4")}
          variant="calc-number"
          className="p-3 justify-center"
        >
          <span>4</span>
        </Button>
        <Button
          onClick={() => inputNumber("5")}
          variant="calc-number"
          className="p-3 justify-center"
        >
          <span>5</span>
        </Button>
        <Button
          onClick={() => inputNumber("6")}
          variant="calc-number"
          className="p-3 justify-center"
        >
          <span>6</span>
        </Button>
        <Button
          onClick={() => inputOperator("-")}
          variant="calc-operation"
          className="p-3 justify-center"
          aria-label="Subtract"
        >
          <Minus className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => inputNumber("1")}
          variant="calc-number"
          className="p-3 justify-center"
        >
          <span>1</span>
        </Button>
        <Button
          onClick={() => inputNumber("2")}
          variant="calc-number"
          className="p-3 justify-center"
        >
          <span>2</span>
        </Button>
        <Button
          onClick={() => inputNumber("3")}
          variant="calc-number"
          className="p-3 justify-center"
        >
          <span>3</span>
        </Button>
        <Button
          onClick={() => inputOperator("+")}
          variant="calc-operation"
          className="p-3 justify-center"
          aria-label="Add"
        >
          <Plus className="w-5 h-5" />
        </Button>
        <Button
          onClick={toggleSign}
          variant="calc-number"
          className="p-3 justify-center"
          aria-label="Toggle sign"
        >
          <Diff className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => inputNumber("0")}
          variant="calc-number"
          className="p-3 justify-center"
        >
          <span>0</span>
        </Button>
        <Button
          onClick={inputDecimal}
          variant="calc-number"
          className="p-3 justify-center"
          aria-label="Decimal point"
        >
          <span>.</span>
        </Button>
        <Button
          onClick={performCalculation}
          variant="primary"
          className="p-3 justify-center gap-2 rounded"
          aria-label="Equals"
        >
          <Equal className="w-5 h-5" />
        </Button>
      </section>
    </ToolPanel>
  )
}
