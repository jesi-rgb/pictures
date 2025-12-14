'use client'

import Image from 'next/image'
import { useState, useRef, MouseEvent } from 'react'

interface ZoomableImageProps {
  src: string
  alt: string
}

export function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const [isZoomEnabled, setIsZoomEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const imageRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    setIsZoomEnabled(!isZoomEnabled)
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isZoomEnabled || !imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setPosition({ x, y })
  }

  return (
    <div className="relative w-full h-full group">
      <div
        ref={imageRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        className={`relative w-full h-full overflow-hidden rounded-lg ${
          isZoomEnabled ? 'cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        style={{
          backgroundImage: isZoomEnabled ? `url(${src})` : 'none',
          backgroundPosition: isZoomEnabled ? `${position.x}% ${position.y}%` : 'center',
          backgroundSize: isZoomEnabled ? '200%' : 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-contain transition-opacity duration-200 ${
            isZoomEnabled ? 'opacity-0' : 'opacity-100'
          }`}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Zoom indicator */}
      <div
        className={`absolute top-4 right-4 badge badge-primary transition-opacity duration-200 ${
          isZoomEnabled ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        {isZoomEnabled ? '🔍 Zoom Active' : '🔍 Click to Zoom'}
      </div>
    </div>
  )
}
