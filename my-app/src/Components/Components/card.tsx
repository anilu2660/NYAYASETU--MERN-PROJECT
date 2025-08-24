import * as React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

const baseClasses = "rounded-xl border border-black/10 dark:border-white/10 bg-card text-card-foreground shadow-sm";

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className = "", ...props }, ref) => {
  return <div ref={ref} className={`${baseClasses} ${className}`} {...props} />;
});

Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => {
    return <div ref={ref} className={`px-6 pt-6 ${className}`} {...props} />;
  }
);

CardHeader.displayName = "CardHeader";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => {
    return <div ref={ref} className={`px-6 pb-6 ${className}`} {...props} />;
  }
);

CardContent.displayName = "CardContent";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", ...props }, ref) => {
    return <h3 ref={ref} className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />;
  }
);

CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => {
    return <p ref={ref} className={`text-sm text-muted-foreground ${className}`} {...props} />;
  }
);

CardDescription.displayName = "CardDescription";

export default Card;


