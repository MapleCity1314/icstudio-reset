"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Logo({ size = "md", className = "" }: LogoProps) {
  const { theme } = useTheme()
  const [text, setText] = useState("InfinityCreators")
  const [isAnimating, setIsAnimating] = useState(false)
  const [canAnimate, setCanAnimate] = useState(true)
  const fullText = "InfinityCreators"
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Clear any existing timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Handle the typewriter animation
  const handleAnimation = () => {
    if (isAnimating || !canAnimate) return

    setIsAnimating(true)
    setCanAnimate(false)
    let currentText = fullText
    let isErasing = true
    let charIndex = fullText.length

    // Function to handle the animation step
    const animateStep = () => {
      if (isErasing) {
        // Erasing phase
        charIndex--
        currentText = fullText.substring(0, charIndex)
        setText(currentText)

        if (charIndex <= 0) {
          isErasing = false
        }
      } else {
        // Typing phase
        charIndex++
        currentText = fullText.substring(0, charIndex)
        setText(currentText)

        if (charIndex >= fullText.length) {
          // Animation complete
          setIsAnimating(false)
          // Allow animation again after a cooldown
          timeoutRef.current = setTimeout(() => {
            setCanAnimate(true)
          }, 1000)
          return
        }
      }

      // Schedule next animation step
      const speed = isErasing ? 50 : 100 // Faster erasing, slower typing
      timeoutRef.current = setTimeout(animateStep, speed)
    }

    // Start the animation
    animateStep()
  }

  // Determine font size based on the size prop
  const getFontSize = () => {
    switch (size) {
      case "sm":
        return "text-xl"
      case "lg":
        return "text-4xl"
      case "md":
      default:
        return "text-2xl"
    }
  }

  // Determine icon size based on the size prop
  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 20
      case "lg":
        return 40
      case "md":
      default:
        return 30
    }
  }

  // Split the text to insert the icon in place of 'C'
  const beforeC = text.split("C")[0]
  const afterC = text.split("C")[1] || ""

  return (
    <Link href="/">
      <div
        className={`inline-flex items-center ${getFontSize()} font-bold tracking-tight ${className}`}
        onMouseEnter={handleAnimation}
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        <span className="relative">
          {beforeC}
          <span className="relative inline-block" style={{ width: `${getIconSize()}px`, height: `${getIconSize()}px` }}>
            <Image
              src={theme === "dark" ? "/logo/moon-w.svg" : "/logo/moon-b.svg"}
              alt="Moon"
              width={getIconSize()}
              height={getIconSize()}
              className="absolute top-1/2 left-0 transform -translate-y-1/2"
            />
          </span>
          {afterC}
        </span>
      </div>
    </Link>
  )
}
