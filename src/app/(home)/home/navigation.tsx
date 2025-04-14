"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Home, Lightbulb, Flag, Info, Mail } from "lucide-react"

// 调试模式开关
const DEBUG_MODE = false

// 定义页面各部分及其图标
const sections = [
  { id: "hero", name: "首页", icon: Home },
  { id: "creative", name: "创意", icon: Lightbulb },
  { id: "projects", name: "项目", icon: Flag },
  { id: "about", name: "关于", icon: Info },
  { id: "contact", name: "联系", icon: Mail },
]

export function CurvedNavigation() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const navRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const scrollTriggers = useRef<ScrollTrigger[]>([])

  // 解决水合问题
  useEffect(() => {
    setMounted(true)
  }, [])

  // 检测是否为移动设备
  useEffect(() => {
    if (!mounted) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [mounted])

  // 设置滚动监听
  useEffect(() => {
    if (!mounted) return;

    // 注册GSAP插件
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
      
      // 强制刷新ScrollTrigger以确保它正确初始化
      ScrollTrigger.refresh()

      // 延迟执行以确保DOM已完全加载
      const initTimer = setTimeout(() => {
        // 清理之前的触发器
        scrollTriggers.current.forEach(trigger => trigger.kill())
        scrollTriggers.current = []

        // 检查每个部分元素是否存在，并输出调试信息
        if (DEBUG_MODE) {
          const sectionsExist = sections.map(section => {
            const exists = !!document.getElementById(section.id)
            return { id: section.id, exists }
          })
          
          console.log("部分元素存在情况:", sectionsExist)
        }

        // 创建滚动触发器，当离开首页时显示导航
        const heroEl = document.getElementById("hero")
        if (heroEl) {
          const heroTrigger = ScrollTrigger.create({
            trigger: heroEl,
            start: "bottom 70%",
            onEnter: () => {
              if (DEBUG_MODE) console.log("进入hero区域")
              setIsVisible(true)
            },
            onLeaveBack: () => {
              if (DEBUG_MODE) console.log("离开hero区域")
              setIsVisible(false)
            },
            markers: DEBUG_MODE, // 只在调试模式下显示标记
          })
          scrollTriggers.current.push(heroTrigger)
        } else {
          if (DEBUG_MODE) console.warn("未找到hero元素")
          // 如果找不到hero元素，默认显示导航
          setIsVisible(true)
        }

        // 为每个部分创建滚动触发器
        sections.forEach((section, index) => {
          const el = document.getElementById(section.id)
          if (el) {
            const trigger = ScrollTrigger.create({
              trigger: el,
              start: "top 60%", // 更改触发点，使其更容易激活
              end: "bottom 40%", 
              onEnter: () => {
                if (DEBUG_MODE) console.log(`进入${section.name}区域`)
                setActiveIndex(index)
              },
              onEnterBack: () => {
                if (DEBUG_MODE) console.log(`返回${section.name}区域`)
                setActiveIndex(index)
              },
              markers: DEBUG_MODE, // 只在调试模式下显示标记
            })
            scrollTriggers.current.push(trigger)
          }
        })

        // 导航入场动画
        if (navRef.current) {
          const creativeEl = document.getElementById("creative")
          if (creativeEl) {
            gsap.fromTo(
              navRef.current,
              { opacity: 0, x: 50 },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: creativeEl,
                  start: "top bottom",
                },
              },
            )
          }
        }
      }, 500) // 延迟500ms执行，确保DOM已加载

      return () => {
        clearTimeout(initTimer)
        scrollTriggers.current.forEach(trigger => trigger.kill())
      }
    }
  }, [mounted])

  // 添加滚动监听的强制刷新
  useEffect(() => {
    if (!mounted) return;
    
    const refreshTimer = setInterval(() => {
      if (typeof window !== 'undefined' && ScrollTrigger) {
        ScrollTrigger.refresh()
      }
    }, 3000) // 每3秒刷新一次

    return () => clearInterval(refreshTimer)
  }, [mounted])

  // 滚动到指定部分
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      if (DEBUG_MODE) console.log(`滚动到${id}部分`)
      
      // 使用更精确的滚动位置计算
      const headerOffset = 80 // 如果有固定头部，调整此值
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    } else {
      if (DEBUG_MODE) console.warn(`未找到ID为${id}的元素`)
    }
  }

  // 如果组件未挂载，返回null
  if (!mounted) return null
  
  // 如果是移动设备或在首页，不显示导航
  if (isMobile || !isVisible) return null

  return (
    <div
      ref={navRef}
      className={`fixed right-8 top-1/2 -translate-y-1/2 z-40 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative">
        {/* 导航项容器 */}
        <div ref={itemsRef} className="relative">
          {sections.map((section, index) => {
            const isActive = index === activeIndex
            const Icon = section.icon

            // 计算曲线位置
            const distanceFromActive = index - activeIndex
            const curveX = Math.pow(distanceFromActive, 2) * 8 // 控制曲率

            return (
              <div
                key={index}
                className={`flex items-center mb-12 transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
                }`}
                style={{
                  transform: `translateX(${curveX}px)`,
                  transition: "transform 0.5s ease-out",
                }}
              >
                {/* 活动项显示文字，非活动项显示图标 */}
                {isActive ? (
                  // 活动项 - 显示文字和按钮
                  <div className="flex items-center">
                    
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        theme === "dark" ? "bg-white/10" : "bg-black/10"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                ) : (
                  // 非活动项 - 只显示图标
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      theme === "dark" ? "border border-white/30 hover:bg-white/5" : "border border-black/30 hover:bg-black/5"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* 指示器线 */}
        <div
          className={`absolute right-6 top-0 h-full w-px ${theme === "dark" ? "bg-white/10" : "bg-black/10"}`}
          style={{ height: "70vh" }}
        ></div>
      </div>
    </div>
  )
}
