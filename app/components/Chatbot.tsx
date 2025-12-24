'use client'

import { useState } from 'react'
import ChatWindow from './ChatWindow'
import ChatToggle from './ChatToggle'
import ChatInput from './ChatInput'
import MessageBubble from './MessageBubble'
import ResponseBubble from './ResponseBubble'
import Panel from './Panel'

export interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  sources?: string[]
}

function createMessage(content: string, isUser: boolean, sources?: string[]): Message {
  return {
    id: Math.random().toString(36).substr(2, 9),
    content,
    isUser,
    timestamp: new Date(),
    sources
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (messageContent: string) => {
    // Add user message
    const userMessage = createMessage(messageContent, true)
    setMessages(prev => [...prev, userMessage])
    
    // Show typing indicator
    setIsTyping(true)
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageContent }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      const botMessage = createMessage(data.answer, false, data.sources)
      setMessages(prev => [...prev, botMessage])
      
    } catch (error) {
      console.error('Error calling chat API:', error)
      const errorMessage = createMessage(
        'Sorry, I encountered an error while processing your request. Please try again later.',
        false
      )
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      <ChatWindow isOpen={isOpen}>
        {/* Messages Container */}
        <Panel 
          className="flex-1 flex flex-col-reverse overflow-y-auto gap-3 p-4 bg-gray-50 dark:bg-gray-800" 
          overwrite={true}
        >
          {isTyping && (
            <Panel 
              className="max-w-80 p-4 rounded-sm text-black bg-gray-200 dark:text-white dark:bg-gray-700 animate-pulse"
              overwrite={true}
            >
              Typing...
            </Panel>
          )}
          
          {messages.slice().reverse().map((message) => (
            message.isUser ? (
              <MessageBubble 
                key={message.id}
                message={message.content} 
                isUser={true} 
              />
            ) : (
              <ResponseBubble 
                key={message.id}
                response={message.content} 
                sources={message.sources}
              />
            )
          ))}
          
          {messages.length === 0 && (
            <Panel 
              className="text-center text-gray-500 dark:text-gray-400 p-8"
              overwrite={true}
            >
              👋 Hello! I&apos;m an AI assistant powered by your repository knowledge. Ask me anything about your codebase!
            </Panel>
          )}
        </Panel>
        
        {/* Input */}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={isTyping}
        />
      </ChatWindow>
      
      <ChatToggle isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
    </>
  )
}