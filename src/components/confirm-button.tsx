"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ConfirmButtonProps = {
  action: () => Promise<unknown>;
  confirmMessage: string;
  children: React.ReactNode;
  variant?: "danger" | "ghost" | "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function ConfirmButton({
  action,
  confirmMessage,
  children,
  variant = "danger",
  size = "sm",
  className,
}: ConfirmButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm(confirmMessage)) return;
    startTransition(() => {
      action();
    });
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn(className)}
      onClick={handleClick}
      disabled={isPending}
    >
      {children}
    </Button>
  );
}
