'use client'

import Image from 'next/image'
import { useState, useRef, MouseEvent, useEffect } from 'react'
import { Joystick } from './Joystick'

interface ZoomableImageProps {
  src: string
  alt: string
}

export function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const [isZoomEnabled, setIsZoomEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [isMobile, setIsMobile] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(200)
  const imageRef = useRef<HTMLDivElement>(null)
  const speed = 1

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isZoomEnabled || isMobile) return

    const handleWheel = (e: WheelEvent) => {
      // Prevent all wheel/trackpad gestures when zoom is enabled
      e.preventDefault()
      e.stopPropagation()

      // Only handle vertical scrolling for zoom
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        setZoomLevel((prev) => {
          const delta = e.deltaY > 0 ? -10 : 10
          const newZoom = Math.max(100, Math.min(800, prev + delta))
          return newZoom
        })
      }
    }

    // Add listener to the entire window to catch all gestures
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isZoomEnabled, isMobile])

  const handleClick = () => {
    setIsZoomEnabled(!isZoomEnabled)
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isZoomEnabled || !imageRef.current || isMobile) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setPosition({ x, y })
  }

  const handleJoystickMove = (deltaX: number, deltaY: number) => {
    setPosition((prev) => {
      const newX = Math.max(0, Math.min(100, prev.x + deltaX / speed))
      const newY = Math.max(0, Math.min(100, prev.y + deltaY / speed))
      return { x: newX, y: newY }
    })
  }

  return (
    <div
      style={{
        overscrollBehaviorX: 'none',
        overscrollBehaviorY: 'none',
      }}
      className="relative size-full group"
    >
      <div
        ref={imageRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        className={`relative w-full h-full overflow-hidden ${
          isZoomEnabled ? 'cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        style={{
          backgroundImage: isZoomEnabled ? `url(${src})` : 'none',
          backgroundPosition: isZoomEnabled ? `${position.x}% ${position.y}%` : 'center',
          backgroundSize: isZoomEnabled ? `${zoomLevel}%` : 'cover',
          backgroundRepeat: 'no-repeat',
          overscrollBehaviorX: 'none',
          overscrollBehaviorY: 'none',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-contain transition-opacity duration-100 ${
            isZoomEnabled ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{
            overscrollBehaviorX: 'none',
            overscrollBehaviorY: 'none',
          }}
          priority
        />
      </div>

      {isMobile && isZoomEnabled && <Joystick onMove={handleJoystickMove} />}
    </div>
  )
}
