"use client"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "next-themes"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// // 确保仅在客户端注册插件
// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger)
// }

type ContactMode = "collaborate" | "join" | "message"

export default function ContactPage() {
  // 注意：这里只是为了防止水合问题，但我们不需要实际使用主题变量
  useTheme()
  const { setTheme } = useTheme()
  const [mode, setMode] = useState<ContactMode>("collaborate")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // 移除不需要的状态
  // const [focusedInput, setFocusedInput] = useState<string | null>(null)

  // 表单字段
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [company, setCompany] = useState("")
  const [phone, setPhone] = useState("")
  const [portfolio, setPortfolio] = useState("")
  const [message, setMessage] = useState("")

  // 动画引用
  const firstPageRef = useRef<HTMLDivElement>(null)
  const secondPageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const modesRef = useRef<HTMLDivElement>(null)
  const formCardRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const sendButtonRef = useRef<HTMLButtonElement>(null)
  const planeRef = useRef<SVGSVGElement>(null)
  
  // 移除不需要的refs
  // const inputRefs = useRef<Map<string, HTMLDivElement | null>>(new Map())
  
  // 添加动画实例跟踪
  const animations = useRef<(gsap.core.Tween | gsap.core.Timeline | null)[]>([])
  
  useEffect(() => {
    setTheme("light")
  }, [])

  // 初始化动画
  useEffect(() => {
    const tl = gsap.timeline()

    // 第一页动画
    if (titleRef.current) {
      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      })
      animations.current.push(tl)
    }

    // 模式选择按钮动画 - 修复为使用Button组件
    if (modesRef.current) {
      // 获取Button组件，找到所有的子元素
      const buttons = Array.from(modesRef.current.children)
      
      tl.from(
        buttons,
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )
    }

    // 表单卡片动画
    if (formCardRef.current) {
      tl.from(
        formCardRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.2",
      )
    }

    // 按钮悬停动画
    if (sendButtonRef.current) {
      sendButtonRef.current.addEventListener("mouseenter", () => {
        gsap.to(sendButtonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        })

        if (planeRef.current) {
          gsap.to(planeRef.current, {
            x: 3,
            y: -3,
            duration: 0.3,
            ease: "power2.out",
          })
        }
      })

      sendButtonRef.current.addEventListener("mouseleave", () => {
        gsap.to(sendButtonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })

        if (planeRef.current) {
          gsap.to(planeRef.current, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          })
        }
      })
    }

    // 设置ScrollTrigger
    // 从第一页滚动到第二页时的动画效果
    if (typeof window !== 'undefined' && secondPageRef.current && formCardRef.current) {
      gsap.registerPlugin(ScrollTrigger)
      
      ScrollTrigger.create({
        trigger: secondPageRef.current,
        start: "top bottom",
        end: "top top",
        onEnter: () => {
          gsap.to(formCardRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          })
        },
        onLeaveBack: () => {
          gsap.to(formCardRef.current, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
          })
        }
      })
      
      // ScrollTrigger刷新
      ScrollTrigger.refresh()
    }

    return () => {
      // 清理所有动画实例
      animations.current.forEach(anim => anim && anim.kill())
      animations.current = []
      
      // 清理ScrollTrigger实例
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
      
      // 移除事件监听器
      if (sendButtonRef.current) {
        sendButtonRef.current.removeEventListener("mouseenter", () => {})
        sendButtonRef.current.removeEventListener("mouseleave", () => {})
      }
    }
  }, [])

  // 模式切换动画
  useEffect(() => {
    if (formRef.current) {
      const formAnim = gsap.fromTo(formRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      )
      animations.current.push(formAnim)
    }
    
    return () => {
      // 清理动画
      animations.current.forEach(anim => anim && anim.kill())
      animations.current = []
    }
  }, [mode])

  // 移除输入框焦点动画
  /*
  useEffect(() => {
    // 如果有焦点的输入框，为其添加动画
    if (focusedInput && inputRefs.current.get(focusedInput)) {
      const inputContainer = inputRefs.current.get(focusedInput)
      const inputLine = inputContainer?.querySelector('.input-line')
      
      if (inputLine) {
        gsap.fromTo(
          inputLine, 
          { width: '0%' }, 
          { width: '100%', duration: 0.3, ease: "power2.out" }
        )
      }
    }
  }, [focusedInput])
  */

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 发送按钮动画
    if (sendButtonRef.current && planeRef.current) {
      const tl = gsap.timeline()

      tl.to(sendButtonRef.current, {
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
      })

      tl.to(planeRef.current, {
        x: 100,
        y: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      })

      tl.to(sendButtonRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          // 重置飞机位置（不可见）
          gsap.set(planeRef.current, { x: 0, y: 0, opacity: 0 })

          // 淡入飞机
          gsap.to(planeRef.current, {
            opacity: 1,
            duration: 0.3,
            delay: 0.2,
          })

          // 模拟API调用
          setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)

            // 3秒后重置表单
            setTimeout(() => {
              setName("")
              setEmail("")
              setAddress("")
              setCompany("")
              setPhone("")
              setPortfolio("")
              setMessage("")
              setIsSubmitted(false)
            }, 3000)
          }, 1000)
        },
      })
    }
  }

  // 根据模式获取标题
  const getTitle = () => {
    switch (mode) {
      case "collaborate":
        return "与我们合作"
      case "join":
        return "加入团队"
      case "message":
        return "打个招呼"
      default:
        return "与我们合作"
    }
  }

  // 渲染输入框组件，移除动画线条
  const renderInput = (
    id: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    placeholder: string,
    required: boolean = true
  ) => {
    return (
      <div className="relative pb-2 mb-4">
        <Input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="border-0 border-b border-gray-300 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    );
  };

  return (
    <>
      {/* 第一页 - 模式选择 */}
      <div 
        ref={firstPageRef} 
        className="min-h-screen bg-white flex items-center text-black"
      >
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div ref={titleRef} className="mb-24 mt-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 text-center">
              您想与我们交流什么？
            </h1>
            <p className="text-sm uppercase tracking-wider text-center">联系我们</p>
          </div>

          {/* 模式选择 */}
          <div ref={modesRef} className="space-y-10 max-w-2xl mx-auto">
            <Button
              onClick={() => setMode("collaborate")}
              className={cn(
                "text-3xl md:text-4xl lg:text-5xl font-light transition-all duration-300 hover:opacity-100 block text-center w-full bg-transparent hover:bg-transparent",
                mode === "collaborate" ? "opacity-100" : "opacity-30",
              )}
            >
              与我们合作
            </Button>
            <Button
              onClick={() => setMode("join")}
              className={cn(
                "text-3xl md:text-4xl lg:text-5xl font-light transition-all duration-300 hover:opacity-100 block text-center w-full bg-transparent hover:bg-transparent",
                mode === "join" ? "opacity-100" : "opacity-30",
              )}
            >
              加入团队
            </Button>
            <Button
              onClick={() => setMode("message")}
              className={cn(
                "text-3xl md:text-4xl lg:text-5xl font-light transition-all duration-300 hover:opacity-100 block text-center w-full bg-transparent hover:bg-transparent",
                mode === "message" ? "opacity-100" : "opacity-30",
              )}
            >
              打个招呼
            </Button>
          </div>
        </div>
      </div>

      {/* 第二页 - 表单 */}
      <div ref={secondPageRef} className="min-h-screen relative">
        {/* 上半部分白色背景 */}
        <div className="h-1/2 bg-white absolute top-0 left-0 right-0"></div>
        {/* 下半部分黑色背景 */}
        <div className="h-1/2 bg-black absolute bottom-0 left-0 right-0"></div>

        {/* 表单卡片容器 */}
        <div className="container mx-auto px-4 relative z-10">
          <Card 
            ref={formCardRef} 
            className="p-0 shadow-xl max-w-5xl mx-auto transform translate-y-1/4"
            style={{ minHeight: '60vh' }}
          >
            <CardHeader className="p-8 md:p-10 lg:p-16 pb-6">
              <CardTitle className="text-3xl md:text-4xl font-light text-black">{getTitle()}</CardTitle>
            </CardHeader>
            <CardContent className="p-8 md:p-10 lg:p-16 pt-4">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 13L9 17L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-light mb-2 text-black">消息已发送！</h3>
                  <p className="text-gray-600 text-center max-w-md">
                    感谢您的联系。我们会尽快回复您。
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {/* 左列 */}
                  <div className="space-y-2">
                    {/* 姓名字段 - 始终显示 */}
                    {renderInput("name", name, (e) => setName(e.target.value), "姓名")}

                    {/* 邮箱字段 - 始终显示 */}
                    {renderInput("email", email, (e) => setEmail(e.target.value), "邮箱")}

                    {/* 地址字段 - 仅用于合作 */}
                    {mode === "collaborate" && (
                      renderInput("address", address, (e) => setAddress(e.target.value), "地址")
                    )}

                    {/* 公司字段 - 仅用于合作 */}
                    {mode === "collaborate" && (
                      renderInput("company", company, (e) => setCompany(e.target.value), "公司")
                    )}

                    {/* 电话字段 - 仅用于加入 */}
                    {mode === "join" && (
                      renderInput("phone", phone, (e) => setPhone(e.target.value), "电话")
                    )}

                    {/* 作品集字段 - 仅用于加入 */}
                    {mode === "join" && (
                      renderInput("portfolio", portfolio, (e) => setPortfolio(e.target.value), "作品集链接")
                    )}
                  </div>

                  {/* 右列 - 消息字段 */}
                  <div className="md:row-span-2 flex flex-col">
                    <div className="relative pb-2 h-full flex flex-col">
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="消息内容"
                        required
                        className="w-full h-full min-h-[200px] border-0 border-b border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none bg-transparent py-2 placeholder-gray-500 text-black resize-none"
                      />
                    </div>

                    {/* 发送按钮 */}
                    <div className="flex justify-end mt-8">
                      <Button
                        ref={sendButtonRef}
                        type="submit"
                        disabled={isSubmitting}
                        variant="outline"
                        size="icon"
                        className="w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 border-0"
                        aria-label="发送消息"
                      >
                        <Send ref={planeRef} className="h-5 w-5 transform transition-transform duration-300 text-black" />
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
