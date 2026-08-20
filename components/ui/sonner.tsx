"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast rounded-2xl border border-border bg-card text-foreground shadow-md",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground rounded-full",
          cancelButton: "bg-muted text-foreground rounded-full",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
