"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import gsap from "gsap"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/logo/nav-logo"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

const HomeNav = () => {
  const { theme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement>(null)
  const desktopMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  // Navigation items
  const navItems: NavItem[] = [
    { label: "首页", href: "/" },
    { label: "资源", href: "/resources" },
    { label: "我们做什么", href: "/what-we-do" },
    { label: "关于我们", href: "/who-we-are" },
    { label: "新闻", href: "/news" },
    { label: "联系我们", href: "/contact" },
  ]

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Handle scroll
  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [mounted])

  // Animate nav on scroll
  useEffect(() => {
    if (!navRef.current) return

    if (isScrolled) {
      gsap.to(navRef.current, {
        height: "64px",
        padding: "0.5rem 1rem",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 0, 0, 0)", // 完全透明
        borderRadius: "1rem",
        margin: "0.5rem",
        width: "calc(100% - 1rem)",
        duration: 0.3,
        ease: "power2.out",
      })

      // Hide desktop menu items and show hamburger when scrolled
      if (desktopMenuRef.current && hamburgerRef.current) {
        gsap.to(desktopMenuRef.current, {
          opacity: 0,
          display: "none",
          duration: 0.2,
        })
        gsap.to(hamburgerRef.current, {
          opacity: 1,
          display: "block",
          duration: 0.2,
          delay: 0.1,
        })
      }
    } else {
      gsap.to(navRef.current, {
        height: "80px",
        padding: "1rem 2rem",
        backdropFilter: "blur(0px)",
        backgroundColor: "transparent",
        borderRadius: "0",
        margin: "0",
        width: "100%",
        duration: 0.3,
        ease: "power2.out",
      })

      // Show desktop menu items and hide hamburger when at top
      if (desktopMenuRef.current && hamburgerRef.current && !isMobile) {
        gsap.to(desktopMenuRef.current, {
          opacity: 1,
          display: "flex",
          duration: 0.2,
          delay: 0.1,
        })
        gsap.to(hamburgerRef.current, {
          opacity: 0,
          display: "none",
          duration: 0.2,
        })
      }
    }
  }, [isScrolled, theme, isMobile])

  // Handle menu animations
  useEffect(() => {
    if (!menuItemsRef.current) return

    if (isMenuOpen) {
      // Animate menu opening
      gsap.fromTo(
        menuItemsRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, display: "block", duration: 0.3, ease: "power2.out" },
      )
    } else {
      // Animate menu closing
      gsap.to(menuItemsRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (menuItemsRef.current) {
            menuItemsRef.current.style.display = "none"
          }
        },
      })
    }
  }, [isMenuOpen])

  // Close menu when clicking outside
  useEffect(() => {
    if (!mounted || !isMenuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen, mounted])

  // If not mounted yet, return null to prevent hydration mismatch
  if (!mounted) return null

  return (
    <div
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-all duration-300 flex items-center justify-between",
        isScrolled ? "h-16 px-4 lg:px-6" : "h-20 px-6 lg:px-8",
      )}
      style={{
        backgroundColor: "transparent", // 始终保持透明
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        borderRadius: isScrolled ? "1rem" : "0",
        margin: isScrolled ? "0.5rem" : "0",
        width: isScrolled ? "calc(100% - 1rem)" : "100%",
      }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Logo size={isScrolled ? "sm" : "md"} />
      </div>

      {/* Desktop Navigation */}
      <div
        ref={desktopMenuRef}
        className={cn("items-center space-x-1", isMobile ? "hidden" : "flex", isScrolled ? "lg:hidden" : "lg:flex")}
      >
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors",
              theme === "dark"
                ? "text-white/90 hover:text-white hover:bg-white/10"
                : "text-gray-700 hover:text-black hover:bg-black/5",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Hamburger Menu (visible on mobile or when scrolled) */}
      <div ref={menuRef} className={cn("flex items-center", isMobile ? "block" : isScrolled ? "block" : "hidden")}>
        <div
          ref={menuItemsRef}
          className={cn(
            "absolute top-full right-0 mt-2 p-2 rounded-lg shadow-lg hidden",
            theme === "dark" ? "bg-gray-900/50" : "bg-white/50", // 菜单背景半透明
            isScrolled ? "mr-4" : "mr-6",
          )}
          style={{
            backdropFilter: "blur(10px)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "block px-4 py-2 rounded-md text-sm font-medium transition-colors",
                theme === "dark"
                  ? "text-white/90 hover:text-white hover:bg-white/10"
                  : "text-gray-700 hover:text-black hover:bg-black/5",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            ref={hamburgerRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "p-2 rounded-md transition-colors",
              theme === "dark"
                ? "text-white/90 hover:text-white hover:bg-white/10"
                : "text-gray-700 hover:text-black hover:bg-black/5",
              isMobile ? "block" : isScrolled ? "block" : "hidden",
            )}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomeNav