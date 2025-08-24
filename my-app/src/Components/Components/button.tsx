import * as React from "react";

type ButtonVariant = "default" | "glass" | "glow" | "outline";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2";

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-foreground text-background hover:opacity-90",
  glass:
    "border border-white/10 bg-white/5 text-foreground/90 backdrop-blur hover:bg-white/10",
  glow:
    "bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_28px_rgba(59,130,246,0.7)]",
  outline:
    "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const variantClass = variantClasses[variant] ?? variantClasses.default;
    return (
      <button ref={ref} className={`${baseClasses} ${variantClass} ${className}`} {...props} />
    );
  }
);

Button.displayName = "Button";

export default Button;


