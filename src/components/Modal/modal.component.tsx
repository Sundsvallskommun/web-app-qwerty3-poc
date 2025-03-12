import { Button, cx, Icon } from "@sk-web-gui/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface ModalProps extends React.ComponentPropsWithoutRef<"div"> {
  open?: boolean;
  onClose?: () => void;
  label?: React.ReactNode;
  header?: React.ComponentPropsWithoutRef<"header">;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { className, children, open, onClose, label, header, ...rest } = props;
  const [trueOpen, setTrueOpen] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(
      () => {
        setTrueOpen(open);
      },
      open ? 20 : 150
    );
  }, [open]);

  return (
    <div
      className={cx(
        "rounded-groups flex-col shadow-200 pb-8 bg-background-100 absolute w-[600px] border-1 border-divider gap-8",
        open && trueOpen ? "opacity-100" : "h-0 opacity-0",
        trueOpen || open ? "flex" : "hidden",
        {
          ["h-[calc(100vh-80px)]"]: open && trueOpen,
        },
        "transition-all duration-300",
        className
      )}
      {...rest}
    >
      <header
        {...header}
        className={cx(
          "flex w-full px-12 grow-0 justify-between items-start pt-8 pb-2 rounded-t-groups",
          header?.className
        )}
      >
        <h1 className="m-0 px-14 py-12 text-label-large">{label}</h1>
        <Button
          onClick={onClose}
          variant="tertiary"
          showBackground={false}
          iconButton
          title="Stäng"
          size="sm"
          className="mt-6"
        >
          <Icon icon={<X />} />
        </Button>
      </header>
      {children}
    </div>
  );
};
