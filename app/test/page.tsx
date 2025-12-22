'use client'

import { notFound } from 'next/navigation'
import Chatbot from './../components/Chatbot'

export default function Test() {
    // Prevent access in production
    if (process.env.NODE_ENV === 'production') {
        notFound()
    }

    return (
        <div className="relative container mx-auto flow p-4">
            <h1 className="text-2xl lg:text-4xl font-bold mb-4">🧪 Test Page</h1>
            <p>This page is for testing components during development.</p>
            
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Dummy Chatbot</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Click the chat button in the bottom-right corner to test the chatbot interface. 
                    It includes dummy responses with markdown formatting to demonstrate how the real AI will look.
                </p>
            </div>

            <Chatbot />
        </div>
    )
}