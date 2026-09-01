import { cn } from "@/lib/utils";

interface ComponentProps {
  value: number;
  handleNumber: (value: number) => void;
}

export default function NumberFormInput({
  value,
  handleNumber,
}: ComponentProps) {
  function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const num = +e.target.value;

    if (num >= 0 && num < 100) {
      handleNumber(num);
    }
  }

  function handleDecrement() {
    handleNumber(value - 1);
  }

  function handleIncrement() {
    handleNumber(value + 1);
  }

  return (
    <div className="flex">
      <NumberButton
        side="left"
        disabled={value === 0}
        onClick={handleDecrement}
      >
        -
      </NumberButton>

      <input
        value={value}
        onChange={handleNumberChange}
        className="w-10 aspect-square bg-accent text-center outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      />

      <NumberButton
        side="right"
        disabled={value === 99}
        onClick={handleIncrement}
      >
        +
      </NumberButton>
    </div>
  );
}

function NumberButton({
  children,
  className,
  side,
  ...props
}: React.ComponentProps<"button"> & { side: "left" | "right" }) {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        "bg-leaf w-8 text-xl font-bold cursor-pointer disabled:bg-black/30 disabled:cursor-auto disabled:opacity-70",
        side === "left" && "rounded-l-xl",
        side === "right" && "rounded-r-xl",
        className,
      )}
    >
      {children}
    </button>
  );
}
