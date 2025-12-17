'use client'

import React, { useState } from "react"
import { Search, Copy } from "lucide-react"
import Button from "../Button"
import Input from "../Input"

export default function DuplicateParagraphScanner() {
  const [url, setUrl] = useState("")
  const [duplicates, setDuplicates] = useState<{text: string, count: number}[]>([])
  const [error, setError] = useState("")

  async function handleScan() {
    setError("")
    setDuplicates([])

    try {
      // Check if URL is localhost - proxies won't work for local development
      const urlObj = new URL(url)
      const isLocalhost = urlObj.hostname === 'localhost' || 
                         urlObj.hostname === '127.0.0.1' || 
                         urlObj.hostname.endsWith('.local')

      let html = ""
      let lastError: Error | null = null

      if (isLocalhost) {
        // Try direct fetch for localhost URLs (may work in some browsers/setups)
        try {
          const response = await fetch(url, {
            mode: 'cors',
            headers: {
              'Accept': 'text/html, */*',
            }
          })
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }
          
          html = await response.text()
        } catch (err) {
          console.error(err)
          throw new Error(
            `Cannot scan localhost URLs. CORS proxies cannot access your local development server. ` +
            `To scan localhost pages: 1) Deploy to a public URL, 2) Use browser extensions that disable CORS, ` +
            `or 3) Copy the page HTML directly and use a different tool.`
          )
        }
      } else {
        // Use proxy services for external URLs
        const proxyServices = [
          `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
          `https://corsproxy.io/?${encodeURIComponent(url)}`,
          `https://cors-anywhere.herokuapp.com/${url}`,
        ]

        // Try each proxy service until one works
        for (const proxyUrl of proxyServices) {
        try {
          const response = await fetch(proxyUrl, {
            headers: {
              'Accept': 'application/json, text/html, */*',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          })
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }

          // Handle different response formats from different proxies
          if (proxyUrl.includes('allorigins.win')) {
            const data = await response.json()
            html = data.contents || data.data || ""
          } else {
            html = await response.text()
          }

          if (html) break // Success, exit the loop
          
        } catch (err) {
          lastError = err instanceof Error ? err : new Error(String(err))
          console.warn(`Proxy ${proxyUrl} failed:`, err)
          continue // Try next proxy
        }
      }
      }

      if (!html) {
        throw new Error(
          `All proxy services failed. Last error: ${lastError?.message || 'Unknown error'}. ` +
          'Try a different URL or ensure the website is accessible.'
        )
      }

      const doc = new DOMParser().parseFromString(html, "text/html")
      const paras = Array.from(doc.querySelectorAll("p")).map(
        (p) => p.textContent?.trim() || ""
      ).filter(p => p.length > 0) // Filter out empty paragraphs

      if (paras.length === 0) {
        throw new Error("No paragraphs found on the page. The page might be using JavaScript to load content.")
      }

      // Count occurrences of each paragraph
      const paragraphCounts = new Map<string, {text: string, count: number}>()

      paras.forEach((p) => {
        const key = p.toLowerCase().trim()
        if (key.length > 0) { // Only process non-empty paragraphs
          if (paragraphCounts.has(key)) {
            const existing = paragraphCounts.get(key)!
            existing.count++
          } else {
            paragraphCounts.set(key, { text: p, count: 1 })
          }
        }
      })

      // Filter to only show paragraphs that appear more than once
      const duplicatesWithCounts = Array.from(paragraphCounts.values())
        .filter(item => item.count > 1)
        .sort((a, b) => b.count - a.count) // Sort by count descending

      setDuplicates(duplicatesWithCounts)
      
      // Show success message if no duplicates found
      if (duplicatesWithCounts.length === 0) {
        setError("")
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      setError(
        `Failed to scan the page: ${errorMessage}. ` +
        'This might be due to CORS restrictions, the website blocking proxies, ' +
        'or the page requiring JavaScript to load content.'
      )
      console.error("Scanning error:", error)
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
              onClick={() => navigator.clipboard.writeText(duplicates.map(d => `${d.text} | ${d.count}`).join('\n\n'))}
              title="Copy all duplicates with counts"
            >
              <Copy size={16} />
              Copy All
            </Button>
          </div>
          <ul className="space-y-3">
            {duplicates.map((dup, i) => (
              <li key={i} className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-sm border border-yellow-200 dark:border-yellow-700">
                <div className="flex items-start justify-between gap-2">
                  <span className="flex-1">{dup.text}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded-sm">
                      {dup.count}
                    </span>
                    <Button
                      variant="icon"
                      onClick={() => navigator.clipboard.writeText(`${dup.text} | ${dup.count}`)}
                      title="Copy this paragraph with count"
                    >
                      <Copy size={14} />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {duplicates.length === 0 && url && !error && (
        <section className="mt-6 p-4 border border-green-200 bg-green-50 rounded-sm dark:bg-green-950 dark:border-green-800">
          <p className="text-green-600 dark:text-green-400">
            ✅ No duplicate paragraphs found! All content appears to be unique.
          </p>
        </section>
      )}
    </article>
  )
}
