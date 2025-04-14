'use client';

import { useEffect, useRef } from 'react';

interface circles {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      color: string;
}

// 定义组件接口类型
interface HeroBgProps {
      children: React.ReactNode;
      // 圆形大小配置
      minRadius?: number;    // 最小圆半径
      maxRadius?: number;    // 最大圆半径
      // 动画速度控制
      speedFactor?: number;  // 速度系数，值越大移动越快
      // 其他可选配置
      colors?: string[];     // 自定义颜色
}

const HeroBg = ({ 
      children, 
      minRadius = 200,      // 默认最小圆半径
      maxRadius = 400,      // 默认最大圆半径 
      speedFactor = 1.8,    // 默认速度系数，提高为原来的1.8倍
      colors = ['#836FFF', '#15F5BA', '#69F2FF']  // 默认颜色
}: HeroBgProps) => {
      const canvasRef = useRef<HTMLCanvasElement>(null);
      const circlesRef = useRef<circles[]>([]);
      const animationFrameRef = useRef<number | undefined>(undefined);

      function randomBetween(min: number, max: number) {
            return Math.random() * (max - min) + min;
      }

      // 根据屏幕宽度计算圆形的合适半径
      function calculateRadius(screenWidth: number) {
            // 设置屏幕宽度范围
            const minScreenWidth = 320;
            const maxScreenWidth = 1920;
            
            // 限制屏幕宽度在范围内
            const clampedWidth = Math.max(minScreenWidth, Math.min(screenWidth, maxScreenWidth));
            
            // 计算比例尺缩放系数
            const scale = (clampedWidth - minScreenWidth) / (maxScreenWidth - minScreenWidth);
            
            // 在大屏幕上使用非线性缩放，让圆形在大屏幕上相对小一些
            const nonLinearScale = Math.pow(scale, 1.5);
            
            // 计算半径，根据传入的最小和最大半径
            return minRadius + nonLinearScale * (maxRadius - minRadius);
      }

      function initCircles() {
            if (!canvasRef.current) return;
            
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            circlesRef.current = [];

            // 根据屏幕宽度调整圆形数量，小屏幕上减少圆形数量
            const baseCount = Math.max(5, Math.min(20, Math.floor(window.innerWidth / 150)));
            
            for (let i = 0; i < baseCount; i++) {
                  // 根据当前屏幕宽度计算圆形半径
                  const baseRadius = calculateRadius(window.innerWidth);
                  // 为每个圆形添加一些随机变化，使它们大小不完全一致
                  const radius = randomBetween(baseRadius * 0.7, baseRadius * 1.3);

                  const x = randomBetween(radius, canvas.width - radius);
                  const y = randomBetween(radius, canvas.height - radius);

                  // 速度根据屏幕宽度和传入的速度系数调整
                  const baseSpeed = Math.min(1, window.innerWidth / 1000) * speedFactor;
                  const dx = randomBetween(window.innerWidth / -4000, window.innerWidth / 4000) * baseSpeed;
                  const dy = randomBetween(window.innerWidth / -4000, window.innerWidth / 4000) * baseSpeed;

                  const color = colors[Math.floor(Math.random() * colors.length)];

                  circlesRef.current.push({ x, y, radius, dx, dy, color });
            }
      }

      function drawCircles(circle: circles) {
            if (!canvasRef.current) return;
            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;
            
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
            
            // 使用透明度降低视觉冲击
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = circle.color;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.closePath();
      }

      function animate() {
            if (!canvasRef.current) return;
            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;
            
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            circlesRef.current.forEach((circle) => {
                  if (circle.x + circle.radius > canvasRef.current!.width || circle.x - circle.radius < 0) {
                        circle.dx = -circle.dx;
                  }

                  if (circle.y + circle.radius > canvasRef.current!.height || circle.y - circle.radius < 0) {
                        circle.dy = -circle.dy;
                  }
                  circle.x += circle.dx;
                  circle.y += circle.dy;

                  drawCircles(circle);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
      }

      function resizeCanvas() {
            if (!canvasRef.current) return;
            
            const currentWidth = window.innerWidth;
            canvasRef.current.width = currentWidth * 1.2; // 降低为1.2倍以减小绘制区域
            canvasRef.current.height = window.innerHeight;
            initCircles();
      }

      useEffect(() => {
            if (!canvasRef.current) return;
            
            resizeCanvas();
            initCircles();
            animate();

            const handleResize = () => {
                  resizeCanvas();
            };

            window.addEventListener('resize', handleResize);

            return () => {
                  window.removeEventListener('resize', handleResize);
                  if (animationFrameRef.current) {
                        cancelAnimationFrame(animationFrameRef.current);
                  }
            };
      }, []);

      return (
            <div className="h-screen min-h-[30em] flex justify-center items-center relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[hsla(0,0%,41%,0.25)] before:backdrop-blur-[70px] before:top-0 before:left-0 before:w-full before:h-full before:z-[1] before:mix-blend-overlay">
                  <canvas 
                        ref={canvasRef}
                        id="hero-bg" 
                        width={500} 
                        height={500}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen"
                  ></canvas>
                  {children}
            </div>
      );
};

export default HeroBg;
