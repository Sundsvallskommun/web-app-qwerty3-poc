import { cx } from "@sk-web-gui/react";
import { useState } from "react";

interface AssistantButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  label?: string;
  showLabel?: boolean;
  active?: boolean;
  inverted?: boolean;
  image?: React.ReactNode;
  size?: "sm" | "md";
  trailingIcon?: React.ReactNode;
}

export const AssistantButton: React.FC<AssistantButtonProps> = (props) => {
  const {
    className,
    label,
    showLabel,
    image,
    active,
    inverted,
    size = "sm",
    children,
    trailingIcon,
    ...rest
  } = props;
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={cx(
        "inline-flex justify-between items-center gap-2",
        "hover:bg-tertiary-surface-hover",
        size === "md" ? "h-52 rounded-groups" : "h-40 rounded-button-md",
        {
          ["w-40"]: !showLabel,
        },
        className
      )}
    >
      <button
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        type="button"
        className={cx(
          "inline-flex justify-start items-center gap-10",
          "focus-visible:ring ring-ring",
          size === "md" ? "h-52 p-6" : "h-40 p-2",
          children
            ? size === "md"
              ? "rounded-l-groups"
              : "rounded-l-button-md"
            : size === "md"
            ? "rounded-groups"
            : "rounded-button-md",
          inverted
            ? active
              ? "focus-visible:bg-inverted-background-content bg-inverted-primary-surface text-inverted-light-primary font-bold"
              : "hover:bg-inverted-menu-item-surface-hover focus-visible:bg-inverted-background-content bg-transparent text-inverted-dark-primary"
            : active
            ? "focus-visible:bg-background-content bg-primary-surface text-light-primary font-bold"
            : "hover:bg-menu-item-surface-hover focus-visible:bg-background-content bg-transparent text-dark-primary",
          {
            ["w-40"]: !showLabel,
          },
          className
        )}
        aria-label={showLabel ? undefined : label}
        {...rest}
      >
        {image ? (
          <span
            className={cx(
              "border-2",
              size === "md"
                ? "h-44 w-44 max-h-44 max-w-44 min-w-44 min-h-44 rounded-button-md"
                : "h-36 w-36 max-h-36 max-w-36 min-w-36 min-h-36 rounded-button-sm",
              inverted
                ? active || isHover
                  ? "border-inverted-background-content bg-background-content"
                  : "border-transparent bg-transparent"
                : active || isHover
                ? "border-background-content bg-background-content"
                : "border-transparent bg-transparent"
            )}
          >
            {image}
          </span>
        ) : (
          <></>
        )}
        {showLabel && <span className="text-left">{label}</span>}
        {!!trailingIcon && (
          <span className="flex justify-end items-center grow">
            {trailingIcon}
          </span>
        )}
      </button>
      {!!children && (
        <div
          className={cx(
            "flex justify-end items-center grow",
            size === "md" ? "h-52 rounded-r-groups" : "h-40 rounded-r-button-md"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
