'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FallingText from '@/components/anime/FallingText/FallingText';
import { OrbitingCircles } from '@/components/magicui/orbiting-circles';
import { ProjectsSection } from './projects-section';

const Icons = {
      gitHub: () => (
            <svg width="100" height="100" viewBox="0 0 438.549 438.549">
                  <path
                        fill="currentColor"
                        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                  />
            </svg>
      ),
      next: () => (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80">
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
      openai: () => (
            <svg
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-black dark:fill-white"
            >
                  <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
            </svg>
      ),
      googleDrive: () => (
            <svg width="100" height="100" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                  <path
                        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
                        fill="#0066da"
                  />
                  <path
                        d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
                        fill="#00ac47"
                  />
                  <path
                        d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
                        fill="#ea4335"
                  />
                  <path
                        d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
                        fill="#00832d"
                  />
                  <path
                        d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
                        fill="#2684fc"
                  />
                  <path
                        d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
                        fill="#ffba00"
                  />
            </svg>
      ),
      whatsapp: () => (
            <svg width="100" height="100" viewBox="0 0 175.216 175.552" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                        <linearGradient
                              id="b"
                              x1="85.915"
                              x2="86.535"
                              y1="32.567"
                              y2="137.092"
                              gradientUnits="userSpaceOnUse"
                        >
                              <stop offset="0" stopColor="#57d163" />
                              <stop offset="1" stopColor="#23b33a" />
                        </linearGradient>
                        <filter
                              id="a"
                              width="1.115"
                              height="1.114"
                              x="-.057"
                              y="-.057"
                              colorInterpolationFilters="sRGB"
                        >
                              <feGaussianBlur stdDeviation="3.531" />
                        </filter>
                  </defs>
                  <path
                        d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
                        fill="#b3b3b3"
                        filter="url(#a)"
                  />
                  <path
                        d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
                        fill="#ffffff"
                  />
                  <path
                        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
                        fill="url(#linearGradient1780)"
                  />
                  <path
                        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
                        fill="url(#b)"
                  />
                  <path
                        d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
                        fill="#ffffff"
                        fillRule="evenodd"
                  />
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

      // 旋转圆的内容
      const orbitElements = [
            <Icons.whatsapp key="1" />,
            <Icons.next key="2" />,
            <Icons.openai key="3" />,
            <Icons.googleDrive key="4" />,
            <Icons.whatsapp key="5" />,
      ];

      return (
            <>
                  <section
                        id="creative"
                        ref={sectionRef}
                        className="relative py-24 md:py-32 px-4 flex items-center justify-center min-h-screen overflow-hidden bg-black dark:bg-black"
                  >
                        {/* Aurora背景
        <div className="absolute inset-0 z-0">
          <Aurora 
            colorStops={['#836FFF', '#15F5BA', '#69F2FF']} 
            amplitude={1.2} 
            blend={0.6}
            speed={0.8}
          />
        </div> */}

                        {/* 背景动画文字 */}
                        <div className="absolute inset-0 opacity-30 overflow-hidden pointer-events-none">
                              <FallingText
                                    text={`using Vue3 React Next.js Django Tauri Electron SpringBoot AI to create creative AI products`}
                                    highlightWords={[
                                          'Vue3',
                                          'React',
                                          'Next.js',
                                          'Django',
                                          'Tauri',
                                          'Electron',
                                          'SpringBoot',
                                          'AI',
                                    ]}
                                    trigger="scroll"
                                    backgroundColor="transparent"
                                    wireframes={false}
                                    gravity={0.56}
                                    fontSize="2.5rem"
                                    mouseConstraintStiffness={0.9}
                              />
                        </div>

                        {/* 轨道圆效果 */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <div className="relative size-full max-w-4xl max-h-4xl">
                                    <OrbitingCircles
                                          radius={320}
                                          duration={60}
                                          iconSize={20}
                                          className="opacity-50"
                                          path={true}
                                    >
                                          {orbitElements}
                                    </OrbitingCircles>

                                    <OrbitingCircles
                                          radius={420}
                                          duration={80}
                                          reverse={true}
                                          iconSize={24}
                                          className="opacity-60"
                                          path={true}
                                    >
                                          {orbitElements}
                                    </OrbitingCircles>
                              </div>
                        </div>

                        {/* 主要内容 */}
                        <div
                              ref={containerRef}
                              className="container mx-auto max-w-3xl z-10 backdrop-blur-sm bg-black/20 p-10 rounded-3xl"
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

                                    {/* 普通按钮 */}
                                    <div ref={buttonRef} className="mt-6">
                                          <Button
                                                size="lg"
                                                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-full py-6 px-8 text-lg group"
                                                onClick={() => window.open('/about', '_self')}
                                          >
                                                了解更多
                                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                          </Button>
                                    </div>
                              </div>
                        </div>
                  </section>

                  {/* 添加项目部分 */}
                  <ProjectsSection />
            </>
      );
};

export default CreativeSection;
