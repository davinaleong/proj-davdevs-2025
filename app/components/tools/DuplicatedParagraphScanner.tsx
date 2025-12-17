'use client'

import React, { useState } from "react"
import { Search, Copy, Download } from "lucide-react"
import Button from "../Button"
import Input from "../Input"
import Table from "../Table"

interface DuplicateData {
  text: string
  count: number
  pageTitle: string
  [key: string]: unknown
}

export default function DuplicateParagraphScanner() {
  const [url, setUrl] = useState("")
  const [duplicates, setDuplicates] = useState<DuplicateData[]>([])
  const [error, setError] = useState("")
  
  // Heatmap function for count visualization
  const getCountHeatmap = (count: number, maxCount: number) => {
    const ratio = count / maxCount
    if (ratio <= 0.33) {
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    } else if (ratio <= 0.66) {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    } else {
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    }
  }
  
  // CSV Export function
  const exportToCSV = () => {
    const headers = ['Paragraph', 'Page Title', 'Count']
    const csvContent = [
      headers.join(','),
      ...duplicates.map(dup => [
        `"${(dup.text || '').replace(/"/g, '""')}"`,
        `"${(dup.pageTitle || '').replace(/"/g, '""')}"`,
        dup.count
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `duplicate-paragraphs-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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
      
      // Extract page title from title tag, fallback to first h1 in header or body
      let pageTitle = doc.querySelector('title')?.textContent?.trim()
      
      if (!pageTitle || pageTitle === '') {
        // Try to get title from h1 in header first
        const headerH1 = doc.querySelector('header h1')?.textContent?.trim()
        if (headerH1) {
          pageTitle = headerH1
        } else {
          // Fallback to any h1 tag
          const anyH1 = doc.querySelector('h1')?.textContent?.trim()
          pageTitle = anyH1 || 'Untitled Page'
        }
      }
      
      const paras = Array.from(doc.querySelectorAll("p")).map(
        (p) => p.textContent?.trim() || ""
      ).filter(p => p.length > 0) // Filter out empty paragraphs

      if (paras.length === 0) {
        throw new Error("No paragraphs found on the page. The page might be using JavaScript to load content.")
      }

      // Count occurrences of each paragraph
      const paragraphCounts = new Map<string, {text: string, count: number, pageTitle: string}>()

      paras.forEach((p) => {
        const key = p.toLowerCase().trim()
        if (key.length > 0) { // Only process non-empty paragraphs
          if (paragraphCounts.has(key)) {
            const existing = paragraphCounts.get(key)!
            existing.count++
          } else {
            paragraphCounts.set(key, { text: p, count: 1, pageTitle })
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

      {duplicates.length > 0 && (() => {
        const maxCount = Math.max(...duplicates.map(d => d.count))
        
        return (
          <section className="mt-6">
            <Table 
              styles={['striped', 'bordered']}
              caption={`🔁 Duplicated Paragraphs Found (${duplicates.length})`}
              data={duplicates}
              columns={[
                {
                  key: 'text',
                  label: 'Paragraph',
                  render: (value: unknown) => {
                    const stringValue = String(value)
                    return (
                      <div className="max-w-md truncate" title={stringValue}>
                        {stringValue}
                      </div>
                    )
                  }
                },
                {
                  key: 'pageTitle',
                  label: 'Page Title',
                  render: (value: unknown) => {
                    const stringValue = String(value)
                    return (
                      <div className="max-w-xs truncate font-medium" title={stringValue}>
                        {stringValue}
                      </div>
                    )
                  }
                },
                {
                  key: 'count',
                  label: 'Count',
                  render: (value: unknown) => {
                    const numberValue = Number(value)
                    return (
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCountHeatmap(numberValue, maxCount)}`}>
                        {numberValue}
                      </span>
                    )
                  }
                },
                {
                  key: 'actions',
                  label: 'Actions',
                  sortable: false,
                  render: (_: unknown, row: { [key: string]: unknown }) => {
                    const duplicate = row as unknown as DuplicateData
                    return (
                      <Button
                        variant="icon"
                        onClick={() => navigator.clipboard.writeText(`${duplicate.text} | ${duplicate.pageTitle} | ${duplicate.count}`)}
                        title="Copy this row"
                      >
                        <Copy size={14} />
                      </Button>
                    )
                  }
                }
              ]}
            >
              <Table.Foot>
                <Table.Row>
                  <Table.Cell colSpan={4} className="text-center">
                    <Button
                        variant="secondary"
                        onClick={exportToCSV}
                        title="Export results to CSV file"
                      >
                        <Download size={16} />
                        Export to CSV
                      </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Foot>
            </Table>
          </section>
        )
      })()}

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
