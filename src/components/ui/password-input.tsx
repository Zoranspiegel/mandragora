"use client";

import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { EyeIcon, EyeClosedIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PasswordInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className="pr-button"
        {...props}
      />
      <Button
        type="button"
        variant="icon"
        className={cn("absolute top-0 right-0 text-leaf", className)}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeClosedIcon size={20} /> : <EyeIcon size={20} />}
      </Button>
    </div>
  );
}
