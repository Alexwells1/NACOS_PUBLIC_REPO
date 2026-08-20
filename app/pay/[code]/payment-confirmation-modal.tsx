"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";

export interface PaymentConfirmationDetails {
  studentName: string;
  email: string;
  phone: string;
  matricNumber: string;
  level: string;
  studentStatus: "new" | "returning";
  fee: number;
}

export function PaymentConfirmationModal({
  open,
  onOpenChange,
  details,
  isSubmitting,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details: PaymentConfirmationDetails | null;
  isSubmitting: boolean;
  onConfirm: () => void;
}) {
  if (!details) return null;

  const rows: Array<[string, string]> = [
    ["Full name", details.studentName],
    ["Email address", details.email],
    ["Phone number", details.phone],
    ["Matric number", details.matricNumber],
    ["Level", details.level],
    ["Student category", details.studentStatus === "new" ? "New student" : "Returning student"],
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm your payment</DialogTitle>
          <DialogDescription>
            Please review the details below before proceeding to payment.
          </DialogDescription>
        </DialogHeader>

        <dl className="space-y-3 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="text-right font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Dues ({details.studentStatus === "new" ? "New" : "Returning"})
            </span>
            <span className="font-semibold">{formatCurrency(details.fee)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2">
            <span className="font-bold">Total Amount</span>
            <span className="text-lg font-black text-primary">
              {formatCurrency(details.fee)}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Go Back / Edit
          </Button>
          <Button onClick={onConfirm} disabled={isSubmitting}>
            {isSubmitting ? "Processing…" : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}