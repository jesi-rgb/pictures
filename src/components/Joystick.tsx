import { useRef, useState, useEffect } from 'react'

interface JoystickProps {
  onMove: (deltaX: number, deltaY: number) => void
}

export function Joystick({ onMove }: JoystickProps) {
  const joystickRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const element = joystickRef.current
    if (!element) return

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      setIsDragging(true)
      const touch = e.touches[0]
      startPosRef.current = { x: touch.clientX, y: touch.clientY }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging && e.touches.length === 0) return
      e.preventDefault()

      const touch = e.touches[0]
      const deltaX = touch.clientX - startPosRef.current.x
      const deltaY = touch.clientY - startPosRef.current.y

      // Normalize the delta values (scale them down for smoother movement)
      const scaleFactor = 0.5
      onMove(deltaX * scaleFactor, deltaY * scaleFactor)

      // Update start position for continuous movement
      startPosRef.current = { x: touch.clientX, y: touch.clientY }
    }

    const handleTouchEnd = () => {
      setIsDragging(false)
    }

    element.addEventListener('touchstart', handleTouchStart, { passive: false })
    element.addEventListener('touchmove', handleTouchMove, { passive: false })
    element.addEventListener('touchend', handleTouchEnd)

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, onMove])

  // Generate dot positions
  const dots = []
  const gridSize = 16
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      dots.push({ row, col })
    }
  }

  return (
    <div
      ref={joystickRef}
      className={`fixed border-subtle z-10 bg-linear-to-br from-primary/30 backdrop-blur-md border bottom-8 right-8 w-32 h-32 rounded-xl touch-none transition-all ${isDragging ? 'scale-105' : ''
        }`}
      style={{
        touchAction: 'none',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Dot grid */}
        {dots.map(({ row, col }) => (
          <div
            className="bg-muted"
            key={`${row}-${col}`}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              borderRadius: '50%',
              left: `${(col / (gridSize - 1)) * 85 + 7.5}%`,
              top: `${(row / (gridSize - 1)) * 85 + 7.5}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
