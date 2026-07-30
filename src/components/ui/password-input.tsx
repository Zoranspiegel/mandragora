"use client";

import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { EyeIcon, EyeClosedIcon } from "lucide-react";

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
        className="absolute top-0 right-0 text-leaf"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeClosedIcon size={20} /> : <EyeIcon size={20} />}
      </Button>
    </div>
  );
}
