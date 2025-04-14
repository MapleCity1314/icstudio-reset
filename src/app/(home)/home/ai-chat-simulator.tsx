"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Send, ArrowRight } from "lucide-react"
import gsap from "gsap"
import Image from 'next/image'

// 模拟AI响应数据
const aiResponses = [
  {
    prompt: "生成一个未来城市的图像",
    response:
      "这是我为您创建的未来城市图像。这座城市融合了先进的可持续技术、垂直花园和流线型建筑，展现了人类与自然和谐共存的未来愿景。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    prompt: "设计一个智能家居界面",
    response:
      "这是我设计的智能家居控制界面。它采用了简约的设计语言，直观的控制元素，以及自适应的色彩方案，让用户可以轻松控制家中的各种智能设备。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    prompt: "创建一个科技感的品牌标志",
    response: "这是我创建的科技感品牌标志。它使用了动态几何形状和渐变色彩，传达出创新、进步和未来感的品牌形象。",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]

export function AiChatSimulator() {
  const [chatState, setChatState] = useState<"initial" | "typing" | "responded">("initial")
  const [currentResponse, setCurrentResponse] = useState(aiResponses[0])
  const [typedText, setTypedText] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const viewMoreButtonRef = useRef<HTMLButtonElement>(null)

  // 模拟打字效果
  useEffect(() => {
    if (chatState === "typing") {
      let index = 0
      const text = currentResponse.response
      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setTypedText(text.substring(0, index + 1))
          index++
        } else {
          clearInterval(typingInterval)
          setChatState("responded")
        }
      }, 30)

      return () => clearInterval(typingInterval)
    }
  }, [chatState, currentResponse])

  // 按钮动画
  useEffect(() => {
    if (chatState === "responded" && buttonRef.current && viewMoreButtonRef.current) {
      // 隐藏发送按钮
      gsap.to(buttonRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          // 显示查看更多按钮
          gsap.fromTo(
            viewMoreButtonRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
          )
        },
      })
    }
  }, [chatState])

  const handleSendMessage = () => {
    if (chatState === "initial") {
      setChatState("typing")
      // 随机选择一个响应
      const randomIndex = Math.floor(Math.random() * aiResponses.length)
      setCurrentResponse(aiResponses[randomIndex])
    }
  }

  return (
    <div ref={chatContainerRef} className="w-full max-w-3xl mx-auto">
      <Card className="bg-card border-border shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-primary/10 p-3 border-b border-border">
            <h3 className="text-lg font-medium text-foreground">AI 创意助手</h3>
          </div>

          <div className="p-4 min-h-[400px] flex flex-col">
            {chatState === "initial" ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-muted-foreground mb-4">点击下方按钮，体验AI创意生成</p>
                  <Button ref={buttonRef} onClick={handleSendMessage} className="group">
                    <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    发送创意请求
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="bg-primary/5 p-3 rounded-lg self-start mb-4">
                  <p className="text-sm text-foreground">{currentResponse.prompt}</p>
                </div>

                <div className="bg-muted/20 p-3 rounded-lg self-end mb-4 max-w-[80%]">
                  <p className="text-sm text-foreground">{typedText}</p>
                </div>

                {chatState === "responded" && (
                  <div className="mt-4 self-center w-full max-w-[90%] rounded-lg overflow-hidden shadow-md transition-all duration-500 opacity-100 scale-100">
                    <Image
                      src={currentResponse.imageUrl || "/placeholder.svg"}
                      alt="AI生成图像"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-border flex justify-between items-center">
            {chatState === "initial" ? (
              <p className="text-sm text-muted-foreground">AI将根据您的请求生成创意内容</p>
            ) : (
              <p className="text-sm text-muted-foreground">{chatState === "typing" ? "AI正在思考..." : "生成完成"}</p>
            )}

            {chatState === "initial" && (
              <Button ref={buttonRef} size="sm" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            )}

            {chatState === "responded" && (
              <Button
                ref={viewMoreButtonRef}
                size="icon"
                className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110 opacity-0 scale-0"
                aria-label="查看更多作品"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
