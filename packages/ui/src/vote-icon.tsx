"use client";

import { cn } from "@rallly/ui";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type * as React from "react";

export type VoteIconType = "yes" | "ifNeedBe" | "no" | "pending";

const voteIconVariants = cva("transition-[color] duration-200 ease-out-ui", {
  variants: {
    size: {
      sm: "size-3",
      md: "size-5",
    },
    type: {
      yes: "text-green-500",
      ifNeedBe: "text-amber-400",
      no: "text-gray-500",
      pending: "text-gray-400 dark:text-gray-500",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type VoteIconProps = {
  type?: VoteIconType;
  /**
   * Accessible label. Omit to render the icon as decorative (aria-hidden),
   * which is correct when adjacent text already names the vote.
   */
  title?: string;
  className?: string;
} & Omit<VariantProps<typeof voteIconVariants>, "type">;

const glyphs: Record<VoteIconType, string> = {
  yes: "M10 3a7 7 0 1 1 0 14a7 7 0 1 1 0-14",
  ifNeedBe: "M10 3L18 17H2Z",
  no: "M4 4L16 16M16 4L4 16",
  pending: "M5 10H15",
};

function Glyph({ type }: { type: VoteIconType }) {
  return (
    <path
      d={glyphs[type]}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function IconFrame({
  type,
  size,
  title,
  className,
  children,
}: VoteIconProps & { type: VoteIconType; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cn(voteIconVariants({ size, type }), className)}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Availability uses ○ / △ / ×; unanswered stays a distinct dash. */
export function VoteIcon({ type = "pending", ...props }: VoteIconProps) {
  return (
    <IconFrame type={type} {...props}>
      <Glyph type={type} />
    </IconFrame>
  );
}

const EASE_OUT_UI = [0.23, 1, 0.32, 1] as const;
const ORIGIN = {
  transformOrigin: "10px 10px",
  transformBox: "view-box",
} as const;

/** Swap symbols when a control cycles its vote. */
export function AnimatedVoteIcon({
  type = "pending",
  ...props
}: VoteIconProps) {
  const reduceMotion = useReducedMotion();
  const transition = { duration: 0.2, ease: EASE_OUT_UI };
  const hidden = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, transform: "scale(0.5)" };
  const shown = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, transform: "scale(1)" };

  return (
    <IconFrame type={type} {...props}>
      <AnimatePresence initial={false}>
        <motion.g
          key={type}
          initial={hidden}
          animate={shown}
          exit={hidden}
          transition={transition}
          style={ORIGIN}
        >
          <Glyph type={type} />
        </motion.g>
      </AnimatePresence>
    </IconFrame>
  );
}
