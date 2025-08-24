import * as React from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const baseClasses = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className = "", ...props }, ref) => {
  return <label ref={ref} className={`${baseClasses} ${className}`} {...props} />;
});

Label.displayName = "Label";

export default Label;


