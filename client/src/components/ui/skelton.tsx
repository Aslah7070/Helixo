import { cn } from "../../lib/utils/cn.utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string; // Tailwind width class, e.g. "w-32"
  height?: string; // Tailwind height class, e.g. "h-6"
  rounded?: string; // Tailwind rounded class, e.g. "rounded-md"
}

function Skeleton({ width, height, rounded = "rounded-md", className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse", width, height, rounded, className)}
      {...props}
    />
  );
}

export { Skeleton };
