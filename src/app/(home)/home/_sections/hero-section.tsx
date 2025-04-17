"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { beatriceDisplay } from "@/app/fonts"
import HeroBg from "@/components/bg/hero-bg"

// 调试模式开关
const DEBUG_MODE = false

export function HeroSection() {
  // 状态管理
  const [isLoaded, setIsLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [animationReady, setAnimationReady] = useState(false)
  const firstLoad = useRef(true)
  
  // DOM引用
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const leftTextRef = useRef<HTMLDivElement>(null)
  const rightTextRef = useRef<HTMLDivElement>(null)
  
  // 主题和路由
  const { theme } = useTheme()
  const pathname = usePathname()
  
  // 动画实例跟踪
  const animations = useRef<gsap.core.Tween[]>([])
  const titleWrapperRef = useRef<HTMLDivElement | null>(null)
  
  // 组件挂载状态标记
  const isMounted = useRef(true)

  // 添加强制重绘和初始化函数
  const forceRepaint = () => {
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;
      return height; // 返回值不重要，只是为了强制浏览器重绘
    }
    return 0;
  };

  // 解决水合问题
  useEffect(() => {
    setMounted(true);
    
    // 组件加载后强制重绘一次
    forceRepaint();
    
    // 设置一个短延迟后标记为已加载
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setAnimationReady(true);
      if (DEBUG_MODE) console.log("初始组件挂载设置");
    }, 10);
    
    return () => {
      isMounted.current = false;
      clearTimeout(timer);
      // 清理所有动画
      animations.current.forEach(anim => anim && anim.kill());
      animations.current = [];
    };
  }, []);

  // 路由变化时重置动画状态
  useEffect(() => {
    if (!firstLoad.current) {
      // 清理所有现有动画
      cleanupAnimations();
      
      // 标记为未加载状态，触发CSS过渡动画
      setIsLoaded(false);
      
      // 强制一次重绘
      forceRepaint();
      
      // 确保DOM有足够时间重置
      const timer = setTimeout(() => {
        if (isMounted.current) {
          setIsLoaded(true);
          setAnimationReady(prev => !prev); // 切换状态触发重新执行动画
          if (DEBUG_MODE) console.log("路由变化重设动画 - 路由:", pathname);
        }
      }, 50);
      
      return () => clearTimeout(timer);
    } else {
      firstLoad.current = false;
    }
  }, [pathname]);

  // 清理所有动画的辅助函数
  const cleanupAnimations = () => {
    animations.current.forEach(anim => anim && anim.kill());
    animations.current = [];
    
    // 重置标题内容
    if (titleRef.current) {
      titleRef.current.innerHTML = "Infinity Creators";
      titleWrapperRef.current = null;
    }
    
    // 重置左右文本样式
    if (leftTextRef.current) {
      gsap.set(leftTextRef.current, { clearProps: "all" });
    }
    
    if (rightTextRef.current) {
      gsap.set(rightTextRef.current, { clearProps: "all" });
    }
  };

  // 文字错开动画
  useEffect(() => {
    if (!isLoaded || !animationReady) return;
    
    if (titleRef.current && isMounted.current) {
      // 确保标题内容已重置
      if (titleWrapperRef.current) {
        cleanupAnimations();
      }
      
      // 将标题文本分割成单个字符
      const text = "Infinity Creators";
      titleRef.current.innerHTML = "";

      // 创建包装器
      const wrapper = document.createElement("div");
      wrapper.className = "flex flex-wrap justify-center";
      titleWrapperRef.current = wrapper;

      // 为每个字符创建span
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";
        wrapper.appendChild(span);
      });

      titleRef.current.appendChild(wrapper);

      // 强制重绘确保DOM更新
      forceRepaint();

      // 使用GSAP创建错开动画
      const titleAnim = gsap.to(wrapper.children, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
        onStart: () => {
          if (DEBUG_MODE) console.log("标题动画开始");
        },
        onComplete: () => {
          if (DEBUG_MODE && isMounted.current) console.log("标题动画完成");
        }
      });
      
      // 添加到动画列表以便清理
      animations.current.push(titleAnim);
    }
  }, [isLoaded, animationReady]);

  // 添加自动浮动动画
  useEffect(() => {
    if (!isLoaded || !animationReady) return;
    
    if (leftTextRef.current && rightTextRef.current && isMounted.current) {
      // 确保左右文本是可见的
      gsap.set([leftTextRef.current, rightTextRef.current], { opacity: 1 });
      
      // 左侧文本自动浮动
      const leftAnim = gsap.to(leftTextRef.current, {
        x: -15,
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      
      // 右侧文本自动浮动（错开时间）
      const rightAnim = gsap.to(rightTextRef.current, {
        x: 15,
        y: 15,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5, // 错开动画时间
      });
      
      // 添加到动画列表以便清理
      animations.current.push(leftAnim, rightAnim);
      
      // Debug日志
      if (DEBUG_MODE) {
        console.log("浮动动画已添加", {
          leftElement: !!leftTextRef.current,
          rightElement: !!rightTextRef.current
        });
      }
    }
  }, [isLoaded, animationReady]);

  // 如果组件未挂载，返回空内容
  if (!mounted) return null;

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
          className="absolute left-1/4 -translate-x-1/2 top-1/3 -translate-y-1/2 transition-all duration-300 ease-out"
          style={{
            transitionDelay: "200ms",
            opacity: isLoaded ? 1 : 0,
            transform: `translate(-50%, -50%) translate(${isLoaded ? '0px' : '-10px'}, ${isLoaded ? '0px' : '-10px'})`,
            display: 'block'
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
          className="transition-all duration-700 ease-out px-4"
          style={{ 
            opacity: isLoaded ? 1 : 0, 
            transform: `scale(${isLoaded ? 1 : 0.95})`,
            display: 'block'
          }}
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
          className="absolute right-1/4 translate-x-1/2 bottom-1/3 translate-y-1/2 transition-all duration-300 ease-out"
          style={{
            transitionDelay: "200ms",
            opacity: isLoaded ? 1 : 0,
            transform: `translate(50%, 50%) translate(${isLoaded ? '0px' : '10px'}, ${isLoaded ? '0px' : '10px'})`,
            display: 'block'
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
