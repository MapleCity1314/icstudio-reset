"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import FallingText from "@/components/anime/FallingText/FallingText"
import Magnet from "@/components/anime/Magnet/Magnet"
import { ProjectsSection } from "./projects-section"

const CreativeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const circleButtonRef = useRef<HTMLDivElement>(null)
  const buttonTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // 容器入场动画
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      )
    }

    // 标题动画
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        },
      )
    }

    // 副标题动画
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
          },
        },
      )
    }

    // 描述文字动画
    if (descriptionRef.current) {
      const paragraphs = descriptionRef.current.querySelectorAll("p")
      gsap.fromTo(
        paragraphs,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 85%",
          },
        },
      )
    }

    // 按钮文字动画
    if (buttonTextRef.current) {
      gsap.fromTo(
        buttonTextRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: buttonTextRef.current,
            start: "top 90%",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <section
        id="creative"
        ref={sectionRef}
        className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center min-h-screen overflow-hidden"
      >
        {/* 背景动画文字 */}
        <div className="absolute inset-0 opacity-30 overflow-hidden pointer-events-none">
          <FallingText
            text={`using React Next.js Django Tauri Electron SpringBoot AI to create creative AI products`}
            highlightWords={["React", "Next.js", "Django", "Tauri", "Electron", "SpringBoot", "AI"]}
            trigger="scroll"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="2.5rem"
            mouseConstraintStiffness={0.9}
          />
        </div>

        {/* 主要内容 */}
        <div ref={containerRef} className="container mx-auto max-w-3xl z-10">
          <div className="flex flex-col items-center justify-center text-center space-y-12">
            {/* 标题 */}
            <h2 
              ref={titleRef} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400"
            >
              年轻，敢想，敢创
            </h2>
            
            {/* 副标题 */}
            <p 
              ref={subtitleRef} 
              className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 italic"
            >
              Be Young, Be Creative, Be Bold
            </p>

            {/* 描述内容 */}
            <div ref={descriptionRef} className="space-y-6 text-md md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              <p>
                我们是一群充满激情和创造力的年轻人，致力于用科技和创新改变世界。在无限创作工作室，我们相信每个想法都有实现的可能。
              </p>
              <p>
                从前端到后端，从移动应用到桌面软件，我们精通各种技术栈，包括React、Next.js、Django、Tauri、Electron和SpringBoot。但技术只是工具，真正驱动我们的是通过AI和前沿技术解决实际问题的热情。
              </p>
              <p>
                加入我们，一起探索无限可能，让创意照亮未来。
              </p>
            </div>

            {/* 使用Magnet组件的大型圆形按钮 */}
            <div className="mt-12 relative flex flex-col items-center space-y-4">
              <Magnet
                magnetStrength={0.5}
                padding={150}
                wrapperClassName="cursor-pointer"
                innerClassName="transition-transform duration-300"
              >
                <div 
                  ref={circleButtonRef}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow group"
                  onClick={() => window.open('/about', '_self')}
                >
                  <ArrowRight className="text-white w-10 h-10 transition-transform group-hover:scale-110" />
                </div>
              </Magnet>
              <div ref={buttonTextRef} className="text-lg font-medium text-gray-700 dark:text-gray-300">
                了解更多
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* 添加项目部分 */}
      <ProjectsSection />
    </>
  )
}

export default CreativeSection;
