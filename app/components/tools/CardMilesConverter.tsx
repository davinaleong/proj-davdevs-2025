'use client'

import { useState, useCallback, useMemo } from "react"
import loyaltyData from "@/app/data/loyalty-programs.json"
import {
  CreditCard,
  Plane,
  TrendingUp,
  ArrowRightLeft,
  Copy,
  Check,
  Info,
  Star,
  DollarSign,
  Globe,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react"
import Button from "../Button"
import Input from "../Input"
import Label from "../Label"
import Group from "../Group"
import DropdownMenu from "../DropdownMenu"

interface LoyaltyProgram {
  id: string
  name: string
  type: "airline" | "hotel" | "credit_card"
  icon: string
  cashValue: number // cents per point/mile in USD
  transferRatio: number // how many points = 1 mile (for transfers)
  currency: "points" | "miles"
  region:
    | "global"
    | "asean"
    | "singapore"
    | "malaysia"
    | "thailand"
    | "indonesia"
    | "philippines"
    | "asia_pacific"
    | "australia"
    | "hong_kong"
    | "taiwan"
    | "middle_east"
  baseCurrency:
    | "USD"
    | "SGD"
    | "MYR"
    | "THB"
    | "IDR"
    | "PHP"
    | "AUD"
    | "HKD"
    | "TWD"
    | "AED"
}

interface ConversionResult {
  program: LoyaltyProgram
  amount: number
  cashValueUSD: number
  cashValueLocal: number
  localCurrency: string
  transferValue?: number
}

interface ExchangeRates {
  [key: string]: number // rates to USD
}


export default function CardMilesConverter() {
  const [sourceAmount, setSourceAmount] = useState<string>("")
  const [sourceProgramId, setSourceProgramId] = useState<string>("dbs-points")
  const [targetProgramId, setTargetProgramId] =
    useState<string>("singapore-airlines")
  const [selectedCurrency, setSelectedCurrency] = useState<string>("SGD")

  const [copied, setCopied] = useState<string | null>(null)

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "airline",
    "hotel",
    "credit_card",
  ])
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [minValue, setMinValue] = useState<string>("")
  const [maxValue, setMaxValue] = useState<string>("")
  const [sortBy, setSortBy] = useState<"value" | "name" | "type">("value")

  // Current exchange rates (in practice, these would be fetched from an API)
  const exchangeRates: ExchangeRates = useMemo(() => loyaltyData.exchangeRates, [])

  const currencies = loyaltyData.currencies

  const loyaltyPrograms: LoyaltyProgram[] = useMemo(() => loyaltyData.loyaltyPrograms as LoyaltyProgram[], [])

  const getProgram = useCallback((id: string) => loyaltyPrograms.find((p) => p.id === id), [loyaltyPrograms])

  const convertToUSD = useCallback((amount: number, fromCurrency: string): number => {
    return amount * exchangeRates[fromCurrency]
  }, [exchangeRates])

  const convertFromUSD = useCallback((amount: number, toCurrency: string): number => {
    return amount / exchangeRates[toCurrency]
  }, [exchangeRates])

  const conversionResults = useMemo(() => {
    const amount = parseFloat(sourceAmount)
    if (!amount || amount <= 0) {
      return []
    }

    const sourceProgram = getProgram(sourceProgramId)
    if (!sourceProgram) return []

    const results: ConversionResult[] = loyaltyPrograms.map((targetProgram) => {
      let convertedAmount = amount
      let transferValue: number | undefined

      // Calculate transfer value if converting between different programs
      if (sourceProgram.id !== targetProgram.id) {
        // Transfer calculation based on program types and ratios
        if (
          sourceProgram.type === "hotel" &&
          targetProgram.type === "airline"
        ) {
          convertedAmount = amount / sourceProgram.transferRatio
        } else if (
          sourceProgram.type === "airline" &&
          targetProgram.type === "hotel"
        ) {
          convertedAmount = amount * targetProgram.transferRatio
        } else if (
          sourceProgram.type === "credit_card" &&
          targetProgram.type !== "credit_card"
        ) {
          convertedAmount = amount / sourceProgram.transferRatio
        }
        transferValue = convertedAmount
      }

      // Calculate cash value in USD
      let cashValueUSD: number
      if (targetProgram.baseCurrency === "USD") {
        cashValueUSD = (convertedAmount * targetProgram.cashValue) / 100
      } else {
        // Convert program's cash value to USD first
        const localCashValue = (convertedAmount * targetProgram.cashValue) / 100
        cashValueUSD = convertToUSD(localCashValue, targetProgram.baseCurrency)
      }

      // Convert to selected display currency
      const cashValueLocal = convertFromUSD(cashValueUSD, selectedCurrency)

      return {
        program: targetProgram,
        amount: convertedAmount,
        cashValueUSD,
        cashValueLocal,
        localCurrency: selectedCurrency,
        transferValue,
      }
    })

    // Sort by USD cash value (highest first)
    results.sort((a, b) => b.cashValueUSD - a.cashValueUSD)
    return results
  }, [sourceAmount, sourceProgramId, selectedCurrency, convertFromUSD, convertToUSD, getProgram, loyaltyPrograms])

  const getFilteredAndSortedResults = () => {
    const filtered = conversionResults.filter((result) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        result.program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.program.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.program.region.toLowerCase().includes(searchTerm.toLowerCase())

      // Type filter
      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(result.program.type)

      // Region filter
      const matchesRegion =
        selectedRegions.length === 0 ||
        selectedRegions.includes(result.program.region)

      // Value filter
      const matchesMinValue =
        minValue === "" || result.cashValueLocal >= parseFloat(minValue)
      const matchesMaxValue =
        maxValue === "" || result.cashValueLocal <= parseFloat(maxValue)

      return (
        matchesSearch &&
        matchesType &&
        matchesRegion &&
        matchesMinValue &&
        matchesMaxValue
      )
    })

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.program.name.localeCompare(b.program.name)
        case "type":
          return a.program.type.localeCompare(b.program.type)
        case "value":
        default:
          return b.cashValueUSD - a.cashValueUSD
      }
    })

    return filtered
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedTypes(["airline", "hotel", "credit_card"])
    setSelectedRegions([])
    setMinValue("")
    setMaxValue("")
    setSortBy("value")
  }

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    )
  }

  const swapPrograms = () => {
    setSourceProgramId(targetProgramId)
    setTargetProgramId(sourceProgramId)
  }

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  const formatPoints = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`
  }

  const getProgramTypeIcon = (type: string) => {
    switch (type) {
      case "airline":
        return <Plane size={16} />
      case "hotel":
        return <Star size={16} />
      case "credit_card":
        return <CreditCard size={16} />
      default:
        return <Star size={16} />
    }
  }

  const getRegionFlag = (region: string) => {
    switch (region) {
      case "singapore":
        return "🇸🇬"
      case "malaysia":
        return "🇲🇾"
      case "thailand":
        return "🇹🇭"
      case "indonesia":
        return "🇮🇩"
      case "philippines":
        return "🇵🇭"
      case "hong_kong":
        return "🇭🇰"
      case "taiwan":
        return "🇹🇼"
      case "australia":
        return "🇦🇺"
      case "middle_east":
        return "🇦🇪"
      case "asia_pacific":
        return "🌏"
      case "asean":
        return "🌏"
      case "global":
        return "🌍"
      default:
        return "🌍"
    }
  }

  const sourceProgram = getProgram(sourceProgramId)
  const bestValue = conversionResults[0]

  return (
    <div className="p-6 max-w-7xl mx-auto border bg-white border-gray-300 dark:bg-black dark:border-gray-700 rounded-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-sm">
          <CreditCard className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">
            Asia Pacific Card Miles Converter
          </h2>
          <p className="text-sm opacity-75">
            Convert points and miles between loyalty programs across Asia
            Pacific with multi-currency support
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-8">
        {/* Amount Input */}
        <div className="lg:col-span-2">
          <Group variant="vertical">
            <Label>Amount to Convert</Label>
            <Input
              type="number"
              value={sourceAmount}
              onChange={(e) => setSourceAmount(e.target.value)}
              placeholder="Enter points/miles amount"
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm focus:ring-2"
            />
          </Group>
        </div>

        {/* Source Program */}
        <div className="lg:col-span-2">
          <Group variant="vertical">
            <Label>From Program</Label>
            <DropdownMenu
            value={sourceProgramId}
            onChange={setSourceProgramId}
            groups={[
              {
                label: "ASEAN Credit Cards",
                options: loyaltyPrograms
                  .filter(
                    (p) =>
                      p.type === "credit_card" &&
                      (p.region === "singapore" ||
                        p.region === "malaysia" ||
                        p.region === "indonesia")
                  )
                  .map((program) => ({
                    label: `${program.icon} ${program.name}`,
                    value: program.id,
                  }))
              },
              {
                label: "Global Credit Cards",
                options: loyaltyPrograms
                  .filter(
                    (p) => p.type === "credit_card" && p.region === "global"
                  )
                  .map((program) => ({
                    label: `${program.icon} ${program.name}`,
                    value: program.id,
                  }))
              },
              {
                label: "ASEAN Airlines",
                options: loyaltyPrograms
                  .filter(
                    (p) =>
                      p.type === "airline" &&
                      (p.region === "asean" ||
                        p.region === "singapore" ||
                        p.region === "malaysia" ||
                        p.region === "thailand" ||
                        p.region === "indonesia" ||
                        p.region === "philippines")
                  )
                  .map((program) => ({
                    label: `${program.icon} ${program.name}`,
                    value: program.id,
                  }))
              },
              {
                label: "Asia Pacific Airlines",
                options: loyaltyPrograms
                  .filter(
                    (p) =>
                      p.type === "airline" &&
                      (p.region === "asia_pacific" ||
                        p.region === "australia" ||
                        p.region === "hong_kong" ||
                        p.region === "taiwan")
                  )
                  .map((program) => ({
                    label: `${program.icon} ${program.name}`,
                    value: program.id,
                  }))
              },
              {
                label: "Middle East Airlines",
                options: loyaltyPrograms
                  .filter(
                    (p) => p.type === "airline" && p.region === "middle_east"
                  )
                  .map((program) => ({
                    label: `${program.icon} ${program.name}`,
                    value: program.id,
                  }))
              },
              {
                label: "Global Airlines",
                options: loyaltyPrograms
                  .filter((p) => p.type === "airline" && p.region === "global")
                  .map((program) => ({
                    label: `${program.icon} ${program.name}`,
                    value: program.id,
                  }))
              },
              {
                label: "Hotels",
                options: loyaltyPrograms
                  .filter((p) => p.type === "hotel")
                  .map((program) => ({
                    label: `${program.icon} ${program.name}`,
                    value: program.id,
                  }))
              }
            ]}
            className="w-full"
          />
          </Group>
        </div>

        {/* Currency Selection */}
        <div>
          <Group variant="vertical">
            <Label>
              <Globe className="w-4 h-4 inline mr-1" />
              Display Currency
            </Label>
            <DropdownMenu
              value={selectedCurrency}
              onChange={setSelectedCurrency}
              options={currencies.map((currency) => ({
                label: `${currency.flag} ${currency.code}`,
                value: currency.code,
              }))}
              className="w-full"
            />
          </Group>
        </div>

        {/* Swap Button */}
        <div className="flex items-end">
          <Button
            onClick={swapPrograms}
            variant="secondary"
            className="w-full px-4 py-2 justify-center"
          >
            <ArrowRightLeft size={16} />
            <span className="hidden sm:inline">Swap</span>
          </Button>
        </div>
      </div>

      {/* Quick Search (always visible when there are results) */}
      {conversionResults.length > 0 && (
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
            <Input
              type="search"
              placeholder="Quick search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-sm focus:ring-2"
            />
            {searchTerm && (
              <Button
                onClick={() => setSearchTerm("")}
                variant="secondary"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 border-0 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={16} />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Exchange Rate Info */}
      {selectedCurrency !== "USD" && (
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800 rounded-sm">
          <div className="flex items-center gap-2 text-sm text-yellow-800 dark:text-yellow-200">
            <Globe size={16} />
            <span>
              Exchange Rate: 1 {selectedCurrency} ={" "}
              {exchangeRates[selectedCurrency].toFixed(4)} USD
            </span>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {sourceProgram && sourceAmount && parseFloat(sourceAmount) > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Current Value
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-500">
              {formatCurrency(
                convertFromUSD(
                  ((parseFloat(sourceAmount) * sourceProgram.cashValue) / 100) *
                    (sourceProgram.baseCurrency === "USD"
                      ? 1
                      : exchangeRates[sourceProgram.baseCurrency]),
                  selectedCurrency
                ),
                selectedCurrency
              )}
            </div>
            <div className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-1">
              {getRegionFlag(sourceProgram.region)} {sourceProgram.cashValue}¢
              per {sourceProgram.currency.slice(0, -1)}
            </div>
          </div>

          {bestValue && (
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-900 dark:text-green-100">
                  Best Value
                </span>
              </div>
              <div className="text-2xl font-bold text-green-500">
                {formatCurrency(bestValue.cashValueLocal, selectedCurrency)}
              </div>
              <div className="text-xs text-green-700 dark:text-green-300 flex items-center gap-1">
                {getRegionFlag(bestValue.program.region)}{" "}
                {bestValue.program.name}
              </div>
            </div>
          )}

          <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-sm">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                Programs
              </span>
            </div>
            <div className="text-2xl font-bold text-purple-500">
              {loyaltyPrograms.length}
            </div>
            <div className="text-xs text-purple-700 dark:text-purple-300">
              Asia Pacific + Global programs
            </div>
          </div>
        </div>
      )}

      {/* Conversion Results */}
      {conversionResults.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium opacity-90">
              Conversion Results
            </h3>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant={showFilters ||
                  selectedTypes.length < 3 ||
                  selectedRegions.length > 0 ||
                  searchTerm ||
                  minValue ||
                  maxValue ? "primary" : "gray"}
                className="px-3 py-1.5 text-sm"
              >
                <SlidersHorizontal size={16} />
                Filters
              </Button>
              <div className="text-sm text-gray-500">
                {getFilteredAndSortedResults().length} of{" "}
                {conversionResults.length} programs
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className={`mb-4 space-y-4 ${showFilters ? "block" : "hidden"}`}>
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
              <Input
                type="search"
                placeholder="Search programs by name, type, or region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-sm focus:ring-2"
              />
              {searchTerm && (
                <Button
                  onClick={() => setSearchTerm("")}
                  variant="secondary"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 border-0 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X size={16} />
                </Button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 border bg-gray-50 border-gray-300 dark:bg-gray-950 dark:border dark:border-gray-700 rounded-sm">
              {/* Program Types */}
              <div>
                <label className="block text-sm font-medium opacity-75 mb-2">
                  Program Types
                </label>
                <div className="space-y-2">
                  {[
                    { value: "airline", label: "Airlines", icon: "✈️" },
                    { value: "hotel", label: "Hotels", icon: "🏨" },
                    { value: "credit_card", label: "Credit Cards", icon: "💳" },
                  ].map((type) => (
                    <label key={type.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type.value)}
                        onChange={() => toggleType(type.value)}
                        className="border border-gray-300 dark:border-gray-700 rounded-sm text-blue-500 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm opacity-75">
                        {type.icon} {type.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Regions */}
              <div>
                <label className="block text-sm font-medium opacity-75 mb-2">
                  Regions
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {[
                    { value: "singapore", label: "Singapore", flag: "🇸🇬" },
                    { value: "malaysia", label: "Malaysia", flag: "🇲🇾" },
                    { value: "thailand", label: "Thailand", flag: "🇹🇭" },
                    { value: "indonesia", label: "Indonesia", flag: "🇮🇩" },
                    { value: "philippines", label: "Philippines", flag: "🇵🇭" },
                    { value: "hong_kong", label: "Hong Kong", flag: "🇭🇰" },
                    { value: "taiwan", label: "Taiwan", flag: "🇹🇼" },
                    { value: "australia", label: "Australia", flag: "🇦🇺" },
                    { value: "middle_east", label: "Middle East", flag: "🇦🇪" },
                    { value: "asean", label: "ASEAN", flag: "🌏" },
                    {
                      value: "asia_pacific",
                      label: "Asia Pacific",
                      flag: "🌏",
                    },
                    { value: "global", label: "Global", flag: "🌍" },
                  ].map((region) => (
                    <label key={region.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRegions.includes(region.value)}
                        onChange={() => toggleRegion(region.value)}
                        className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm opacity-75">
                        {region.flag} {region.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Value Range */}
              <div>
                <Group variant="vertical">
                  <Label>Value Range ({selectedCurrency})</Label>
                  <div className="space-y-2">
                    <Input
                      type="number"
                      placeholder="Min value"
                      value={minValue}
                      onChange={(e) => setMinValue(e.target.value)}
                      className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-sm focus:ring-2"
                    />
                    <Input
                      type="number"
                      placeholder="Max value"
                      value={maxValue}
                      onChange={(e) => setMaxValue(e.target.value)}
                      className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-sm focus:ring-2"
                    />
                  </div>
                </Group>
              </div>

              {/* Sort Options */}
              <div>
                <Group variant="vertical">
                  <Label>Sort By</Label>
                  <DropdownMenu
                    value={sortBy}
                    onChange={(value) => setSortBy(value as "value" | "name" | "type")}
                    options={[
                      { label: "Cash Value (High to Low)", value: "value" },
                      { label: "Program Name (A-Z)", value: "name" },
                      { label: "Program Type", value: "type" }
                    ]}
                    className="w-full text-sm"
                  />
                  <Button
                    onClick={clearFilters}
                    variant="gray"
                    className="mt-2 w-full px-3 py-1.5 text-sm"
                  >
                    Clear All Filters
                  </Button>
                </Group>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredAndSortedResults().map((result) => {
              // Find the original index for highlighting the best overall value
              const originalIndex = conversionResults.findIndex(
                (r) => r.program.id === result.program.id
              )
              return (
                <div
                  key={result.program.id}
                  className={`border rounded-sm p-4 hover:shadow-md transition-shadow ${
                    originalIndex === 0
                      ? "border-green-500 bg-green-50 dark:bg-green-950"
                      : "border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{result.program.icon}</span>
                      <div className="flow">
                        <div className="font-medium opacity-90 text-sm">
                          {result.program.name}
                        </div>
                        <div className="text-xs flex items-center gap-1 opacity-50">
                          {getProgramTypeIcon(result.program.type)}
                          <span className="capitalize">
                            {result.program.type.replace("_", " ")}
                          </span>
                          {getRegionFlag(result.program.region)}
                        </div>
                      </div>
                    </div>
                    {originalIndex === 0 && (
                      <Star
                        className="w-4 h-4 text-green-500"
                        fill="currentColor"
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="text-xs opacity-50">Amount</div>
                      <div className="font-semibold opacity-90">
                        {formatPoints(
                          Math.round(result.amount),
                          result.program.currency
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs opacity-50">
                        Cash Value ({selectedCurrency})
                      </div>
                      <div className="font-bold text-lg text-green-500">
                        {formatCurrency(
                          result.cashValueLocal,
                          selectedCurrency
                        )}
                      </div>
                      {selectedCurrency !== "USD" && (
                        <div className="text-xs opacity-50">
                          {formatCurrency(result.cashValueUSD, "USD")}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs opacity-50">
                        {result.program.cashValue}¢ per{" "}
                        {result.program.currency.slice(0, -1)}
                      </div>
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            `${formatPoints(
                              Math.round(result.amount),
                              result.program.currency
                            )} = ${formatCurrency(
                              result.cashValueLocal,
                              selectedCurrency
                            )}`,
                            result.program.id
                          )
                        }
                        variant="secondary"
                        className="p-1 opacity-50 hover:opacity-80 transition-opacity border-0 bg-transparent"
                        title="Copy conversion"
                      >
                        {copied === result.program.id ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </Button>
                    </div>

                    {result.transferValue &&
                      result.transferValue !== result.amount && (
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-900">
                          <div className="text-xs text-blue-500">
                            Transfer: {Math.round(result.transferValue)}{" "}
                            {result.program.currency}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {conversionResults.length > 0 &&
        getFilteredAndSortedResults().length === 0 && (
          <div className="text-center py-8">
            <div className="opacity-50 mb-4">
              <Search className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-lg font-medium">
                No programs match your filters
              </p>
              <p className="text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
            <Button
              onClick={clearFilters}
              variant="primary"
              className="px-4 py-2"
            >
              Clear All Filters
            </Button>
          </div>
        )}

      {/* Help Text */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-sm">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-500 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">
              Asia Pacific Card Miles Converter:
            </p>
            <ul className="space-y-1 text-xs">
              <li>
                • Compare loyalty programs across Asia Pacific region (ASEAN,
                Australia, Hong Kong, Taiwan, Middle East)
              </li>
              <li>
                • Multi-currency support with live exchange rates (SGD, MYR,
                THB, AUD, HKD, TWD, AED, USD)
              </li>
              <li>
                • Major airlines: Singapore Airlines, Cathay Pacific, Qantas,
                EVA Air, Etihad, Qatar Airways, Flying Blue, etc.
              </li>
              <li>
                • Local credit card programs and global programs (DBS, OCBC,
                UOB, Maybank, Amex, Citi, etc.)
              </li>
              <li>• Hotel programs: Marriott, Hilton, IHG, Shangri-La</li>
              <li>
                • Transfer ratios considered for hotel-to-airline conversions
              </li>
              <li>
                • Green highlight shows the program with the highest cash value
                in your selected currency
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
