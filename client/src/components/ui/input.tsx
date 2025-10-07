import * as React from "react";

import { cn } from "../../lib/utils/cn.utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full text-white rounded-md  bg-[#3a3a3a] px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-background",
        className
      )}
      {...props}
    />
  );
}

export { Input };
