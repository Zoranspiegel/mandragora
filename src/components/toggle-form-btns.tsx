import { cn } from "@/lib/utils";

interface ComponentProps {
  values?: string[] | null;
  activeValue: string | boolean;
  handleValue: (value: string | boolean) => void;
}

export default function ToggleFormBtns({
  values = null,
  activeValue,
  handleValue,
}: ComponentProps) {
  const isLeftValue = values ? activeValue === values[0] : activeValue;

  function handleLeftBtn() {
    if (values) {
      handleValue(values[0]);
    } else {
      handleValue(true);
    }
  }

  function handleRightBtn() {
    if (values) {
      handleValue(values[1]);
    } else {
      handleValue(false);
    }
  }

  return (
    <div className="flex gap-2 items-center">
      <button
        type="button"
        onClick={handleLeftBtn}
        className={cn(
          "bg-accent rounded-full py-1 px-3 cursor-pointer transition capitalize text-center text-md font-bold",
          !values && "w-10 aspect-square",
          isLeftValue && "bg-leaf shadow-md -translate-y-0.5",
        )}
      >
        {values ? values[0].toLowerCase() : "si"}
      </button>
      <button
        type="button"
        onClick={handleRightBtn}
        className={cn(
          "bg-accent rounded-full py-1 px-3 cursor-pointer transition capitalize text-center text-md font-bold",
          !values && "w-10 aspect-square",
          !isLeftValue && "bg-leaf shadow-md -translate-y-0.5",
        )}
      >
        {values ? values[1].toLowerCase() : "no"}
      </button>
    </div>
  );
}
