'use client'

import React, { useState } from "react"
import { Search, Copy } from "lucide-react"
import Button from "../Button"
import Input from "../Input"

export default function DuplicateParagraphScanner() {
  const [url, setUrl] = useState("")
  const [duplicates, setDuplicates] = useState<string[]>([])
  const [paragraphs, setParagraphs] = useState<string[]>([])
  const [error, setError] = useState("")

  async function handleScan() {
    setError("")
    setDuplicates([])
    setParagraphs([])

    try {
      const response = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
      )
      if (!response.ok) throw new Error("Failed to fetch content")
      const html = await response.text()
      const doc = new DOMParser().parseFromString(html, "text/html")
      const paras = Array.from(doc.querySelectorAll("p")).map(
        (p) => p.textContent?.trim() || ""
      )
      const seen = new Set<string>()
      const dups = new Set<string>()

      paras.forEach((p) => {
        const key = p.toLowerCase()
        if (seen.has(key)) dups.add(p)
        else seen.add(key)
      })

      setParagraphs(paras)
      setDuplicates(Array.from(dups))
    } catch (error) {
      setError(
        "Could not fetch or parse the page. Make sure the site allows cross-origin requests."
      )
      console.error(error)
    }
  }

  return (
    <article className="p-6 max-w-6xl mx-auto border bg-white border-gray-300 dark:bg-black dark:border-gray-700 rounded-sm">
      {/* Header */}
      <header className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-100 rounded-sm">
          <Search size={24} className="text-blue-500" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold opacity-75">
            Duplicate Paragraph Scanner
          </h2>
          <p className="text-sm opacity-75">
            Enter a website URL to scan for duplicate paragraphs
          </p>
        </div>
      </header>

      <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="space-y-6">
        <section>
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
              required
            />
            <Button
              type="submit"
              variant="primary"
              className="px-6 py-2"
            >
              <Search size={16} />
              Scan
            </Button>
          </div>
        </section>
      </form>

      {error && (
        <section className="mt-6 p-4 bg-red-50 border border-red-200 rounded-sm dark:bg-red-950 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </section>
      )}

      {duplicates.length > 0 && (
        <section className="mt-6 p-4 border border-yellow-200 bg-yellow-50 rounded-sm dark:bg-yellow-950 dark:border-yellow-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200">
              🔁 Duplicated Paragraphs Found ({duplicates.length})
            </h3>
            <Button
              variant="secondary"
              onClick={() => navigator.clipboard.writeText(duplicates.join('\n\n'))}
              title="Copy all duplicates"
            >
              <Copy size={16} />
              Copy All
            </Button>
          </div>
          <ul className="space-y-3">
            {duplicates.map((dup, i) => (
              <li key={i} className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded border border-yellow-200 dark:border-yellow-700">
                <div className="flex items-start justify-between gap-2">
                  <span className="flex-1">{dup}</span>
                  <Button
                    variant="icon"
                    onClick={() => navigator.clipboard.writeText(dup)}
                    title="Copy this paragraph"
                  >
                    <Copy size={14} />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {paragraphs.length > 0 && (
        <section className="mt-6 p-4 border border-gray-200 bg-gray-50 rounded-sm dark:bg-gray-950 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              📄 All Paragraphs ({paragraphs.length})
            </h3>
            <Button
              variant="secondary"
              onClick={() => navigator.clipboard.writeText(paragraphs.join('\n\n'))}
              title="Copy all paragraphs"
            >
              <Copy size={16} />
              Copy All
            </Button>
          </div>
          <ol className="space-y-2">
            {paragraphs.map((para, i) => (
              <li key={i} className="flex items-start gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded">
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 min-w-[2rem]">
                  {i + 1}.
                </span>
                <span className="flex-1">{para}</span>
                <Button
                  variant="icon"
                  onClick={() => navigator.clipboard.writeText(para)}
                  title="Copy this paragraph"
                >
                  <Copy size={14} />
                </Button>
              </li>
            ))}
          </ol>
        </section>
      )}
    </article>
  )
}
