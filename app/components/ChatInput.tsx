'use client'

import { useState } from 'react'
import Panel from './Panel'
import Input from './Input'
import Button from './Button'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Panel className="flex gap-2 p-3" overwrite={true}>
      <Input 
        placeholder="Type a message..." 
        className="flex-1 px-3 py-2" 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      <Button 
        className="px-4 py-2" 
        variant="primary" 
        onClick={handleSend}
        disabled={disabled || !message.trim()}
      >
        Send
      </Button>
    </Panel>
  )
}