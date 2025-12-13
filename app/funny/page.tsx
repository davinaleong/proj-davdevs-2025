'use client'

import { useState, useEffect } from 'react'
import { type Joke, getRandomJoke } from './../utils/jokes'
import Button from './../components/Button'

export default function Funny() {
    const [joke] = useState<Joke>(() => getRandomJoke())
    const [showAnswer, setShowAnswer] = useState(false)
    const [timeLeft, setTimeLeft] = useState(10) // 10 seconds countdown
    const [isActive, setIsActive] = useState(false)
    const [userAnswer, setUserAnswer] = useState('')
    const [feedback, setFeedback] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)

    // Start timer when it's a QA joke and answer isn't shown yet
    useEffect(() => {
        if (joke.type === 'qa' && !showAnswer) {
            setIsActive(true)
        }
    }, [joke.type, showAnswer])

    // Timer countdown logic
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => time - 0.1) // Update every 100ms for smooth animation
            }, 100)
        } else if (timeLeft <= 0 && joke.type === 'qa' && !showAnswer) {
            // Auto-reveal answer when time is up
            setShowAnswer(true)
            setIsActive(false)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isActive, timeLeft, joke.type, showAnswer])

    const handleShowAnswer = () => {
        setShowAnswer(true)
        setIsActive(false)
    }

    const calculateSimilarity = (userInput: string, correctAnswer: string): number => {
        const user = userInput.toLowerCase().trim()
        const correct = correctAnswer.toLowerCase().trim()
        
        // Exact match
        if (user === correct) return 100
        
        // Check if user answer is contained in correct answer or vice versa
        if (user.length > 0 && (correct.includes(user) || user.includes(correct))) {
            return Math.max(60, Math.round((Math.min(user.length, correct.length) / Math.max(user.length, correct.length)) * 80))
        }
        
        // Calculate character similarity using Levenshtein distance concept
        const maxLength = Math.max(user.length, correct.length)
        if (maxLength === 0) return 100
        
        let matches = 0
        const minLength = Math.min(user.length, correct.length)
        
        for (let i = 0; i < minLength; i++) {
            if (user[i] === correct[i]) matches++
        }
        
        const similarity = Math.round((matches / maxLength) * 100)
        return Math.max(0, similarity)
    }

    const getFeedbackMessage = (similarity: number): string => {
        if (similarity >= 100) return "Excellent! That's the correct answer."
        if (similarity >= 80) return "Very close! You're almost there."
        if (similarity >= 60) return "Good attempt! You're on the right track."
        if (similarity >= 40) return "Getting warmer, but not quite right."
        if (similarity >= 20) return "Not quite there yet. Try a different approach."
        return "That's not it, but keep trying!"
    }

    const handleSubmitAnswer = () => {
        if (!userAnswer.trim() || !joke.answer) return
        
        const similarity = calculateSimilarity(userAnswer, joke.answer)
        const message = getFeedbackMessage(similarity)
        setFeedback(message)
        setHasSubmitted(true)
        
        // If perfect match, auto-reveal answer after short delay
        if (similarity >= 100) {
            setTimeout(() => {
                setShowAnswer(true)
                setIsActive(false)
            }, 2000)
        }
    }

    const progressPercentage = Math.max(0, (timeLeft / 10) * 100)
    const isFlashing = progressPercentage <= 10 && progressPercentage > 0

    const renderJokeContent = () => {
        if (joke.type === 'single') {
            return (
                <div className="max-w-2xl mx-auto p-6 text-center">
                    <p className="whitespace-pre-line leading-relaxed text-lg">
                        {joke.text}
                    </p>
                </div>
            )
        }

        if (joke.type === 'qa') {
            return (
                <div className="max-w-2xl mx-auto p-6 text-center space-y-6">
                    <p className="whitespace-pre-line leading-relaxed font-medium text-lg">
                        {joke.question}
                    </p>
                    
                    {!showAnswer ? (
                        <div className="space-y-4">
                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                <div 
                                    className={`h-2 rounded-full transition-all duration-100 ${
                                        isFlashing 
                                            ? 'bg-red-500 animate-pulse' 
                                            : 'bg-blue-500'
                                    }`}
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>

                            {/* User Answer Input */}
                            <div className="space-y-3">
                                <div className="flex gap-2 max-w-md mx-auto">
                                    <input
                                        type="text"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                                        placeholder="Type your answer..."
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={hasSubmitted}
                                    />
                                    <Button 
                                        variant="primary" 
                                        onClick={handleSubmitAnswer}
                                        disabled={!userAnswer.trim() || hasSubmitted}
                                    >
                                        Submit
                                    </Button>
                                </div>
                                
                                {/* Feedback */}
                                {feedback && (
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                            {feedback}
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                            <Button variant="secondary" onClick={handleShowAnswer}>
                                Show Answer ({Math.ceil(timeLeft)}s)
                            </Button>
                        </div>
                    ) : (
                        <p className="whitespace-pre-line leading-relaxed font-medium text-lg bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                            {joke.answer}
                        </p>
                    )}
                </div>
            )
        }

        return null
    }

    return (
        <div className="min-h-screen grid place-items-center bg-white dark:bg-gray-900">
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                    Random Original Joke
                </h1>
                
                <section className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
                    {renderJokeContent()}
                </section>

                <div className="text-center mt-8">
                    <p className="text-gray-600 dark:text-gray-400">
                        Refresh the page to get a new joke!
                    </p>
                </div>
            </div>
        </div>
    )
}