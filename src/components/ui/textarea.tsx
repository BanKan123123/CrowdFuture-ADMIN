import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex h-32 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
