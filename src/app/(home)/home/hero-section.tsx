"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import gsap from "gsap"
import { beatriceDisplay } from "@/app/fonts"
import HeroBg from "@/components/bg/hero-bg"


export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const { theme } = useTheme()

  // 解决水合问题
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // 页面加载动画
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timer)
    }
  }, [])

  // 文字错开动画
  useEffect(() => {
    if (isLoaded && titleRef.current) {
      // 将标题文本分割成单个字符
      const text = "Infinity Creators"
      titleRef.current.innerHTML = ""

      // 创建包装器
      const wrapper = document.createElement("div")
      wrapper.className = "flex flex-wrap justify-center"

      // 为每个字符创建span
      text.split("").forEach((char) => {
        const span = document.createElement("span")
        span.textContent = char === " " ? "\u00A0" : char
        span.className = "inline-block"
        span.style.opacity = "0"
        span.style.transform = "translateY(20px)"
        wrapper.appendChild(span)
      })

      titleRef.current.appendChild(wrapper)

      // 使用GSAP创建错开动画
      gsap.to(wrapper.children, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
      })
    }
  }, [isLoaded])

  // 计算文本移动效果 - 修改移动系数使效果更加明显
  const leftTextTransform = {
    transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
  }

  const rightTextTransform = {
    transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
  }

  // 如果组件未挂载，返回空内容
  if (!mounted) return null

  return (
    <HeroBg minRadius={200} maxRadius={400} speedFactor={1.8} colors={['#836FFF', '#15F5BA', '#69F2FF']}>
      <div
        id="hero" // 添加ID用于滚动指示器
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center transition-colors duration-300 z-10"
      >
        {/* 左侧文本 - 左上方位置 */}
        <div
          className={`absolute left-1/4 -translate-x-1/2 top-1/3 -translate-y-1/2 
            transition-all duration-300 ease-out 
            ${isLoaded ? "opacity-100" : "opacity-0 translate-y-[-10px] translate-x-[-10px]"}
          `}
          style={{
            ...leftTextTransform,
            transitionDelay: "200ms",
          }}
        >
          <p
            className={`text-sm md:text-base uppercase tracking-widest border-b pb-1 ${
              theme === "dark" ? "text-white border-white" : "text-black border-black"
            }`}
            style={{ fontFamily: "var(--font-beatrice-display), sans-serif" }}
          >
            what we think
          </p>
        </div>

        {/* 中央标题 */}
        <div
          className={`transition-all duration-700 ease-out px-4 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <h1
            ref={titleRef}
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-center ${
              theme === "dark" ? "text-white" : "text-black"
            } ${beatriceDisplay.className}`}
          >
            Infinity Creators
          </h1>
        </div>

        {/* 右侧文本 - 右下方位置 */}
        <div
          className={`absolute right-1/4 translate-x-1/2 bottom-1/3 translate-y-1/2
            transition-all duration-300 ease-out
            ${isLoaded ? "opacity-100" : "opacity-0 translate-y-[10px] translate-x-[10px]"}
          `}
          style={{
            ...rightTextTransform,
            transitionDelay: "200ms",
          }}
        >
          <p
            className={`text-sm md:text-base uppercase tracking-widest border-b pb-1 ${
              theme === "dark" ? "text-white border-white" : "text-black border-black"
            }`}
            style={{ fontFamily: "var(--font-beatrice-display), sans-serif" }}
          >
            what we build
          </p>
        </div>

        {/* 鼠标跟随光效 */}
        <div
          className={`pointer-events-none absolute w-[300px] h-[300px] rounded-full ${
            theme === "dark"
              ? "bg-gradient-radial from-white to-transparent opacity-5"
              : "bg-gradient-radial from-black to-transparent opacity-5"
          } blur-xl`}
          style={{
            transform: `translate(${mousePosition.x * 100}px, ${mousePosition.y * 100}px)`,
            left: "calc(50% - 150px)",
            top: "calc(50% - 150px)",
          }}
        ></div>

        {/* 向下滚动指示器 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={theme === "dark" ? "text-white" : "text-black"}
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </HeroBg>
  )
}
