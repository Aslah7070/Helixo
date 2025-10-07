"use client";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import {
  Dialog,

  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type GenericDialogProps = {
  toggleIcon: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode; // optional footer
  children: React.ReactNode; // form or any content
};

const GenericDialog: React.FC<GenericDialogProps> = ({
  toggleIcon,
  title,
  description,
  footer,
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-white cursor-pointer">{toggleIcon}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <p className="text-gray-300 text-sm mt-1">{description}</p>
          )}
        </DialogHeader>

        <div className="py-0 text-start  justify-start">{children}</div>

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default GenericDialog;
