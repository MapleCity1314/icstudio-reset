import React, { useCallback } from 'react';

const Nav: React.FC = () => {
  const handleScroll = useCallback(() => {
    if (!isScrolling) return;

    const currentTime = Date.now();
    if (currentTime - lastScrollTime.current < 50) return;
    lastScrollTime.current = currentTime;

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

    // 更新滚动进度
    setScrollProgress(scrollPercentage);

    // 计算当前section
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    let minDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = rect.height;
      const sectionMiddle = sectionTop + sectionHeight / 2;
      const distance = Math.abs(scrollPosition + windowHeight / 2 - sectionMiddle);

      if (distance < minDistance) {
        minDistance = distance;
        currentSection = section.id;
      }
    });

    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }

    // 更新导航栏状态
    setIsScrolled(scrollPosition > 50);
    setIsAtTop(scrollPosition < 10);
    setIsAtBottom(scrollPosition + windowHeight >= documentHeight - 10);
  }, [isScrolling, activeSection]);

  return (
    // Rest of the component code
  );
};

export default Nav; 