'use client'

import Modal from "./Modal"
import SearchInput from "./SearchInput"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const handleSearch = (searchTerm: string) => {
    // Handle search submission - could navigate to search results page
    console.log('Search submitted:', searchTerm)
    // For now, just close the modal after search
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Search Site"
      size="lg"
      showCloseButton={true}
    >
      <div className="space-y-4">
        <SearchInput
          onSearch={handleSearch}
          placeholder="Search tools, posts, projects..."
          showAutocomplete={true}
          className="w-full"
        />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>Search through all tools, blog posts, and projects on this site.</p>
          <p className="mt-2">
            <strong>Tips:</strong> Use keywords like "calculator", "password", "color" to find specific tools.
          </p>
        </div>
      </div>
    </Modal>
  )
}