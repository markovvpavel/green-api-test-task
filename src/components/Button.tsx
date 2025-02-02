import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  theme?: "filled" | "outline";
};

export const Button = ({
  children,
  className,
  theme = "filled",
  onClick,
}: Props) => {
  return (
    <button
      className={clsx(
        "h-[44px] min-w-[150px] rounded-[6px]",
        theme === "filled" && "bg-[#61C554] text-white",
        theme === "outline" &&
          "bg-white text-[#61C554] border border-[#61C554]",
        className
      )}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
};
