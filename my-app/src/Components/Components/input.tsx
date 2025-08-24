import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "glass";
}

const baseClasses =
  "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 border-black/10 dark:border-white/10";

const variantClasses: Record<NonNullable<InputProps["variant"]>, string> = {
  default: "",
  glass:
    "border-white/10 bg-white/5 text-foreground/90 placeholder:text-foreground/50 backdrop-blur focus:bg-white/10",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const variantClass = variantClasses[variant] ?? variantClasses.default;
    return (
      <input ref={ref} className={`${baseClasses} ${variantClass} ${className}`} {...props} />
    );
  }
);

Input.displayName = "Input";

export default Input;


