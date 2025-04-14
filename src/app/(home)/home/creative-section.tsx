'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextPressure from '@/components/anime/TextPressure/TextPressure';
import { OrbitingCircles } from '@/components/magicui/orbiting-circles';
import Magnet from '@/components/anime/Magnet/Magnet';
import GridDistortion from '@/components/anime/GridDistortion/GridDistortion';

// 技术栈图标
const TechIcons = {
      vue: () => (
            <svg width="40" height="40" viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg">
                  <path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/>
                  <path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/>
            </svg>
      ),
      react: () => (
            <svg width="40" height="40" viewBox="0 0 841.9 595.3" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#61dafb">
                        <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/>
                        <circle cx="420.9" cy="296.5" r="45.7"/>
                        <path d="M520.5 78.1z"/>
                  </g>
            </svg>
      ),
      nextjs: () => (
            <svg width="40" height="40" viewBox="0 0 394 80" xmlns="http://www.w3.org/2000/svg">
                  <path
                        fill="#000"
                        d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"
                  />
                  <path
                        fill="#000"
                        d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"
                  />
            </svg>
      ),
      django: () => (
            <svg width="40" height="40" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#092e20" d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256S397.385 0 256 0zm0 64c106.039 0 192 85.961 192 192s-85.961 192-192 192S64 362.039 64 256 149.961 64 256 64z"/>
                  <path fill="#092e20" d="M256 128c-70.692 0-128 57.308-128 128s57.308 128 128 128 128-57.308 128-128-57.308-128-128-128zm0 64c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64 28.654-64 64-64z"/>
                  <path fill="#092e20" d="M256 192c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64zm0 64c0 35.346-28.654 64-64 64s-64-28.654-64-64 28.654-64 64-64 64 28.654 64 64z"/>
            </svg>
      ),
      tauri: () => (
            <svg width="40" height="40" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#24C8DB" d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256S397.385 0 256 0zm0 64c106.039 0 192 85.961 192 192s-85.961 192-192 192S64 362.039 64 256 149.961 64 256 64z"/>
                  <path fill="#24C8DB" d="M256 128c-70.692 0-128 57.308-128 128s57.308 128 128 128 128-57.308 128-128-57.308-128-128-128zm0 64c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64 28.654-64 64-64z"/>
                  <path fill="#24C8DB" d="M256 192c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64zm0 64c0 35.346-28.654 64-64 64s-64-28.654-64-64 28.654-64 64-64 64 28.654 64 64z"/>
            </svg>
      ),
      electron: () => (
            <svg width="40" height="40" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#47848F" d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256S397.385 0 256 0zm0 64c106.039 0 192 85.961 192 192s-85.961 192-192 192S64 362.039 64 256 149.961 64 256 64z"/>
                  <path fill="#47848F" d="M256 128c-70.692 0-128 57.308-128 128s57.308 128 128 128 128-57.308 128-128-57.308-128-128-128zm0 64c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64 28.654-64 64-64z"/>
                  <path fill="#47848F" d="M256 192c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64zm0 64c0 35.346-28.654 64-64 64s-64-28.654-64-64 28.654-64 64-64 64 28.654 64 64z"/>
            </svg>
      ),
      springboot: () => (
            <svg width="40" height="40" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#6DB33F" d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256S397.385 0 256 0zm0 64c106.039 0 192 85.961 192 192s-85.961 192-192 192S64 362.039 64 256 149.961 64 256 64z"/>
                  <path fill="#6DB33F" d="M256 128c-70.692 0-128 57.308-128 128s57.308 128 128 128 128-57.308 128-128-57.308-128-128-128zm0 64c35.346 0 64 28.654 64 64s-28.654 64-64 64-64-28.654-64-64 28.654-64 64-64z"/>
                  <path fill="#6DB33F" d="M256 192c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64zm0 64c0 35.346-28.654 64-64 64s-64-28.654-64-64 28.654-64 64-64 64 28.654 64 64z"/>
            </svg>
      ),
      ai: () => (
            <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#10B981" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
      ),
};

const CreativeSection = () => {
      const sectionRef = useRef<HTMLDivElement>(null);
      const containerRef = useRef<HTMLDivElement>(null);
      const titleRef = useRef<HTMLHeadingElement>(null);
      const subtitleRef = useRef<HTMLParagraphElement>(null);
      const descriptionRef = useRef<HTMLDivElement>(null);
      const buttonRef = useRef<HTMLDivElement>(null);
      const techStackRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
            gsap.registerPlugin(ScrollTrigger);

            // 容器入场动画
            if (containerRef.current) {
                  gsap.fromTo(
                        containerRef.current,
                        { y: 50, opacity: 0 },
                        {
                              y: 0,
                              opacity: 1,
                              duration: 0.8,
                              ease: 'power2.out',
                              scrollTrigger: {
                                    trigger: containerRef.current,
                                    start: 'top 80%',
                              },
                        },
                  );
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
                              ease: 'power3.out',
                              scrollTrigger: {
                                    trigger: titleRef.current,
                                    start: 'top 85%',
                              },
                        },
                  );
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
                              ease: 'power2.out',
                              scrollTrigger: {
                                    trigger: subtitleRef.current,
                                    start: 'top 85%',
                              },
                        },
                  );
            }

            // 描述文字动画
            if (descriptionRef.current) {
                  const paragraphs = descriptionRef.current.querySelectorAll('p');
                  gsap.fromTo(
                        paragraphs,
                        { y: 30, opacity: 0 },
                        {
                              y: 0,
                              opacity: 1,
                              stagger: 0.2,
                              duration: 0.8,
                              delay: 0.5,
                              ease: 'power2.out',
                              scrollTrigger: {
                                    trigger: descriptionRef.current,
                                    start: 'top 85%',
                              },
                        },
                  );
            }

            // 技术栈动画
            if (techStackRef.current) {
                  const icons = techStackRef.current.querySelectorAll('.tech-icon');
                  gsap.fromTo(
                        icons,
                        { y: 30, opacity: 0, scale: 0.8 },
                        {
                              y: 0,
                              opacity: 1,
                              scale: 1,
                              stagger: 0.1,
                              duration: 0.6,
                              delay: 0.8,
                              ease: 'back.out(1.7)',
                              scrollTrigger: {
                                    trigger: techStackRef.current,
                                    start: 'top 85%',
                              },
                        },
                  );
            }

            // 按钮动画
            if (buttonRef.current) {
                  gsap.fromTo(
                        buttonRef.current,
                        { opacity: 0, y: 10 },
                        {
                              opacity: 1,
                              y: 0,
                              duration: 0.6,
                              delay: 1.5,
                              ease: 'power2.out',
                              scrollTrigger: {
                                    trigger: buttonRef.current,
                                    start: 'top 90%',
                              },
                        },
                  );
            }

            return () => {
                  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
      }, []);

      return (
            <>
                  <section
                        id="creative"
                        ref={sectionRef}
                        className="relative py-24 md:py-32 px-4 flex items-center justify-center min-h-screen overflow-hidden bg-black dark:bg-black"
                  >
                        {/* 主要内容 */}
                        <div
                              ref={containerRef}
                              className="container mx-auto max-w-6xl z-10"
                        >
                              <div className="flex flex-col items-center justify-center text-center space-y-12">
                                    {/* 标题 */}
                                    <h2
                                          ref={titleRef}
                                          className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-violet-300"
                                    >
                                          年轻，敢想，敢创
                                    </h2>

                                    {/* 副标题 */}
                                    <p
                                          ref={subtitleRef}
                                          className="text-xl md:text-2xl font-medium text-gray-300 italic"
                                    >
                                          Be Young, Be Creative, Be Bold
                                    </p>

                                    {/* GridDistortion 区域 */}
                                    <div className="flex items-center justify-center w-full h-[400px] relative rounded-3xl overflow-hidden my-12 mx-auto">
                                          <div className="absolute inset-0 w-full h-full">
                                                <GridDistortion
                                                      imageSrc="/bg/background.jpg"
                                                      grid={10}
                                                      mouse={0.1}
                                                      strength={0.15}
                                                      relaxation={0.9}
                                                      className="w-full h-full"
                                                />
                                          </div>
                                          
                                          {/* TextPressure 组件 */}
                                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="w-full h-full flex items-center justify-center">
                                                      <TextPressure
                                                            text="Creators"
                                                            fontFamily="Compressa VF"
                                                            fontUrl="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2"
                                                            width={true}
                                                            weight={true}
                                                            italic={true}
                                                            alpha={false}
                                                            flex={true}
                                                            stroke={true}
                                                            scale={true}
                                                            textColor="#FFFFFF"
                                                            strokeColor="#3B82F6"
                                                            strokeWidth={2}
                                                            className="w-full h-full"
                                                            minFontSize={48}
                                                      />
                                                </div>
                                          </div>
                                    </div>

                                    {/* 描述内容 */}
                                    <div
                                          ref={descriptionRef}
                                          className="space-y-6 text-md md:text-lg text-gray-300 max-w-2xl"
                                    >
                                          <p>
                                                我们是一群充满激情和创造力的年轻人，致力于用科技和创新改变世界。在无限创作工作室，我们相信每个想法都有实现的可能。
                                          </p>
                                          <p>
                                                从前端到后端，从移动应用到桌面软件，我们精通各种技术栈，包括Vue3、React、Next.js、Django、Tauri、Electron和SpringBoot。但技术只是工具，真正驱动我们的是通过AI和前沿技术解决实际问题的热情。
                                          </p>
                                          <p>加入我们，一起探索无限可能，让创意照亮未来。</p>
                                    </div>

                                    {/* 技术栈展示 */}
                                    <div 
                                          ref={techStackRef}
                                          className="flex flex-wrap justify-center gap-8 mt-8"
                                    >
                                          {Object.entries(TechIcons).map(([key, Icon]) => (
                                                <div 
                                                      key={key} 
                                                      className="tech-icon bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                                                >
                                                      <Icon />
                                                </div>
                                          ))}
                                    </div>

                                    {/* 按钮 */}
                                    <div ref={buttonRef} className="mt-6">
                                          <Button
                                                size="lg"
                                                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-full w-24 h-24 p-0 flex items-center justify-center text-lg group"
                                                onClick={() => window.open('/about', '_self')}
                                          >
                                                <Magnet magnetStrength={1.5} className="inline-block">
                                                      <ArrowRight className="h-8 w-8 transition-transform group-hover:translate-x-1" />
                                                </Magnet>
                                          </Button>
                                    </div>
                              </div>
                        </div>
                  </section>
            </>
      );
};

export default CreativeSection;
