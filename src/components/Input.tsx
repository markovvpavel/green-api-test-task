import clsx from "clsx";

type Props = {
  className?: string;
  name: string;
  placeholder?: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
  className,
  name,
  placeholder,
  type,
  value,
  onChange,
}: Props) => {
  return (
    <input
      autoFocus
      className={clsx(
        "h-[44px] py-2 px-4 w-full rounded-[6px] bg-[#F2F3F5]",
        className
      )}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  );
};
