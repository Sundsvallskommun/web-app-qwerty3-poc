import { cx } from "@sk-web-gui/react";

type BarAssistantContainerProps = React.ComponentPropsWithoutRef<"div">;

export const BarAssistantContainer: React.FC<BarAssistantContainerProps> = (
  props
) => {
  const { className, ...rest } = props;

  return (
    <div
      className={cx(className, "flex grow justify-center items-center")}
      {...rest}
    />
  );
};
