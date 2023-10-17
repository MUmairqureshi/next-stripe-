import * as React from "react";
import Link from 'next/link';
import ExternalArrow from '@/components/ui/external-arrow';
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background uppercase gap-2",
  {
    variants: {
      variant: {
        default: "bg-greenDark !text-greenLight text-large hover:bg-greenDark/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        ghost: "border border-input hover:bg-accent hover:text-accent-foreground",
        primary: "bg-greenDark !text-greenLight text-large hover:bg-greenDark/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        link: "underline-offset-2 underline text-primary !p-0",
        header: "hover:bg-cream underline",
        footer: "hover:underline !p-0"
      },
      size: {
        default: "py-3 px-6 text-md",
        sm: "py-0.5 px-4 md:py-3 md:px-6 text-sm sm:text-md",
        lg: "py-3 px-6 text-md",
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
  variant: "default" | "destructive" | "outline" | "ghost" | "primary" | "secondary" | "link" | "header" | "footer";
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
