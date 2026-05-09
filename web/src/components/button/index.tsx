import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-blue-500 pt-2 pb-2 text-white",
  variants: {
    color: {
      primary: "bg-blue-base text-white enabled:hover:bg-blue-dark",
      secondary:
        "border border-gray-200 bg-gray-200 text-gray-500 enabled:hover:border-blue-base",
    },
    size: {
      md: "text-md",
      lg: "text-lg",
    },
    disabled: {
      true: "cursor-not-allowed opacity-50",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export const Button = ({
  size,
  color,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const Component = "button";

  return (
    <Component
      className={buttonVariants({ color, size, disabled, className })}
      disabled={disabled}
      {...props}
    />
  );
};
