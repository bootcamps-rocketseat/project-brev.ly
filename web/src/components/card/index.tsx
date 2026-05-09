import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const cardVariants = tv({
  base: "w-full bg-gray-100 rounded-lg p-8",
});

type CardProps = ComponentProps<"div"> & VariantProps<typeof cardVariants>;

export const Card = ({ className, ...props }: CardProps) => {
  return <div className={cardVariants({ className })} {...props} />;
};
