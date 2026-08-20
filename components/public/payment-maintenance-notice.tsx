import { WrenchIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function PaymentMaintenanceNotice({ message }: { message: string | null }) {
  return (
    <Alert variant="warning">
      <WrenchIcon />
      <AlertTitle>Payments temporarily unavailable</AlertTitle>
      <AlertDescription>
        {message ?? "Our payment service is currently undergoing maintenance. Please check back later."}
      </AlertDescription>
    </Alert>
  );
}
