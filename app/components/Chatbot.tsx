'use client'

import { useState } from 'react'
import ChatWindow from './ChatWindow'
import ChatToggle from './ChatToggle'
import ChatInput from './ChatInput'
import MessageBubble from './MessageBubble'
import ResponseBubble from './ResponseBubble'
import Panel from './Panel'
import { Message, generateDummyResponse, createMessage } from '../utils/dummyChat'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async (messageContent: string) => {
    // Add user message
    const userMessage = createMessage(messageContent, true)
    setMessages(prev => [...prev, userMessage])
    
    // Simulate typing delay
    setIsTyping(true)
    
    setTimeout(() => {
      const botResponse = generateDummyResponse(messageContent)
      const botMessage = createMessage(botResponse, false)
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
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
              className="max-w-80 p-4 rounded-lg text-black bg-gray-200 dark:text-white dark:bg-gray-700 animate-pulse"
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
              />
            )
          ))}
          
          {messages.length === 0 && (
            <Panel 
              className="text-center text-gray-500 dark:text-gray-400 p-8"
              overwrite={true}
            >
              👋 Hello! I'm a dummy chatbot. Ask me anything to see how responses will look!
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