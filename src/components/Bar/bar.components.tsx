import { cx, useGui } from "@sk-web-gui/react";

type BarProps = React.ComponentPropsWithoutRef<"div">;

export const Bar: React.FC<BarProps> = (props) => {
  const { className, ...rest } = props;

  const { colorScheme, preferredColorScheme } = useGui();

  const darkmode =
    colorScheme === "dark" ||
    (colorScheme === "system" && preferredColorScheme === "dark");

  return (
    <div
      className={cx(
        "fixed border-t-1 border-t-divider bottom-0 left-0 right-0 w-full h-56 shadow-50 backdrop-blur-[4px] px-12 flex justify-between items-center z-10",
        darkmode
          ? "bg-primitives-overlay-darken-8"
          : "bg-primitives-overlay-lighten-7",
        className
      )}
      {...rest}
    />
  );
};
