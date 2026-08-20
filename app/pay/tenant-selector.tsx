"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GraduationCapIcon, LandmarkIcon } from "lucide-react";
import type { PublicTenantSummary, TenantType } from "@/lib/types";
import { useMaintenanceStatus } from "@/hooks/use-payments";
import { PaymentMaintenanceNotice } from "@/components/public/payment-maintenance-notice";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface TenantTypeGroup {
  type: TenantType;
  tenants: PublicTenantSummary[];
  activeCount: number;
}

const TYPE_LABEL: Record<TenantType, string> = {
  COLLEGE: "College",
  DEPARTMENT: "Department",
};

const TYPE_ICON: Record<TenantType, React.ElementType> = {
  COLLEGE: GraduationCapIcon,
  DEPARTMENT: LandmarkIcon,
};

export function TenantSelector({ groups }: { groups: TenantTypeGroup[] }) {
  const router = useRouter();
  const { data: maintenanceStatus } = useMaintenanceStatus();

  const [selectedType, setSelectedType] = React.useState<TenantType | null>(
    groups.length === 1 ? groups[0].type : null
  );

  const selectedGroup = selectedType ? groups.find((g) => g.type === selectedType) ?? null : null;

  React.useEffect(() => {
    if (selectedGroup && selectedGroup.activeCount === 1) {
      const tenant = selectedGroup.tenants.find((t) => t.status === "ACTIVE")!;
      router.replace(`/pay/${tenant.code}`);
    }
  }, [selectedGroup, router]);

  if (maintenanceStatus?.maintenanceMode) {
    return <PaymentMaintenanceNotice message={maintenanceStatus.message} />;
  }

  if (!selectedGroup) {
    return (
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Pay as</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose the type of association you&apos;re paying dues to.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {groups.map((group) => {
            const Icon = TYPE_ICON[group.type];
            return (
              <button
                key={group.type}
                type="button"
                onClick={() => setSelectedType(group.type)}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 text-left transition-colors hover:border-primary"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="font-semibold">{TYPE_LABEL[group.type]}</p>
                  <p className="text-sm text-muted-foreground">Pay as a {TYPE_LABEL[group.type].toLowerCase()}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (selectedGroup.activeCount === 1) {
    // Redirecting via the effect above.
    return null;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">Choose your association</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Select the {TYPE_LABEL[selectedGroup.type].toLowerCase()} you&apos;re paying dues to.
      </p>
      <div className="mt-6 space-y-3">
        {selectedGroup.tenants.map((tenant) => {
          const isActive = tenant.status === "ACTIVE";
          const content = (
            <Card className={!isActive ? "opacity-60" : undefined}>
              <CardContent className="flex items-center gap-3 py-4">
                {tenant.logoUrl ? (
                  <Image
                    src={tenant.logoUrl}
                    alt={`${tenant.name} logo`}
                    width={40}
                    height={40}
                    className="size-10 rounded-lg border border-border object-cover"
                  />
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary-soft text-sm font-semibold text-primary">
                    {tenant.name.slice(0, 1)}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium">{tenant.name}</p>
                  {!isActive && (
                    <p className="text-xs text-muted-foreground">Payments currently unavailable</p>
                  )}
                </div>
                {!isActive && <Badge variant="warning">Unavailable</Badge>}
              </CardContent>
            </Card>
          );

          if (!isActive) {
            return (
              <div key={tenant._id} aria-disabled="true" className="cursor-not-allowed">
                {content}
              </div>
            );
          }

          return (
            <button
              key={tenant._id}
              type="button"
              onClick={() => router.push(`/pay/${tenant.code}`)}
              className="block w-full text-left"
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}