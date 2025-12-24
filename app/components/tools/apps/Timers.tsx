'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowUp, ArrowDown, Clock, Play, Pause, RotateCcw, Volume2 } from "lucide-react"
import ToolPanel from "../components/ToolPanel"
import Input from "../../Input"
import Group from "../../Group"
import Label from "../../Label"
import Button from "../../Button"
import DropdownMenu from "../../DropdownMenu"
import timerPresets from "../../../data/timer-presets.json"
import timerSounds from "../../../data/timer-sounds.json"

interface TimeState {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Timers() {
  const [isCountdown, setIsCountdown] = useState(true)
  const [time, setTime] = useState<TimeState>({ days: 0, hours: 0, minutes: 25, seconds: 0 })
  const [currentTime, setCurrentTime] = useState<TimeState>({ days: 0, hours: 0, minutes: 25, seconds: 0 })
  const [targetTime, setTargetTime] = useState<TimeState>({ days: 0, hours: 0, minutes: 1, seconds: 0 })
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState("pomodoro")
  const [selectedSound, setSelectedSound] = useState("bell")
  const [isFlashing, setIsFlashing] = useState(false)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio()
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const playSound = useCallback(() => {
    if (selectedSound !== "none" && audioRef.current) {
      // Create a simple beep sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 1)
    }
  }, [selectedSound])

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const totalSeconds = prev.days * 86400 + prev.hours * 3600 + prev.minutes * 60 + prev.seconds
          
          if (isCountdown) {
            if (totalSeconds <= 1) {
              // Timer finished
              setIsRunning(false)
              setIsFinished(true)
              setIsFlashing(true)
              playSound()
              // Stop flashing after 3 seconds
              setTimeout(() => setIsFlashing(false), 3000)
              return { days: 0, hours: 0, minutes: 0, seconds: 0 }
            }
            
            const newTotal = totalSeconds - 1
            return {
              days: Math.floor(newTotal / 86400),
              hours: Math.floor((newTotal % 86400) / 3600),
              minutes: Math.floor((newTotal % 3600) / 60),
              seconds: newTotal % 60
            }
          } else {
            // Count up - check if we've reached the target
            const targetSeconds = targetTime.days * 86400 + targetTime.hours * 3600 + targetTime.minutes * 60 + targetTime.seconds
            
            if (targetSeconds > 0 && totalSeconds >= targetSeconds) {
              // Target reached
              setIsRunning(false)
              setIsFinished(true)
              setIsFlashing(true)
              playSound()
              // Stop flashing after 3 seconds
              setTimeout(() => setIsFlashing(false), 3000)
              return {
                days: targetTime.days,
                hours: targetTime.hours,
                minutes: targetTime.minutes,
                seconds: targetTime.seconds
              }
            }
            
            const newTotal = totalSeconds + 1
            return {
              days: Math.floor(newTotal / 86400),
              hours: Math.floor((newTotal % 86400) / 3600),
              minutes: Math.floor((newTotal % 3600) / 60),
              seconds: newTotal % 60
            }
          }
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, isCountdown, playSound, targetTime.days, targetTime.hours, targetTime.minutes, targetTime.seconds])

  const handleTimeChange = (field: keyof TimeState, value: string) => {
    const numValue = Math.max(0, parseInt(value) || 0)
    const newTime = { ...time, [field]: numValue }
    setTime(newTime)
    
    if (!isRunning) {
      if (isCountdown) {
        setCurrentTime(newTime)
      } else {
        // For stopwatch, update target time
        setTargetTime(newTime)
      }
      setIsFinished(false)
    }
  }

  const handlePresetChange = (presetValue: string) => {
    setSelectedPreset(presetValue)
    const preset = timerPresets.find(p => p.value === presetValue)
    if (preset) {
      const newTime = {
        days: preset.days,
        hours: preset.hours,
        minutes: preset.minutes,
        seconds: preset.seconds
      }
      
      if (isCountdown) {
        setTime(newTime)
        if (!isRunning) {
          setCurrentTime(newTime)
          setIsFinished(false)
        }
      } else {
        // For stopwatch, set as target and reset current to 0
        setTargetTime(newTime)
        if (!isRunning) {
          setCurrentTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
          setIsFinished(false)
        }
      }
    }
  }

  const toggleDirection = () => {
    const newIsCountdown = !isCountdown
    setIsCountdown(newIsCountdown)
    setIsFinished(false)
    setIsFlashing(false)
    
    if (!isRunning) {
      if (newIsCountdown) {
        // Switch to countdown: use time as current time
        setCurrentTime(time)
      } else {
        // Switch to stopwatch: reset current to 0, set time as target
        setTargetTime(time)
        setCurrentTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }
  }

  const handleStart = () => {
    setIsRunning(true)
    setIsFinished(false)
    setIsFlashing(false)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setIsFinished(false)
    setIsFlashing(false)
    
    if (isCountdown) {
      setCurrentTime(time)
    } else {
      // Reset stopwatch to 0
      setCurrentTime({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    }
  }

  const formatTime = (time: TimeState) => {
    const parts = []
    if (time.days > 0) parts.push(`${time.days}d`)
    if (time.hours > 0 || time.days > 0) parts.push(`${time.hours.toString().padStart(2, '0')}h`)
    parts.push(`${time.minutes.toString().padStart(2, '0')}m`)
    parts.push(`${time.seconds.toString().padStart(2, '0')}s`)
    return parts.join(' ')
  }

  return (
    <ToolPanel title="Timers" description="Simple timers for countdowns to deadlines and tracking elapsed time." icon={Clock}>
      <div className="space-y-6">
        {/* Timer Display */}
        <div className={`text-center p-6 rounded-sm border-2 transition-colors ${
          isFlashing 
            ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
            : 'border-gray-200 dark:border-gray-700'
        }`}>
          <div className={`text-4xl lg:text-6xl font-mono font-bold ${
            isFinished ? 'text-red-500' : 'text-gray-900 dark:text-white'
          }`}>
            {formatTime(currentTime)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {isCountdown ? 'Countdown Timer' : 'Stopwatch'} {isRunning ? '(Running)' : '(Stopped)'}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <Button 
            onClick={isRunning ? handlePause : handleStart}
            variant={isRunning ? "secondary" : "primary"}
            disabled={isCountdown && currentTime.days === 0 && currentTime.hours === 0 && currentTime.minutes === 0 && currentTime.seconds === 0}
          >
            {isRunning ? <Pause size={16} /> : <Play size={16} />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={handleReset} variant="secondary">
            <RotateCcw size={16} />
            Reset
          </Button>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Timer Direction */}
          <Group>
            <Label className="block text-sm font-semibold mb-2">Timer Type</Label>
            <Button 
              onClick={toggleDirection}
              variant={isCountdown ? "primary" : "secondary"}
              className="w-full justify-center"
              disabled={isRunning}
            >
              {isCountdown ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
              {isCountdown ? 'Countdown' : 'Stopwatch'}
            </Button>
          </Group>

          {/* Sound Selection */}
          <Group>
            <Label className="block text-sm font-semibold mb-2">
              <Volume2 size={16} className="inline mr-1" />
              Alert Sound
            </Label>
            <DropdownMenu
              options={timerSounds}
              value={selectedSound}
              onChange={setSelectedSound}
              placeholder="Select sound"
            />
          </Group>
        </div>

        {/* Presets */}
        <Group>
          <Label className="block text-sm font-semibold mb-2">
            {isCountdown ? 'Countdown Presets' : 'Stopwatch Targets'}
          </Label>
          <DropdownMenu
            options={timerPresets.filter(preset => preset.type === (isCountdown ? 'countdown' : 'stopwatch'))}
            value={selectedPreset}
            onChange={handlePresetChange}
            placeholder={isCountdown ? "Select countdown preset" : "Select target time"}
          />
        </Group>

        {/* Manual Time Input */}
        <div>
          <Label className="block text-sm font-semibold mb-2">Manual Time Setting</Label>
          <div className="flex items-end gap-4 justify-center">
            <Group className="flex flex-col items-center">
              <Label className="text-xs font-medium mb-1" htmlFor="days">Days</Label>
              <Input 
                name="days" 
                type="number" 
                value={time.days || ''}
                onChange={(e) => handleTimeChange('days', e.target.value)}
                className="w-16 text-lg font-bold text-center" 
                min={0} 
                step={1}
                disabled={isRunning}
              />
            </Group>

            <Group className="flex flex-col items-center">
              <Label className="text-xs font-medium mb-1" htmlFor="hours">Hours</Label>
              <Input 
                name="hours" 
                type="number" 
                value={time.hours || ''}
                onChange={(e) => handleTimeChange('hours', e.target.value)}
                className="w-16 text-lg font-bold text-center" 
                min={0} 
                max={23}
                step={1}
                disabled={isRunning}
              />
            </Group>

            <Group className="flex flex-col items-center">
              <Label className="text-xs font-medium mb-1" htmlFor="minutes">Minutes</Label>
              <Input 
                name="minutes" 
                type="number" 
                value={time.minutes || ''}
                onChange={(e) => handleTimeChange('minutes', e.target.value)}
                className="w-16 text-lg font-bold text-center" 
                min={0} 
                max={59}
                step={1}
                disabled={isRunning}
              />
            </Group>

            <Group className="flex flex-col items-center">
              <Label className="text-xs font-medium mb-1" htmlFor="seconds">Seconds</Label>
              <Input 
                name="seconds" 
                type="number" 
                value={time.seconds || ''}
                onChange={(e) => handleTimeChange('seconds', e.target.value)}
                className="w-16 text-lg font-bold text-center" 
                min={0} 
                max={59}
                step={1}
                disabled={isRunning}
              />
            </Group>
          </div>
        </div>
      </div>
    </ToolPanel>
  )
}