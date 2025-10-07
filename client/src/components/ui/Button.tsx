/* eslint-disable react-refresh/only-export-components */

"use client"
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils/cn.utils";

const buttonVariants = cva(
  "inline-flex items-center  gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        blue: "w-full bg-[#3b82f6] hover:bg-blue-600  text-white font-medium py-2  rounded mt-6",
        main: "bg-main text-white hover:bg-opacity-80 shadow",
        default: "bg-transparent border  text-gray-600 shadow hover:bg-primary/90 hover:border-white",
        destructive: "bg-destructive text-sm shadow-xs hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-[#1e1e1e] text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        google:"flex items-center w-full gap-3 bg-primary py-3 text-white  dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:bg-gray-800 transition duration-200 text-gray-800 dark:text-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 ",
        xl: "h-10 px-12",
        xxl:"h-10 px-17",
        icon: "h-10 px-1",
      },
  
      rounded: {
        default: "rounded-full",
        none: "rounded-none",
        md: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      
    },
  } 
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
