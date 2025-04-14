'use client';

import { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { AiChatSimulator } from './ai-chat-simulator';
import Image from 'next/image';
import ImageTrail from '@/components/anime/ImageTrail/ImageTrail';

gsap.registerPlugin(ScrollTrigger);

// 项目数据
const projects = [
      {
            title: 'AI图像生成器',
            description: '基于最新的生成模型，创建高质量的艺术作品和视觉内容。',
            imageUrl: '/placeholder.svg?height=300&width=400',
            color: 'from-blue-500 to-purple-500',
      },
      {
            title: '智能助手平台',
            description: '为企业和个人提供定制化的AI助手服务，提高工作效率。',
            imageUrl: '/placeholder.svg?height=300&width=400',
            color: 'from-purple-500 to-pink-500',
      },
      {
            title: '数据可视化工具',
            description: '将复杂数据转化为直观的视觉呈现，帮助用户理解和分析信息。',
            imageUrl: '/placeholder.svg?height=300&width=400',
            color: 'from-indigo-500 to-blue-500',
      },
];

export function ProjectsSection() {
      const [mounted, setMounted] = useState(false);
      const { theme } = useTheme();
      const sectionRef = useRef<HTMLDivElement>(null);
      const projectsRef = useRef<HTMLDivElement>(null);
      const titleRef = useRef<HTMLHeadingElement>(null);
      const cardsRef = useRef<HTMLDivElement>(null);
      const demoRef = useRef<HTMLDivElement>(null);

      // 解决水合问题
      useEffect(() => {
            setMounted(true);
      }, []);

      useEffect(() => {
            if (!mounted) return;

            const projects = projectsRef.current?.children;
            if (!projects) return;

            // 为每个项目创建动画
            Array.from(projects).forEach((project, index) => {
                  gsap.from(project, {
                        scrollTrigger: {
                              trigger: project,
                              start: 'top bottom-=100',
                              end: 'top center',
                              scrub: 1,
                        },
                        y: 100,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out',
                  });
            });

            return () => {
                  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
      }, [mounted]);

      // 如果组件未挂载，返回空内容
      if (!mounted) return null;

      return (
            <section
                  id="projects"
                  ref={sectionRef}
                  className="min-h-screen w-full bg-background transition-colors duration-300"
            >
                  <ImageTrail
                        items={[
                              'https://picsum.photos/id/287/300/300',
                              'https://picsum.photos/id/1001/300/300',
                              'https://picsum.photos/id/1025/300/300',
                              'https://picsum.photos/id/1026/300/300',
                              'https://picsum.photos/id/1027/300/300',
                              'https://picsum.photos/id/1028/300/300',
                              'https://picsum.photos/id/1029/300/300',
                              'https://picsum.photos/id/1030/300/300',
                              // ...
                        ]}
                        variant={3}
                  />
                  <div className="container mx-auto px-4 py-20">
                        <h2
                              ref={titleRef}
                              className={`text-4xl md:text-5xl font-bold mb-16 text-center ${
                                    theme === 'dark' ? 'text-white' : 'text-black'
                              }`}
                        >
                              Our Projects
                        </h2>

                        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {projects.map((project, index) => (
                                    <Card
                                          key={index}
                                          className={`group relative overflow-hidden rounded-lg ${
                                                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                                          } transition-all duration-300 hover:shadow-xl`}
                                    >
                                          <div className={`h-48 bg-gradient-to-r ${project.color}`}>
                                                <div className="w-full h-full flex items-center justify-center text-white">
                                                      <Image
                                                            src={project.imageUrl || '/placeholder.svg'}
                                                            alt={project.title}
                                                            width={400}
                                                            height={300}
                                                            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                                                      />
                                                </div>
                                          </div>
                                          <CardContent className="p-6">
                                                <h3
                                                      className={`text-xl font-semibold mb-2 ${
                                                            theme === 'dark' ? 'text-white' : 'text-black'
                                                      }`}
                                                >
                                                      {project.title}
                                                </h3>
                                                <p
                                                      className={`${
                                                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                                      }`}
                                                >
                                                      {project.description}
                                                </p>
                                                <Button variant="outline" size="sm" className="group">
                                                      了解更多
                                                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </Button>
                                          </CardContent>
                                    </Card>
                              ))}
                        </div>

                        <div ref={demoRef} className="mt-16">
                              <AiChatSimulator />
                        </div>
                  </div>
            </section>
      );
}
