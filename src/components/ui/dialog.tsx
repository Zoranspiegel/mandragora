import { X } from "lucide-react";
import { Button } from "./button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./card";

interface ComponentProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog({
  title,
  open,
  onClose,
  children,
}: ComponentProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed flex items-center justify-center inset-0 z-50"
    >
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/60"
        onClick={onClose}
      />

      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardAction>
          <Button variant="icon" onClick={onClose}>
            <X />
          </Button>
        </CardAction>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
