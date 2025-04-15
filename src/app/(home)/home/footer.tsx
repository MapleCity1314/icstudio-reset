"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Send, ExternalLink, Github } from "lucide-react"
import { Logo } from "@/components/logo/nav-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// 导航项
const footerNavItems = [
  { label: "首页", href: "/" },
  { label: "资源", href: "/resources" },
  { label: "我们做什么", href: "/what-we-do" },
  { label: "关于我们", href: "/who-we-are" },
  { label: "新闻", href: "/news" },
  { label: "联系我们", href: "/contact" },
]

// 社交媒体图标
const DouyinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6 5.82C15.9165 5.03962 15.5446 4.03743 15.55 3H12.55V16.2C12.55 16.9 12.25 17.5 11.8 18C11.33 18.5 10.71 18.75 10 18.75C8.45 18.75 7.25 17.5 7.25 16C7.25 14.5 8.45 13.25 10 13.25C10.27 13.25 10.53 13.3 10.77 13.35V10.3C10.5 10.25 10.26 10.25 10 10.25C6.77 10.25 4.25 12.77 4.25 16C4.25 19.23 6.77 21.75 10 21.75C13.23 21.75 15.75 19.23 15.75 16V9.15C16.95 9.95 18.35 10.5 19.75 10.5V7.5C19.75 7.5 17.97 7.57 16.6 5.82Z" fill="currentColor"/>
  </svg>
)

const BilibiliIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.813 4.653h.854c.87 0 1.583.7 1.583 1.56v1.548c-.02 3.635-.09 5.927-.09 6.877v.01c0 .466-.44.843-.98.843h-3.834c.28-.638.45-1.315.45-2.008h2.423V6.533h-2.796c-.486-.265-1.023-.466-1.598-.59v-1.29h3.988zm-9.634 5.48c-.015-.3-.026-.583-.026-.852s.01-.553.026-.854h5.621c.017.3.03.583.03.853s-.013.553-.03.854h-5.62zM 3.75 11.297L4.814 10.17c.542-.44 1.334.095 1.334.814v.746c0 .72-.792 1.254-1.334.815L3.75 11.48v-.183zM8.449 4.652h.952c.19 0 .367.072.498.204.13.13.203.309.203.498v2.3c-.573.14-1.11.342-1.605.59H5.75v11.58h9.303c-1.107 0-2.127-.345-2.966-.93h-3.835c-.553 0-.995-.477-.974-1.03v-1.24c.02-.485.44-.873.998-.873h3.76c-.266-.595-.43-1.256-.43-1.945h-3.33c-.553 0-.997-.378-.997-.846 0-.3.09-.583.254-.815H8.25c-.19 0-.367-.073-.498-.204-.13-.13-.203-.308-.203-.498V5.35c0-.386.31-.697.698-.697h.202z" fill="currentColor"/>
  </svg>
)

export function Footer() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [mounted, setMounted] = useState(false)
  
  const formContainerRef = useRef<HTMLDivElement>(null)
  const formTitleRef = useRef<HTMLHeadingElement>(null)
  const formInputsRef = useRef<HTMLDivElement>(null)
  const formBtnRef = useRef<HTMLButtonElement>(null)
  const footerSectionsRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setMounted(true)
    
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }
  }, [])
  
  // 添加GSAP动画
  useEffect(() => {
    if (!mounted) return
    
    // 表单动画
    if (formContainerRef.current && formTitleRef.current && formInputsRef.current && formBtnRef.current) {
      // 表单容器动画
      gsap.fromTo(
        formContainerRef.current,
        { 
          opacity: 0,
          x: 50
        },
        { 
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: "top 80%"
          }
        }
      )
      
      // 表单标题动画
      gsap.fromTo(
        formTitleRef.current,
        { 
          opacity: 0,
          y: -20
        },
        { 
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: "top 80%"
          }
        }
      )
      
      // 表单输入框动画
      gsap.fromTo(
        formInputsRef.current.children,
        { 
          opacity: 0,
          y: 20
        },
        { 
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.4,
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: "top 80%"
          }
        }
      )
      
      // 按钮动画
      gsap.fromTo(
        formBtnRef.current,
        { 
          opacity: 0,
          scale: 0.9
        },
        { 
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.8,
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: "top 80%"
          }
        }
      )
    }
    
    // 页脚各部分动画
    if (footerSectionsRef.current) {
      gsap.fromTo(
        footerSectionsRef.current.children,
        { 
          opacity: 0,
          y: 30
        },
        { 
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: footerSectionsRef.current,
            start: "top 85%"
          }
        }
      )
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [mounted])

  const handleSubmitNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter subscription:", email)
    setEmail("")
    alert("感谢订阅我们的通讯！")
  }

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Message submitted:", message)
    setMessage("")
    alert("感谢您的留言！我们会尽快回复。")
    
    // 提交成功后的按钮动画
    if (formBtnRef.current) {
      gsap.to(formBtnRef.current, {
        backgroundColor: "#22c55e",
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        repeatDelay: 0.5
      })
    }
  }

  return (
    <footer id="footer" className="relative bg-white text-black pt-20">
      {/* 主要页脚部分 - 白色背景，不受主题控制 */}
      <div className="bg-white text-black py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div ref={footerSectionsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
            {/* 办公室地址 */}
            <div className="lg:col-span-3">
              <h3 className="text-xs uppercase tracking-wider mb-8 text-gray-400">OFFICES</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">中国</h4>
                  <p className="text-sm text-gray-600">
                    辽宁省沈阳市沈北新区
                    <br />
                    辽宁省交通高等专科学校
                    <br />
                    道桥新楼5006
                  </p>
                </div>
              </div>
            </div>

            {/* 资源 */}
            <div className="lg:col-span-2">
              <h3 className="text-xs uppercase tracking-wider mb-8 text-gray-400">资源</h3>
              <div className="space-y-3">
                <div>
                  <Link href="/resources/docs" className="text-sm text-gray-600 hover:underline block">
                    文档
                  </Link>
                </div>
                <div>
                  <Link href="/resources/component-library" className="text-sm text-gray-600 hover:underline block">
                    前端组件库
                  </Link>
                </div>
                <div>
                  <Link href="/resources/frontend-resources" className="text-sm text-gray-600 hover:underline block">
                    前端资源库
                  </Link>
                </div>
                <div>
                  <Link href="/resources/design-system" className="text-sm text-gray-600 hover:underline block">
                    设计系统
                  </Link>
                </div>
                <div>
                  <Link href="/resources/templates" className="text-sm text-gray-600 hover:underline block">
                    模板市场
                  </Link>
                </div>
              </div>
            </div>

            {/* 更多 (与nav相同的内容) */}
            <div className="lg:col-span-2">
              <h3 className="text-xs uppercase tracking-wider mb-8 text-gray-400">更多</h3>
              <div className="space-y-3">
                {footerNavItems.map((item, index) => (
                  <div key={index}>
                    <Link href={item.href} className="text-sm text-gray-600 hover:underline block">
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* 关于我们 */}
            <div className="lg:col-span-2">
              <h3 className="text-xs uppercase tracking-wider mb-8 text-gray-400">关于我们</h3>
              <div className="space-y-3">
                <div>
                  <a href="https://example.com/judgerduck" className="text-sm text-gray-600 hover:underline flex items-center">
                    判题鸭
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
                <div>
                  <a href="https://example.com/loome" className="text-sm text-gray-600 hover:underline flex items-center">
                    Loome
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
                <div>
                  <a href="https://github.com/your-org" className="text-sm text-gray-600 hover:underline flex items-center">
                    GitHub
                    <Github className="ml-1 h-3 w-3" />
                  </a>
                </div>
                <div>
                  <a href="https://www.douyin.com" className="text-sm text-gray-600 hover:underline flex items-center">
                    抖音
                    <DouyinIcon />
                  </a>
                </div>
                <div>
                  <a href="https://www.bilibili.com" className="text-sm text-gray-600 hover:underline flex items-center">
                    哔哩哔哩
                    <BilibiliIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* 联系表单 - 嵌入到关于我们右侧 */}
            <div ref={formContainerRef} className="lg:col-span-3 relative">
              <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-100">
                <h3 ref={formTitleRef} className="text-xl font-medium mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  Reach out using our cool contact form.
                </h3>
                <form onSubmit={handleSubmitMessage}>
                  <div ref={formInputsRef} className="space-y-4">
                    <div>
                      <Input 
                        type="email" 
                        placeholder="您的邮箱" 
                        className="bg-gray-50 border-gray-200 dark:bg-gray-50 dark:border-gray-200 dark:text-black focus-ring-blue-500" 
                        required 
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="请输入您的留言..."
                        className="bg-gray-50 border-gray-200 dark:bg-gray-50 dark:border-gray-200 dark:text-black min-h-[120px] focus-ring-blue-500"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      ref={formBtnRef}
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:from-blue-600 hover:to-violet-600 transition-all"
                    >
                      发送留言 <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* 联系我们 */}
            <div className="lg:col-span-12 mt-8">
              <div className="border-t border-gray-200 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex items-center mb-4 md:mb-0">
                    <Logo size="sm" className="text-black" />
                    <span className="ml-2 text-sm">无限创造</span>
                  </div>
                  
                  <div className="flex space-x-6 order-3 md:order-2 mt-6 md:mt-0">
                    <form onSubmit={handleSubmitNewsletter} className="flex items-center">
                      <div className="relative w-full min-w-[200px] md:min-w-[300px]">
                        <Input
                          type="email"
                          placeholder="输入邮箱，获取通讯"
                          className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 py-2 bg-transparent text-black focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <Button
                          type="submit"
                          className="absolute right-0 top-1/2 -translate-y-1/2 text-black"
                          aria-label="订阅"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="flex space-x-6 order-2 md:order-3">
                    <a href="https://github.com/your-org" className="text-gray-600 hover:text-black">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                    <a href="https://www.douyin.com" className="text-gray-600 hover:text-black">
                      <DouyinIcon />
                      <span className="sr-only">抖音</span>
                    </a>
                    <a href="https://www.bilibili.com" className="text-gray-600 hover:text-black">
                      <BilibiliIcon />
                      <span className="sr-only">哔哩哔哩</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 黑色底部部分 */}
      <div className="bg-black text-white py-6 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 text-center">
              © {new Date().getFullYear()} Infinity Creators. 保留所有权利。
              <span className="hidden md:inline"> | </span>
              <br className="md:hidden" />
              辽ICP备XXXXXXXX号-1 | 辽公网安备XXXXXXXXXXXXX号
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white mr-4">
                隐私政策
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                使用条款
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
