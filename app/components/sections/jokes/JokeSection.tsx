'use client'

import { useState, useEffect } from 'react'
import { Check, Eye } from 'lucide-react'
import { type Joke, getRandomJoke } from './../../../utils/jokes'
import Section from './../../Section'
import Button from './../../Button'

export default function JokeSection() {
    const [joke] = useState<Joke>(() => getRandomJoke())
    const [showAnswer, setShowAnswer] = useState(false)
    const [timeLeft, setTimeLeft] = useState(30) // 30 seconds countdown
    const [userAnswer, setUserAnswer] = useState('')
    const [feedback, setFeedback] = useState('')
    const [feedbackClass, setFeedbackClass] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)

    // Derive isActive from current state instead of managing it separately
    const isActive = joke.type === 'qa' && !showAnswer

    // Timer countdown logic
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(time => {
                    const newTime = time - 0.1
                    // Auto-reveal answer when timer reaches 0
                    if (newTime <= 0 && joke.type === 'qa' && !showAnswer) {
                        setTimeout(() => setShowAnswer(true), 0)
                    }
                    return newTime
                })
            }, 100)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isActive, timeLeft, joke.type, showAnswer])

    const handleShowAnswer = () => {
        setShowAnswer(true)
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

    const getFeedbackMessage = (similarity: number): { message: string, className: string } => {
        if (similarity >= 100) return {
            message: "Excellent! That's the correct answer.",
            className: "text-white bg-green-500"
        }
        if (similarity >= 80) return {
            message: "Very close! You're almost there.",
            className: "text-black bg-lime-500"
        }
        if (similarity >= 60) return {
            message: "Good attempt! You're on the right track.",
            className: "text-black bg-yellow-400"
        }
        if (similarity >= 40) return {
            message: "Getting warmer, but not quite right.",
            className: "text-black bg-amber-400"
        }
        if (similarity >= 20) return {
            message: "Not quite there yet. Try a different approach.",
            className: "text-white bg-orange-400"
        }
        return {
            message: "That's not it, but keep trying!",
            className: "text-white bg-red-400"
        }
    }

    const handleSubmitAnswer = () => {
        if (!userAnswer.trim() || !joke.answer) return
        
        const similarity = calculateSimilarity(userAnswer, joke.answer)
        const feedbackData = getFeedbackMessage(similarity)
        setFeedback(feedbackData.message)
        setFeedbackClass(feedbackData.className)
        setHasSubmitted(true)
        
        // If perfect match, auto-reveal answer after short delay
        if (similarity >= 100) {
            setTimeout(() => {
                setShowAnswer(true)
            }, 2000)
        }
    }

    const progressPercentage = Math.max(0, (timeLeft / 30) * 100)
    const isFlashing = progressPercentage <= 10 && progressPercentage > 0

    const renderJokeContent = () => {
        if (joke.type === 'single') {
            return (
                <div className="max-w-2xl mx-auto p-6 text-center">
                    <p className="whitespace-pre-line leading-relaxed text-xl">
                        {joke.text}
                    </p>
                </div>
            )
        }

        if (joke.type === 'qa') {
            return (
                <div className="max-w-2xl mx-auto p-6 text-center space-y-6">
                    <p className="whitespace-pre-line leading-relaxed font-medium text-xl">
                        {joke.question}
                    </p>
                    
                    <div className="space-y-4">
                        {/* Progress Bar */}
                        {!showAnswer && (
                            <div className="w-full bg-white/20 rounded-full h-2 border border-white/30">
                                <div 
                                    className={`h-2 rounded-full transition-all duration-100 ${
                                        isFlashing 
                                            ? 'bg-red-400 animate-pulse' 
                                            : 'bg-white'
                                    }`}
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        )}

                        {!showAnswer ? (
                            <div className="space-y-4">
                                {/* User Answer Input */}
                                <div className="space-y-3">
                                    <div className="flex gap-2 max-w-md bg-white rounded-sm p-2 mx-auto">
                                        <input
                                            type="text"
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSubmitAnswer()}
                                            placeholder="Type your answer..."
                                            className="flex-1 text-black"
                                            disabled={hasSubmitted}
                                        />
                                        <Button 
                                            variant="secondary" 
                                            onClick={handleSubmitAnswer}
                                            className="shadow-none"
                                            disabled={!userAnswer.trim() || hasSubmitted}
                                        >
                                            <span>Submit</span>
                                            <Check size={16} />
                                        </Button>
                                    </div>
                                    
                                    {/* Feedback */}
                                    {feedback && (
                                        <div className={`rounded-sm p-3 font-medium ${feedbackClass}`}>
                                            <p>
                                                {feedback}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                
                                <Button variant="secondary" onClick={handleShowAnswer}>
                                    <span>Show Answer ({Math.ceil(timeLeft)}s)</span>
                                    <Eye size={16} />
                                </Button>
                            </div>
                        ) : null}

                        {/* Show Answer when revealed */}
                        {showAnswer && (
                            <div className="space-y-3">
                                <p className="whitespace-pre-line rounded-sm text-2xl lg:text-4xl font-semibold text-black bg-white p-6">
                                    {joke.answer}
                                </p>
                                {joke.explanation && (
                                    <p className="flex gap-2 text-sm italic">
                                        <span>Explanation:</span>
                                        <span>{joke.explanation}</span>
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )
        }

        return null
    }

    return (
        <Section variant="primary">
            <article className="container mx-auto py-8 flow">
                <header>
                    <h1 className="text-4xl lg:text-6xl font-bold text-center">Random Original Joke</h1>
                </header>

                {renderJokeContent()}

                <footer className="text-center flow">
                    <p>Refresh the page to get a new joke!</p>
                    <p className="text-sm italic">
                        Disclaimer: All jokes presented herein are believed to be original content to the best of our knowledge. 
                        Any resemblance to existing material is unintentional. If you believe any content infringes upon your 
                        intellectual property rights, please contact us for immediate review and removal.
                    </p>
                </footer>
            </article>
        </Section>
    )
}