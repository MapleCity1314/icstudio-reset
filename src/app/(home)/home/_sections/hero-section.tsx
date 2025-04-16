"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import gsap from "gsap"
import { beatriceDisplay } from "@/app/fonts"
import HeroBg from "@/components/bg/hero-bg"

// 调试模式开关
const DEBUG_MODE = false

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const leftTextRef = useRef<HTMLDivElement>(null)
  const rightTextRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  // 添加跟踪GSAP动画的ref
  const animations = useRef<gsap.core.Tween[]>([])
  // 组件挂载状态标记
  const isMounted = useRef(true)

  // 解决水合问题
  useEffect(() => {
    setMounted(true)
    
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    // 页面加载动画
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setIsLoaded(true)
        if (DEBUG_MODE) console.log("英雄区域加载完成")
      }
    }, 500)

    return () => {
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

      // 使用GSAP创建错开动画，保存动画实例
      const titleAnim = gsap.to(wrapper.children, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          if (DEBUG_MODE && isMounted.current) console.log("标题动画完成")
        }
      })
      
      // 添加到动画列表以便清理
      animations.current.push(titleAnim)
    }
    
    return () => {
      // 清理所有动画
      animations.current.forEach(anim => anim.kill())
      animations.current = []
    }
  }, [isLoaded])

  // 添加自动浮动动画替代鼠标跟踪
  useEffect(() => {
    if (isLoaded && leftTextRef.current && rightTextRef.current) {
      // 左侧文本自动浮动
      const leftAnim = gsap.to(leftTextRef.current, {
        x: -15,
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })
      
      // 右侧文本自动浮动（错开时间）
      const rightAnim = gsap.to(rightTextRef.current, {
        x: 15,
        y: 15,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5, // 错开动画时间
      })
      
      // 添加到动画列表以便清理
      animations.current.push(leftAnim, rightAnim)
    }
    
    return () => {
      // 清理动画
      animations.current.forEach(anim => anim.kill())
      animations.current = []
    }
  }, [isLoaded])

  // 如果组件未挂载，返回空内容
  if (!mounted) return null

  return (
    <HeroBg
      minRadius={200}
      maxRadius={400}
      speedFactor={1.8} 
      colors={['#836FFF', '#15F5BA', '#69F2FF']}
    >
      <div
        id="hero" // 添加ID用于滚动指示器
        ref={containerRef}
        className="w-full h-full flex items-center justify-center transition-colors duration-300"
      >
        {/* 左侧文本 - 左上方位置 */}
        <div
          ref={leftTextRef}
          className={`absolute left-1/4 -translate-x-1/2 top-1/3 -translate-y-1/2 
            transition-all duration-300 ease-out 
            ${isLoaded ? "opacity-100" : "opacity-0 translate-y-[-10px] translate-x-[-10px]"}
          `}
          style={{
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
          ref={rightTextRef}
          className={`absolute right-1/4 translate-x-1/2 bottom-1/3 translate-y-1/2
            transition-all duration-300 ease-out
            ${isLoaded ? "opacity-100" : "opacity-0 translate-y-[10px] translate-x-[10px]"}
          `}
          style={{
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
