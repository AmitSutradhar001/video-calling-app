import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingModelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image,
  buttonIcon,
}: MeetingModelProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[400px] flex-col gap-4 border-none bg-dark-1 bx-5 py-7 text-white">
        <div className="flex flex-col gap-4">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" width={60} height={60} />
            </div>
          )}
          <h1 className={cn("text-xl font-bold leading-[30px]", className)}>
            {title}
          </h1>
          {children && <p>{children}</p>}
        </div>
        <Button className="bg-blue-400 hover:bg-blue-600" onClick={handleClick}>
          {buttonIcon && (
            <Image src={buttonIcon} alt="button icon" width={10} height={10} />
          )}
          &nbsp;
          {buttonText || "Schedule Meeting"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
