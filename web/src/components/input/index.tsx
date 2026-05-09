import { WarningIcon } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";
import { useId } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({
  slots: {
    root: "group flex w-full flex-col gap-2",
    label:
      "text-xs font-bold uppercase text-gray-400 transition-colors group-focus-within:text-blue-base",
    field: "relative flex w-full items-center",
    prefix:
      "pointer-events-none absolute left-4 flex items-center text-gray-500",
    input:
      "caret-blue-base h-12 w-full rounded-[8px] border border-gray-300 bg-white px-4 text-md font-regular text-gray-600 outline-none transition-colors placeholder:text-gray-400 focus:border-blue-base disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
    helper: "flex items-center gap-2 text-sm text-gray-400",
    helperIcon: "shrink-0",
  },
  variants: {
    error: {
      true: {
        label: "text-danger group-focus-within:text-danger",
        input: "border-danger caret-danger focus:border-danger",
        helper: "text-danger",
      },
    },
    disabled: {
      true: {
        label: "text-gray-300 group-focus-within:text-gray-300",
      },
    },
    hasPrefix: {
      true: {
        input: "pl-18",
      },
    },
  },
});

type InputProps = ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    label?: string;
    prefix?: ReactNode;
    errorMessage?: string;
    containerClassName?: string;
  };

export const Input = ({
  id,
  error,
  label,
  prefix,
  disabled,
  className,
  errorMessage,
  containerClassName,
  ...props
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasError = error || Boolean(errorMessage);
  const errorMessageId = `${inputId}-error`;
  const styles = inputVariants({
    error: hasError,
    disabled,
    hasPrefix: Boolean(prefix),
  });

  return (
    <div className={styles.root({ className: containerClassName })}>
      {label && (
        <label className={styles.label()} htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className={styles.field()}>
        {prefix && (
          <span className={styles.prefix()} aria-hidden="true">
            {prefix}
          </span>
        )}

        <input
          aria-describedby={errorMessage ? errorMessageId : undefined}
          aria-invalid={hasError || undefined}
          className={styles.input({ className })}
          disabled={disabled}
          id={inputId}
          {...props}
        />
      </div>

      {errorMessage && (
        <span className={styles.helper()} id={errorMessageId}>
          <WarningIcon className={styles.helperIcon()} size={16} />
          {errorMessage}
        </span>
      )}
    </div>
  );
};
