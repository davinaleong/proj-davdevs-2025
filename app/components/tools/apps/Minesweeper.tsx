'use client'

import { useState, useEffect, useCallback } from 'react'
import { RotateCcw, Flag, Bomb } from 'lucide-react'

type Cell = {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  adjacentMines: number
}

type GameState = 'playing' | 'won' | 'lost'

const DIFFICULTIES = {
  beginner: { rows: 9, cols: 9, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert: { rows: 16, cols: 30, mines: 99 }
}

function createBoard(rows: number, cols: number): Cell[][] {
  const newBoard: Cell[][] = []
  for (let row = 0; row < rows; row++) {
    newBoard[row] = []
    for (let col = 0; col < cols; col++) {
      newBoard[row][col] = {
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0
      }
    }
  }
  return newBoard
}

export default function Minesweeper() {
  const [difficulty, setDifficulty] = useState<keyof typeof DIFFICULTIES>('beginner')
  const [board, setBoard] = useState<Cell[][]>(() => {
    const { rows, cols } = DIFFICULTIES.beginner
    return createBoard(rows, cols)
  })
  const [gameState, setGameState] = useState<GameState>('playing')
  const [mineCount, setMineCount] = useState(DIFFICULTIES[difficulty].mines)
  const [firstClick, setFirstClick] = useState(true)

  const initializeBoard = useCallback((rows: number, cols: number) => {
    return createBoard(rows, cols)
  }, [])

  const placeMines = useCallback((board: Cell[][], rows: number, cols: number, mines: number, firstRow: number, firstCol: number) => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })))
    let minesPlaced = 0
    
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows)
      const col = Math.floor(Math.random() * cols)
      
      // Don't place mine on first click or if already a mine
      if (!newBoard[row][col].isMine && !(row === firstRow && col === firstCol)) {
        newBoard[row][col].isMine = true
        minesPlaced++
      }
    }
    
    // Calculate adjacent mine counts
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const newRow = row + dr
              const newCol = col + dc
              if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                if (newBoard[newRow][newCol].isMine) count++
              }
            }
          }
          newBoard[row][col].adjacentMines = count
        }
      }
    }
    
    return newBoard
  }, [])

  function revealCell(board: Cell[][], row: number, col: number): Cell[][] {
    const { rows, cols } = DIFFICULTIES[difficulty]
    const newBoard = board.map(r => r.map(c => ({ ...c })))
    
    if (newBoard[row][col].isFlagged || newBoard[row][col].isRevealed) {
      return newBoard
    }
    
    newBoard[row][col].isRevealed = true
    
    // If it's an empty cell (0 adjacent mines), reveal adjacent cells
    if (newBoard[row][col].adjacentMines === 0 && !newBoard[row][col].isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const newRow = row + dr
          const newCol = col + dc
          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            if (!newBoard[newRow][newCol].isRevealed) {
              const recursiveBoard = revealCell(newBoard, newRow, newCol)
              // Copy the revealed states back
              for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                  newBoard[r][c].isRevealed = recursiveBoard[r][c].isRevealed
                }
              }
            }
          }
        }
      }
    }
    
    return newBoard
  }

  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameState !== 'playing') return
    
    const { rows, cols, mines } = DIFFICULTIES[difficulty]
    
    let newBoard = board
    
    // Handle first click - place mines after first click
    if (firstClick) {
      newBoard = placeMines(board, rows, cols, mines, row, col)
      setFirstClick(false)
    }
    
    if (newBoard[row][col].isFlagged) return
    
    // Check if clicked on mine
    if (newBoard[row][col].isMine) {
      // Reveal all mines
      newBoard = newBoard.map(r => r.map(c => c.isMine ? { ...c, isRevealed: true } : c))
      setBoard(newBoard)
      setGameState('lost')
      return
    }
    
    // Reveal the cell
    newBoard = revealCell(newBoard, row, col)
    setBoard(newBoard)
    
    // Check win condition
    const totalCells = rows * cols
    const revealedCells = newBoard.flat().filter(cell => cell.isRevealed).length
    if (revealedCells === totalCells - mines) {
      setGameState('won')
    }
  }, [board, gameState, difficulty, firstClick, placeMines])

  const handleCellRightClick = useCallback((e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault()
    if (gameState !== 'playing' || board[row][col].isRevealed) return
    
    const newBoard = board.map(r => r.map(c => ({ ...c })))
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged
    
    const flaggedCount = newBoard.flat().filter(cell => cell.isFlagged).length
    setMineCount(DIFFICULTIES[difficulty].mines - flaggedCount)
    setBoard(newBoard)
  }, [board, gameState, difficulty])

  const resetGame = useCallback(() => {
    const { rows, cols, mines } = DIFFICULTIES[difficulty]
    setBoard(initializeBoard(rows, cols))
    setGameState('playing')
    setMineCount(mines)
    setFirstClick(true)
  }, [difficulty, initializeBoard])

  const changeDifficulty = useCallback((newDifficulty: keyof typeof DIFFICULTIES) => {
    setDifficulty(newDifficulty)
    const { rows, cols, mines } = DIFFICULTIES[newDifficulty]
    setBoard(initializeBoard(rows, cols))
    setGameState('playing')
    setMineCount(mines)
    setFirstClick(true)
  }, [initializeBoard])

  const getCellDisplay = (cell: Cell) => {
    if (cell.isFlagged) return <Flag size={16} className="text-red-500" />
    if (!cell.isRevealed) return ''
    if (cell.isMine) return <Bomb size={16} className="text-red-600" />
    return cell.adjacentMines > 0 ? cell.adjacentMines : ''
  }

  const getCellClassName = (cell: Cell) => {
    let className = 'w-8 h-8 border border-gray-400 flex items-center justify-center text-sm font-bold select-none cursor-pointer '
    
    if (cell.isRevealed) {
      if (cell.isMine) {
        className += 'bg-red-500 text-white'
      } else {
        className += 'bg-gray-200 dark:bg-gray-600 '
        // Color code numbers
        if (cell.adjacentMines === 1) className += 'text-blue-600'
        else if (cell.adjacentMines === 2) className += 'text-green-600'
        else if (cell.adjacentMines === 3) className += 'text-red-600'
        else if (cell.adjacentMines === 4) className += 'text-purple-600'
        else if (cell.adjacentMines === 5) className += 'text-yellow-600'
        else if (cell.adjacentMines === 6) className += 'text-pink-600'
        else if (cell.adjacentMines === 7) className += 'text-black dark:text-white'
        else if (cell.adjacentMines === 8) className += 'text-gray-600'
      }
    } else {
      className += 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
      if (cell.isFlagged) {
        className += ' bg-yellow-200 dark:bg-yellow-800'
      }
    }
    
    return className
  }

  const { rows, cols } = DIFFICULTIES[difficulty]

  return (
    <div className="minesweeper-component max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Minesweeper</h1>
        
        {/* Difficulty Selection */}
        <div className="flex gap-2 mb-4">
          {Object.keys(DIFFICULTIES).map((diff) => (
            <button
              key={diff}
              onClick={() => changeDifficulty(diff as keyof typeof DIFFICULTIES)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                difficulty === diff
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Game Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Flag size={20} className="text-red-500" />
            <span className="font-mono text-lg font-bold">
              {mineCount.toString().padStart(3, '0')}
            </span>
          </div>
          
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <RotateCcw size={16} />
            New Game
          </button>
          
          <div className="text-lg font-bold">
            {gameState === 'won' && <span className="text-green-600">You Won! 🎉</span>}
            {gameState === 'lost' && <span className="text-red-600">Game Over 💥</span>}
            {gameState === 'playing' && <span className="text-gray-600 dark:text-gray-400">Playing...</span>}
          </div>
        </div>
      </div>
      
      {/* Game Board */}
      <div 
        className="inline-block border-2 border-gray-500 bg-gray-100 dark:bg-gray-800 p-2"
        style={{ 
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          maxWidth: 'fit-content'
        }}
      >
        <div 
          className="grid gap-0"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={getCellClassName(cell)}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
                disabled={gameState !== 'playing'}
              >
                {getCellDisplay(cell)}
              </button>
            ))
          )}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        <p><strong>How to play:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Left click to reveal a cell</li>
          <li>Right click to flag/unflag a cell</li>
          <li>Numbers show how many mines are adjacent to that cell</li>
          <li>Flag all mines and reveal all safe cells to win</li>
        </ul>
      </div>
    </div>
  )
}