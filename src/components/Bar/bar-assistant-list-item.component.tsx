import { Callout, cx } from "@sk-web-gui/react";
import { cloneElement } from "react";

interface BarAssistantListItemProps
  extends Omit<React.ComponentPropsWithoutRef<"li">, "children"> {
  active?: boolean;
  button: React.JSX.Element;
  callout?: boolean;
  inverted?: boolean;
  current?: boolean;
  remove?: boolean;
}

export const BarAssistantListItem: React.FC<BarAssistantListItemProps> = (
  props
) => {
  const {
    className,
    active,
    button,
    callout,
    inverted,
    current,
    remove,
    ...rest
  } = props;
  return (
    <li
      role="none"
      className={cx(
        "flex flex-col h-fit w-fit items-center relative",
        remove ? "animate-dissappear" : "animate-reveal",
        className
      )}
      {...rest}
    >
      <span className={cx({ ["animate-bouncy"]: callout })}>
        {cloneElement(button, {
          ...button.props,
          role: "menuitem",
          "aria-current": current ? "true" : undefined,
        })}
      </span>
      <span
        className={cx(
          "h-4 w-4 rounded-full",
          inverted
            ? active
              ? "bg-inverted-menu-item-surface-active"
              : "bg-transparent"
            : active
            ? "bg-menu-item-surface-active"
            : "bg-transparent"
        )}
      >
        {""}
      </span>
      {callout && (
        <Callout
          color="error"
          inverted={inverted}
          className="absolute top-0 right-0 p-2"
        />
      )}
    </li>
  );
};
