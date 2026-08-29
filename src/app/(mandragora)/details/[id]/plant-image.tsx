import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

interface ComponentProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function PlantImage({ src, alt, onClose }: ComponentProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-md bg-black/70"
        onClick={onClose}
      />

      <div className="relative z-10">
        <Image src={src} alt={alt} width={500} height={500} priority />
        <Button
          type="button"
          variant="icon"
          className="absolute top-0 right-0 z-20 text-white"
          onClick={onClose}
        >
          <X />
        </Button>
      </div>
    </div>
  );
}
