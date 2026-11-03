"use client";

import { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import { MobiusLoopIcon } from "@/components/ui/mobius-loop-icon";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);

      if (currentScrollY <= 8) {
        setIsCollapsed(false);
        lastScrollY.current = currentScrollY;
      } else if (Math.abs(currentScrollY - lastScrollY.current) >= 16) {
        setIsCollapsed(true);
        lastScrollY.current = currentScrollY;
      }
    };

    lastScrollY.current = window.scrollY;
    const initialFrame = window.requestAnimationFrame(() => {
      setIsCollapsed(window.scrollY > 8);
    });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="top-0 z-50 sticky flex justify-center px-4 sm:px-8 py-4 sm:py-6 w-full">
      <div className="relative w-full max-w-4xl h-14 sm:h-16">
        <nav
          aria-label="Primary navigation"
          className={`top-0 left-1/2 absolute flex justify-between items-center bg-background shadow-[0_12px_40px_-24px_rgb(0_0_0/0.4)] dark:shadow-[0_12px_40px_-24px_rgb(0_0_0/0.8)] border border-foreground/10 overflow-hidden -translate-x-1/2 transition-[width,height,padding,border-radius] duration-300 ease-in-out motion-reduce:transition-none ${isCollapsed ? "size-12 rounded-full px-0" : "w-full h-14 sm:h-16 rounded-[1.1rem] px-5 sm:px-8"}`}
        >
          <a
            href="#selected-work"
            aria-label="Nirmal Kharal, back to introduction"
            tabIndex={isCollapsed ? -1 : undefined}
            inert={isCollapsed}
            className={`shrink-0 justify-self-start hover:opacity-60 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 font-[family-name:var(--font-depMono)] font-black text-foreground text-2xl sm:text-3xl tracking-[-0.14em] transition-[opacity,transform,visibility] duration-150 motion-reduce:transition-none ${isCollapsed ? "invisible -translate-x-2 opacity-0" : "visible translate-x-0 opacity-100"}`}
          >
            NK
          </a>

          <button
            type="button"
            onClick={() => {
              lastScrollY.current = window.scrollY;
              setIsCollapsed((collapsed) => !collapsed);
            }}
            aria-expanded={!isCollapsed}
            aria-label={
              isCollapsed ? "Expand navigation" : "Collapse navigation"
            }
            title={isCollapsed ? "Expand navigation" : "Collapse navigation"}
            className={`absolute left-1/2 grid -translate-x-1/2 place-items-center rounded-full text-foreground/80 transition-[width,height,color,background-color] duration-200 motion-reduce:transition-none hover:bg-foreground/8 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${isCollapsed ? "size-10" : "size-12"}`}
          >
            <MobiusLoopIcon
              className={`transition-[width,height] duration-200 motion-reduce:transition-none ${isCollapsed ? "size-7" : "size-9 sm:size-10"}`}
            />
          </button>

          <div
            inert={isCollapsed}
            className={`flex shrink-0 items-center gap-0.5 min-[375px]:gap-1 sm:gap-3 ml-auto transition-[opacity,transform,visibility] duration-150 motion-reduce:transition-none ${isCollapsed ? "invisible translate-x-2 opacity-0" : "visible translate-x-0 opacity-100"}`}
          >
            <AnimatedThemeToggler
              variant="circle"
              aria-label="Toggle color theme"
              title="Toggle color theme"
              className="place-items-center grid hover:bg-foreground/8 rounded-full focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 size-7 min-[375px]:size-8 sm:size-10 [&_svg]:size-4 sm:[&_svg]:size-[1.1rem] text-foreground/70 hover:text-foreground transition-colors"
            />
            <span className="hidden min-[375px]:block bg-border w-px h-5 sm:h-6" aria-hidden="true" />
            <a
              href="https://github.com/kharalnirmal"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Nirmal Kharal on GitHub"
              title="GitHub"
              className="place-items-center grid hover:bg-foreground/8 rounded-full focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 size-7 min-[375px]:size-8 sm:size-10 text-foreground/70 hover:text-foreground transition-colors"
            >
              <FaGithub className="size-4 sm:size-5" aria-hidden="true" />
            </a>
            <span className="hidden min-[375px]:block bg-border w-px h-5 sm:h-6" aria-hidden="true" />
            <a
              href="https://www.linkedin.com/in/kharalnirmal/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Nirmal Kharal on LinkedIn"
              title="LinkedIn"
              className="place-items-center grid hover:bg-foreground/8 rounded-full focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 size-7 min-[375px]:size-8 sm:size-10 text-foreground/70 hover:text-foreground transition-colors"
            >
              <FaLinkedinIn className="size-4 sm:size-5" aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
