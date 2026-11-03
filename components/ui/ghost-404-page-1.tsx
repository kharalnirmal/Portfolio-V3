"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { MotionConfig, motion, useReducedMotion, type Variants } from "motion/react";

import SpecularButton from "@/components/ui/specular-button";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const numberVariants: Variants = {
  hidden: (direction: number) => ({ opacity: 0, x: direction * 18, rotate: direction * 2 }),
  visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 1.1, ease } },
};

export function NotFound() {
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <main className="flex min-h-svh flex-col items-center justify-center bg-background px-6 py-16 text-foreground">
        <motion.div
          className="w-full max-w-xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} aria-hidden="true" className="mb-6 flex select-none items-center justify-center gap-3 sm:mb-8 sm:gap-6">
            <motion.span variants={numberVariants} custom={-1} className="font-[family-name:var(--font-clash)] text-[120px] font-semibold leading-none tracking-tight text-foreground/70 sm:text-[180px]">
              4
            </motion.span>
            <div className="relative">
              <motion.div
                animate={reduceMotion ? { y: 0, rotate: 0 } : { y: [0, -8, 0, 8, 0], rotate: [0, -2, 0, 2, 0] }}
                transition={{ duration: 6.4, ease: "easeInOut", repeat: Infinity, times: [0, 0.25, 0.5, 0.75, 1] }}
              >
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: -4 }}
                  transition={{ type: "spring", stiffness: 110, damping: 18 }}
                >
                  <Image
                    src="/ghost-404.png"
                    alt=""
                    width={120}
                    height={120}
                    className="size-24 object-contain sm:size-32"
                    draggable={false}
                    preload
                  />
                </motion.div>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 left-1/4 h-2 w-1/2 rounded-full bg-foreground/10 blur-sm"
                animate={reduceMotion ? { scaleX: 1, opacity: 0.6 } : { scaleX: [1, 0.85, 1, 1.1, 1], opacity: [0.6, 0.4, 0.6, 0.7, 0.6] }}
                transition={{ duration: 6.4, ease: "easeInOut", repeat: Infinity, times: [0, 0.25, 0.5, 0.75, 1] }}
              />
            </div>
            <motion.span variants={numberVariants} custom={1} className="font-[family-name:var(--font-clash)] text-[120px] font-semibold leading-none tracking-tight text-foreground/70 sm:text-[180px]">
              4
            </motion.span>
          </motion.div>

          <motion.p variants={itemVariants} className="mb-3 -rotate-3 font-[family-name:var(--font-caveat)] text-3xl text-[var(--portfolio-accent)] sm:text-4xl">
            A little lost? No worries.
          </motion.p>
          <motion.h1 variants={itemVariants} className="mb-4 font-[family-name:var(--font-clash)] text-3xl font-medium tracking-tight sm:text-5xl">
            This page is a ghost.
          </motion.h1>
          <motion.p variants={itemVariants} className="mx-auto mb-8 max-w-sm text-base leading-relaxed text-muted-foreground sm:mb-10 sm:text-lg">
            The link may be broken, or the page has moved.
            Either way, there&apos;s more to explore back home.
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center">
            <SpecularButton
              href="/"
              size="md"
              tint="var(--foreground)"
              textColor="var(--foreground)"
              lineColor="#c084fc"
              baseColor="#737373"
            >
              Let’s head home
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </SpecularButton>
          </motion.div>
          <motion.details variants={itemVariants} className="mx-auto mt-10 max-w-xs text-sm text-muted-foreground">
            <summary className="mx-auto w-fit cursor-pointer rounded-sm underline decoration-current/40 underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              What does 404 mean?
            </summary>
            <p className="mt-3 leading-relaxed">
              A 404 means this address doesn&apos;t point to a page. It may have moved, or the link might contain a typo.
            </p>
          </motion.details>
        </motion.div>
      </main>
    </MotionConfig>
  );
}
