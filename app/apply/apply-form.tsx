"use client";

import * as React from "react";
import { z } from "zod";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  CheckCircle2Icon,
  Loader2Icon,
  AlertCircleIcon,
  Building2Icon,
  UserIcon,
  CreditCardIcon,
  ArrowRightIcon,
  ChevronsUpDownIcon,
  CheckIcon,
} from "lucide-react";
import { getBanks, resolveAccount, submitOnboarding } from "@/lib/api/onboarding";
import { ApiClientError } from "@/lib/api/errors";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormField } from "@/components/shared/form-field";
import { cn } from "@/lib/utils";

const schema = z.object({
  associationName: z
    .string()
    .min(2, "Association name must be at least 2 characters")
    .max(200),
  associationType: z.enum(["COLLEGE", "DEPARTMENT"]),
  contactFullName: z.string().min(1, "Contact person name is required"),
  contactPhone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[+0-9\s-]{7,15}$/, "Enter a valid phone number (e.g. 08012345678)"),
  associationEmail: z.string().email("A valid email address is required"),
  financeDirectorFullName: z.string().min(1, "Finance Director name is required"),
  bankCode: z.string().min(1, "Please select your bank"),
  accountNumber: z
    .string()
    .length(10, "Account number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Must contain only numeric digits"),
});

type Values = z.infer<typeof schema>;

export function ApplyForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [bankOpen, setBankOpen] = React.useState(false);

  const banksQuery = useQuery({
    queryKey: ["onboarding", "banks"],
    queryFn: getBanks,
  });

  // Deduplicate banks by bank.code
  const uniqueBanks = React.useMemo(() => {
    if (!banksQuery.data) return [];
    const seen = new Set<string>();

    return banksQuery.data.filter((bank: { code: string; name: string }) => {
      if (!bank.code || seen.has(bank.code)) return false;
      seen.add(bank.code);
      return true;
    });
  }, [banksQuery.data]);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      associationName: "",
      associationType: "DEPARTMENT",
      contactFullName: "",
      contactPhone: "",
      associationEmail: "",
      financeDirectorFullName: "",
      bankCode: "",
      accountNumber: "",
    },
  });

  const bankCode = useWatch({ control: form.control, name: "bankCode" });
  const accountNumber = useWatch({ control: form.control, name: "accountNumber" });

  const isAccountEligibleForResolution =
    Boolean(bankCode) && /^\d{10}$/.test(accountNumber || "");

  const resolveQuery = useQuery({
    queryKey: ["onboarding", "resolve-account", bankCode, accountNumber],
    queryFn: () => resolveAccount(bankCode, accountNumber),
    enabled: isAccountEligibleForResolution,
    retry: false,
  });

  const submitMutation = useMutation({ mutationFn: submitOnboarding });

  async function onSubmit(values: Values) {
    if (!resolveQuery.data) {
      form.setError("accountNumber", {
        message: "Please enter a valid account number that resolves to an account name.",
      });
      return;
    }

    const bank = uniqueBanks.find((b) => b.code === values.bankCode);
    try {
      await submitMutation.mutateAsync({
        ...values,
        bankName: bank?.name ?? "",
      });
      setSubmitted(true);
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof ApiClientError
            ? error.message
            : "Couldn't submit your application. Please verify your details and try again.",
      });
    }
  }

  if (submitted) {
    return (
      <Card className="shadow-sm border-border bg-card">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
          <div className="rounded-full bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400 ring-8 ring-emerald-500/5">
            <CheckCircle2Icon className="size-10" />
          </div>
          <div className="space-y-2 max-w-md">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Application Submitted Successfully
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your association registration is under review. Once verified, an invitation
              email containing account credentials will be dispatched to your Finance Director.
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              form.reset();
              setSubmitted(false);
            }}
          >
            Submit another registration
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-border bg-card">
      <CardHeader className="space-y-1.5 p-5 sm:p-7 border-b border-border/60">
        <CardTitle className="text-lg sm:text-xl font-bold tracking-tight">
          Association Registration Form
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Please fill in the official details of your student body association.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 sm:p-7">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
          suppressHydrationWarning
        >
          {/* Section 1: Association Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/50">
              <Building2Icon className="size-4 text-primary" />
              <span>Association Profile</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <FormField
                  label="Association Name"
                  htmlFor="associationName"
                  error={form.formState.errors.associationName?.message}
                >
                  <Input
                    id="associationName"
                    placeholder="e.g. Computer Science Students Association"
                    {...form.register("associationName")}
                  />
                </FormField>
              </div>

              <div>
                <FormField label="Type" htmlFor="associationType">
                  <Controller
                    control={form.control}
                    name="associationType"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="associationType" className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="DEPARTMENT">Department</SelectItem>
                          <SelectItem value="COLLEGE">College / Faculty</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FormField>
              </div>
            </div>

            <FormField
              label="Association Official Email"
              htmlFor="associationEmail"
              error={form.formState.errors.associationEmail?.message}
              hint="Official email for platform notifications and receipts."
            >
              <Input
                id="associationEmail"
                type="email"
                placeholder="association@institution.edu"
                {...form.register("associationEmail")}
              />
            </FormField>
          </div>

          {/* Section 2: Key Executive Contacts */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/50">
              <UserIcon className="size-4 text-primary" />
              <span>Officer Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Contact Person Full Name"
                htmlFor="contactFullName"
                error={form.formState.errors.contactFullName?.message}
              >
                <Input
                  id="contactFullName"
                  placeholder="e.g. Jane Doe (President)"
                  {...form.register("contactFullName")}
                />
              </FormField>

              <FormField
                label="Contact Phone Number"
                htmlFor="contactPhone"
                error={form.formState.errors.contactPhone?.message}
              >
                <Input
                  id="contactPhone"
                  type="tel"
                  inputMode="tel"
                  placeholder="08012345678"
                  {...form.register("contactPhone")}
                />
              </FormField>
            </div>

            <FormField
              label="Finance Director Full Name"
              htmlFor="financeDirectorFullName"
              error={form.formState.errors.financeDirectorFullName?.message}
              hint="The Finance Director / Treasurer will manage payout requests and receipts."
            >
              <Input
                id="financeDirectorFullName"
                placeholder="e.g. John Doe (Treasurer)"
                {...form.register("financeDirectorFullName")}
              />
            </FormField>
          </div>

          {/* Section 3: Bank Account Verification */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/50">
              <CreditCardIcon className="size-4 text-primary" />
              <span>Settlement Account</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Bank Name"
                htmlFor="bankCode"
                error={
                  banksQuery.isError
                    ? "Failed to load banks. Please check your connection."
                    : form.formState.errors.bankCode?.message
                }
              >
                <Controller
                  control={form.control}
                  name="bankCode"
                  render={({ field }) => (
                    <Popover open={bankOpen} onOpenChange={setBankOpen}>
                      <PopoverTrigger
                        id="bankCode"
                        type="button"
                        role="combobox"
                        aria-expanded={bankOpen}
                        disabled={banksQuery.isLoading}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "w-full justify-between font-normal px-3"
                        )}
                      >
                        <span className="truncate">
                          {banksQuery.isLoading
                            ? "Loading banks…"
                            : field.value
                            ? uniqueBanks.find((b) => b.code === field.value)?.name || "Select bank"
                            : "Select bank"}
                        </span>
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </PopoverTrigger>
                      <PopoverContent 
                        className="w-[var(--radix-popover-trigger-width,300px)] min-w-[260px] p-0 max-h-72" 
                        align="start"
                      >
                        <Command>
                          <CommandInput placeholder="Search bank..." />
                          <CommandList className="max-h-60 overflow-y-auto">
                            <CommandEmpty>No bank found.</CommandEmpty>
                            <CommandGroup>
                              {uniqueBanks.map((bank) => (
                                <CommandItem
                                  key={bank.code}
                                  value={bank.name}
                                  onSelect={() => {
                                    field.onChange(bank.code);
                                    setBankOpen(false);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === bank.code ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {bank.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </FormField>

              <FormField
                label="Account Number"
                htmlFor="accountNumber"
                error={form.formState.errors.accountNumber?.message}
              >
                <Input
                  id="accountNumber"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit NUBAN"
                  {...form.register("accountNumber")}
                />
              </FormField>
            </div>

            {/* Visual Account Name Resolution Card */}
            {isAccountEligibleForResolution && (
              <div className="text-xs rounded-lg p-3.5 border transition-all duration-200 bg-muted/40">
                {resolveQuery.isFetching && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2Icon className="size-4 animate-spin text-primary shrink-0" />
                    <span>Resolving account details with bank…</span>
                  </div>
                )}
                {resolveQuery.isSuccess && resolveQuery.data && (
                  <div className="flex items-start gap-2.5 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2Icon className="size-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] block font-medium uppercase text-muted-foreground">
                        Verified Account Name:
                      </span>
                      <strong className="text-xs sm:text-sm font-semibold tracking-wide">
                        {resolveQuery.data.accountName}
                      </strong>
                    </div>
                  </div>
                )}
                {resolveQuery.isError && (
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircleIcon className="size-4 shrink-0" />
                    <span>
                      Could not resolve account details. Please check the bank and account number.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Form-level Error Banner */}
          {form.formState.errors.root && (
            <div className="flex items-center gap-2 p-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
              <AlertCircleIcon className="size-4 shrink-0" />
              <span>{form.formState.errors.root.message}</span>
            </div>
          )}

          {/* Submit Action */}
          <Button
            type="submit"
            className="w-full h-11 text-base font-medium shadow-sm transition-all"
            disabled={
              submitMutation.isPending ||
              resolveQuery.isFetching ||
              (isAccountEligibleForResolution && !resolveQuery.data)
            }
          >
            {submitMutation.isPending ? (
              <>
                <Loader2Icon className="size-4 mr-2 animate-spin" />
                Submitting application…
              </>
            ) : (
              <span className="inline-flex items-center gap-2">
                Submit Application
                <ArrowRightIcon className="size-4" />
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}