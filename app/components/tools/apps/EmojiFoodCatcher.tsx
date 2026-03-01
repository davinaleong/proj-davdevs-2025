'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, RotateCcw, Play, Pause } from 'lucide-react'

type FoodItem = {
  id: string
  emoji: string
  x: number
  y: number
  type: 'healthy' | 'junk' | 'powerup'
  points: number
  speed: number
  effect?: 'extraPoints' | 'slowDown' | 'enlargeBasket' | 'extraLife' | 'barrier'
}

type GameState = 'menu' | 'countdown' | 'playing' | 'paused' | 'gameOver'

type PowerUpState = {
  slowDown: number
  largeBasket: number
  barrier: number
}

const HEALTHY_FOODS = [
  { emoji: '🍎', points: 10 }, { emoji: '🍌', points: 10 }, { emoji: '🥕', points: 15 },
  { emoji: '🥦', points: 15 }, { emoji: '🍓', points: 12 }, { emoji: '🥬', points: 18 },
  { emoji: '🫐', points: 14 }, { emoji: '🍊', points: 10 }, { emoji: '🥒', points: 12 },
  { emoji: '🍇', points: 11 }
]

const JUNK_FOODS = [
  { emoji: '🍟', points: -15 }, { emoji: '🍕', points: -20 }, { emoji: '🍔', points: -25 },
  { emoji: '🍩', points: -18 }, { emoji: '🍪', points: -12 }, { emoji: '🧁', points: -16 },
  { emoji: '🍰', points: -22 }, { emoji: '🥤', points: -10 }
]

const POWER_UPS = [
  { emoji: '⭐', points: 50, effect: 'extraPoints' as const },
  { emoji: '⏰', points: 0, effect: 'slowDown' as const },
  { emoji: '📏', points: 0, effect: 'enlargeBasket' as const },
  { emoji: '💖', points: 0, effect: 'extraLife' as const },
  { emoji: '🛡️', points: 0, effect: 'barrier' as const }
]

const DIFFICULTIES = {
  easy: { name: 'Easy', spawnRate: 0.02, baseSpeed: 2, speedIncrease: 0.001 },
  medium: { name: 'Medium', spawnRate: 0.025, baseSpeed: 3, speedIncrease: 0.002 },
  hard: { name: 'Hard', spawnRate: 0.03, baseSpeed: 4, speedIncrease: 0.003 }
}

const REACTION_EMOJIS = {
  healthy: ['😊', '👍', '💚', '🌟'],
  junk: ['😰', '👎', '💔', '😵'],
  powerup: ['🎉', '✨', '🚀', '💫']
}

export default function EmojiFoodCatcher() {
  const [gameState, setGameState] = useState<GameState>('menu')
  const [difficulty, setDifficulty] = useState<keyof typeof DIFFICULTIES>('medium')
  const [countdown, setCountdown] = useState(3)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [basketX, setBasketX] = useState(50) // percentage
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [powerUps, setPowerUps] = useState<PowerUpState>({ slowDown: 0, largeBasket: 0, barrier: 0 })
  const [reactionEmoji, setReactionEmoji] = useState<string>('')
  const [gameTime, setGameTime] = useState(0)

  const gameAreaRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const gameTimeRef = useRef(0)

  const basketSize = powerUps.largeBasket > 0 ? 120 : 80
  const currentSpeed = powerUps.slowDown > 0 ? 0.5 : 1

  const spawnFood = useCallback(() => {
    const config = DIFFICULTIES[difficulty]
    if (Math.random() < config.spawnRate) {
      const rand = Math.random()
      let foodData: { emoji: string; points: number; type: FoodItem['type']; effect?: FoodItem['effect'] }
      
      if (rand < 0.15) {
        // 15% chance for power-up
        const powerup = POWER_UPS[Math.floor(Math.random() * POWER_UPS.length)]
        foodData = { ...powerup, type: 'powerup' }
      } else if (rand < 0.65) {
        // 50% chance for healthy food
        const healthy = HEALTHY_FOODS[Math.floor(Math.random() * HEALTHY_FOODS.length)]
        foodData = { ...healthy, type: 'healthy' }
      } else {
        // 35% chance for junk food
        const junk = JUNK_FOODS[Math.floor(Math.random() * JUNK_FOODS.length)]
        foodData = { ...junk, type: 'junk' }
      }

      const newFood: FoodItem = {
        id: Math.random().toString(36).substr(2, 9),
        emoji: foodData.emoji,
        x: Math.random() * 90 + 5, // 5-95% to avoid edges
        y: -10,
        type: foodData.type,
        points: foodData.points,
        speed: (config.baseSpeed + gameTime * config.speedIncrease) * currentSpeed,
        effect: foodData.effect
      }

      setFoodItems(prev => [...prev, newFood])
    }
  }, [difficulty, gameTime, currentSpeed])

  const moveBasket = useCallback((direction: 'left' | 'right') => {
    setBasketX(prev => {
      if (direction === 'left') return Math.max(0, prev - 5)
      return Math.min(90, prev + 5)
    })
  }, [])

  const showReaction = useCallback((type: keyof typeof REACTION_EMOJIS) => {
    const reactions = REACTION_EMOJIS[type]
    const reaction = reactions[Math.floor(Math.random() * reactions.length)]
    setReactionEmoji(reaction)
    setTimeout(() => setReactionEmoji(''), 1000)
  }, [])

  const handleGameOver = useCallback(() => {
    setGameState('gameOver')
    setHighScore(prev => Math.max(prev, score))
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [score])

  const loseLife = useCallback(() => {
    setLives(prev => {
      const nextLives = prev - 1
      if (nextLives <= 0) {
        handleGameOver()
        return 0
      }
      return nextLives
    })
  }, [handleGameOver])

  const applyPowerUp = useCallback((effect: FoodItem['effect']) => {
    switch (effect) {
      case 'slowDown':
        setPowerUps(prev => ({ ...prev, slowDown: 300 })) // 5 seconds at 60fps
        break
      case 'enlargeBasket':
        setPowerUps(prev => ({ ...prev, largeBasket: 300 }))
        break
      case 'extraLife':
        setLives(prev => Math.min(5, prev + 1))
        break
      case 'barrier':
        setPowerUps(prev => ({ ...prev, barrier: 180 })) // 3 seconds
        break
    }
  }, [])

  const checkCollisions = useCallback(() => {
    setFoodItems(prev => {
      const remaining: FoodItem[] = []
      
      prev.forEach(food => {
        const basketCenter = basketX + 5 // Account for centering offset
        const basketWidth = basketSize > 80 ? 12 : 10 // Basket width in percentage
        const basketLeft = basketCenter - basketWidth / 2
        const basketRight = basketCenter + basketWidth / 2
        const basketTop = 82 // basket position from top (slightly higher for better feel)
        
        // Check collision with basket
        if (
          food.x >= basketLeft &&
          food.x <= basketRight &&
          food.y >= basketTop &&
          food.y <= 95
        ) {
          // Collision detected
          setScore(s => Math.max(0, s + food.points))
          showReaction(food.type)
          
          if (food.effect) {
            applyPowerUp(food.effect)
          }
          
          if (food.type === 'junk' && food.points < 0) {
            loseLife()
          }
        }
        // Check if food hit the barrier
        else if (powerUps.barrier > 0 && food.y >= 75 && food.y <= 80) {
          // Bounce the food back up
          remaining.push({ ...food, y: food.y - food.speed * 2, speed: food.speed * 0.8 })
        }
        // Check if food fell off screen
        else if (food.y > 100) {
          if (food.type === 'healthy') {
            loseLife() // Lose life for missing healthy food
          }
        }
        // Keep food that hasn't collided or fallen off
        else if (food.y <= 100) {
          remaining.push({ ...food, y: food.y + food.speed })
        }
      })
      
      return remaining
    })
  }, [basketX, basketSize, powerUps.barrier, showReaction, applyPowerUp, loseLife])

  const runGameTick = useCallback(() => {
    if (gameState === 'playing') {
      gameTimeRef.current += 1
      setGameTime(gameTimeRef.current)
      
      spawnFood()
      checkCollisions()
      
      // Update power-up timers
      setPowerUps(prev => ({
        slowDown: Math.max(0, prev.slowDown - 1),
        largeBasket: Math.max(0, prev.largeBasket - 1),
        barrier: Math.max(0, prev.barrier - 1)
      }))
    }
  }, [gameState, spawnFood, checkCollisions])

  const startGame = useCallback(() => {
    setGameState('countdown')
    setCountdown(3)
    setScore(0)
    setLives(3)
    setBasketX(50)
    setFoodItems([])
    setPowerUps({ slowDown: 0, largeBasket: 0, barrier: 0 })
    setReactionEmoji('')
    gameTimeRef.current = 0
    setGameTime(0)
  }, [])

  const pauseGame = useCallback(() => {
    setGameState(prev => prev === 'playing' ? 'paused' : 'playing')
  }, [])

  const resetGame = useCallback(() => {
    setGameState('menu')
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  // Handle mouse movement
  useEffect(() => {
    const gameArea = gameAreaRef.current

    const handleMouseMove = (e: MouseEvent) => {
      if (gameState === 'playing' && gameArea) {
        const rect = gameArea.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        // Center the basket on the mouse cursor
        setBasketX(Math.max(0, Math.min(85, x - 5))) // 5% offset for centering
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (gameState === 'playing' && gameArea) {
        e.preventDefault()
        const rect = gameArea.getBoundingClientRect()
        const touch = e.touches[0]
        const x = ((touch.clientX - rect.left) / rect.width) * 100
        // Center the basket on the touch point
        setBasketX(Math.max(0, Math.min(85, x - 5))) // 5% offset for centering
      }
    }

    if (gameArea) {
      gameArea.addEventListener('mousemove', handleMouseMove)
      gameArea.addEventListener('touchmove', handleTouchMove)
    }

    return () => {
      if (gameArea) {
        gameArea.removeEventListener('mousemove', handleMouseMove)
        gameArea.removeEventListener('touchmove', handleTouchMove)
      }
    }
  }, [gameState, basketSize])

  // Game loop
  useEffect(() => {
    if (gameState === 'playing') {
      const frame = () => {
        runGameTick()
        animationFrameRef.current = requestAnimationFrame(frame)
      }
      animationFrameRef.current = requestAnimationFrame(frame)
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameState, runGameTick])

  // Countdown timer
  useEffect(() => {
    if (gameState === 'countdown') {
      const timer = setTimeout(() => {
        if (countdown > 1) {
          setCountdown(prev => prev - 1)
        } else {
          setGameState('playing')
        }
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [gameState, countdown])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState === 'playing') {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          moveBasket('left')
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          moveBasket('right')
        } else if (e.key === ' ') {
          e.preventDefault()
          pauseGame()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState, moveBasket, pauseGame])

  if (gameState === 'menu') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] bg-gradient-to-b from-blue-400 to-green-400 rounded-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">🍎 Emoji Food Catcher</h1>
        <p className="text-lg mb-8 text-center max-w-md">
          Catch healthy foods to score points! Avoid junk food or lose lives. 
          Collect power-ups for special effects!
        </p>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Difficulty:</label>
          <select 
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as keyof typeof DIFFICULTIES)}
            className="bg-white/20 text-white rounded px-3 py-1 backdrop-blur"
          >
            {Object.entries(DIFFICULTIES).map(([key, config]) => (
              <option key={key} value={key} className="text-black">{config.name}</option>
            ))}
          </select>
        </div>
        
        {highScore > 0 && (
          <p className="text-xl mb-4">High Score: {highScore}</p>
        )}
        
        <button 
          onClick={startGame}
          className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg text-lg font-medium transition-colors backdrop-blur"
        >
          🎮 Start Game
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="relative w-full h-[600px] bg-gradient-to-b from-sky-300 to-green-300 rounded-lg overflow-hidden cursor-none select-none"
        style={{ touchAction: 'none' }}
      >
        {/* Barrier effect */}
        {powerUps.barrier > 0 && (
          <div 
            className="absolute w-full h-2 bg-yellow-400/70 animate-pulse"
            style={{ top: '75%' }}
          />
        )}
        
        {/* Food items */}
        {foodItems.map(food => (
          <div
            key={food.id}
            className="absolute text-6xl transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${food.x}%`,
              top: `${food.y}%`,
            }}
          >
            {food.emoji}
          </div>
        ))}
        
        {/* Basket */}
        <div
          className="absolute transform -translate-x-1/2 pointer-events-none"
          style={{
            left: `${basketX + basketSize / 16}%`,
            top: '85%',
            fontSize: basketSize > 80 ? '4rem' : '3rem'
          }}
        >
          🧺
        </div>
        
        {/* Reaction emoji */}
        {reactionEmoji && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl animate-bounce pointer-events-none z-10">
            {reactionEmoji}
          </div>
        )}
        
        {/* Game UI Overlay */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start text-white z-10">
          <div className="bg-black/50 rounded-lg p-3 backdrop-blur">
            <div className="text-lg font-bold">Score: {score}</div>
            <div className="flex items-center gap-1">
              Lives: {Array.from({ length: lives }, () => '💖').join('')}
            </div>
            {highScore > 0 && <div className="text-sm">Best: {highScore}</div>}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={pauseGame}
              className="bg-black/50 hover:bg-black/70 p-3 rounded-lg backdrop-blur transition-colors"
            >
              {gameState === 'playing' ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button 
              onClick={resetGame}
              className="bg-black/50 hover:bg-black/70 p-3 rounded-lg backdrop-blur transition-colors"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
        
        {/* Power-up indicators */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {powerUps.slowDown > 0 && (
            <div className="bg-blue-500/80 text-white px-2 py-1 rounded text-sm backdrop-blur">
              ⏰ Slow Motion: {Math.ceil(powerUps.slowDown / 60)}s
            </div>
          )}
          {powerUps.largeBasket > 0 && (
            <div className="bg-green-500/80 text-white px-2 py-1 rounded text-sm backdrop-blur">
              📏 Big Basket: {Math.ceil(powerUps.largeBasket / 60)}s
            </div>
          )}
          {powerUps.barrier > 0 && (
            <div className="bg-yellow-500/80 text-white px-2 py-1 rounded text-sm backdrop-blur">
              🛡️ Barrier: {Math.ceil(powerUps.barrier / 60)}s
            </div>
          )}
        </div>
        
        {/* Touch controls for mobile */}
        <div className="absolute bottom-4 right-4 flex gap-2 md:hidden">
          <button 
            onTouchStart={() => moveBasket('left')}
            className="bg-black/50 hover:bg-black/70 p-4 rounded-lg backdrop-blur transition-colors"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <button 
            onTouchStart={() => moveBasket('right')}
            className="bg-black/50 hover:bg-black/70 p-4 rounded-lg backdrop-blur transition-colors"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </div>
        
        {/* Countdown overlay */}
        {gameState === 'countdown' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur z-20 cursor-auto">
            <div className="text-center">
              <div className="text-8xl font-bold text-white mb-4 animate-pulse">
                {countdown === 3 && '3'}
                {countdown === 2 && '2'}
                {countdown === 1 && '1'}
              </div>
              <div className="text-2xl text-white font-medium">
                {countdown === 3 && 'Get Ready!'}
                {countdown === 2 && 'Set...'}
                {countdown === 1 && 'GO! 🎮'}
              </div>
            </div>
          </div>
        )}

        {/* Pause overlay */}
        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur z-20 cursor-auto">
            <div className="bg-white rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Game Paused</h2>
              <button 
                onClick={pauseGame}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Resume
              </button>
            </div>
          </div>
        )}
        
        {/* Game Over overlay */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur z-20 cursor-auto">
            <div className="bg-white rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Game Over! 😵</h2>
              <p className="text-lg mb-2 text-gray-600">Final Score: {score}</p>
              {score === highScore && score > 0 && (
                <p className="text-sm text-green-600 mb-4">🎉 New High Score!</p>
              )}
              <div className="flex gap-3">
                <button 
                  onClick={startGame}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Play Again
                </button>
                <button 
                  onClick={resetGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Menu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p><strong>Controls:</strong> Move mouse/touch to control basket, Arrow keys or A/D, Space to pause</p>
        <p><strong>Scoring:</strong> 🍎 Healthy food = points, 🍟 Junk food = lose life, ⭐ Power-ups = special effects</p>
      </div>
    </div>
  )
}