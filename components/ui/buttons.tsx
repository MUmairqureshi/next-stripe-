import * as React from "react";
import Link from 'next/link';
import ExternalArrow from '@/components/ui/external-arrow';
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "btn-primary",
        destructive: "btn-error",
        outline: "btn-ghost backdrop-blur-md",
        text: "btn-text",
        ghost: "btn-ghost backdrop-blur-md",
        primary: "btn-primary",
        secondary: "btn-secondary",
        header: "btn-text",
        footer: "btn-text",
        link: "btn-text"
      },
      size: {
        default: "btn",
        sm: "btn btn-small",
        lg: "btn btn-large",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  );
});

Button.displayName = "Button";

type ButtonTwoProps = {
  text: string;
  url: string;
  email?: string;
  variant: "default" | "destructive" | "outline" | "ghost" | "primary" | "secondary" | "link" | "header" | "footer" | "text" | "link";
  size?: "default" | "sm" | "lg";
  className?: string;
};

const ButtonTwo: React.FC<ButtonTwoProps> = ({ text, url, size = 'default', variant = 'default', email, className }) => {
  const isInternal = url && url.includes('hikeclerb.com');
  const path = isInternal ? new URL(url).pathname : url;
  const href = email ? `mailto:${email}` : path;
  const buttonClassName = cn(buttonVariants({ size, variant, className }));

  return (
    <Link href={href} className={buttonClassName}>
      {text}
      {!isInternal && href !== `mailto:${email}` && <ExternalArrow />}
    </Link>
  );
};

export { Button, buttonVariants, ButtonTwo };
