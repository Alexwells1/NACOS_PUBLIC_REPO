import type { Metadata } from "next";
import { ApplyForm } from "./apply-form";
import {
  FileTextIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  HelpCircleIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Register your association | NACOS Platform",
  description:
    "Register your college or department association to start collecting dues and managing financial operations.",
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-muted/20 py-6 sm:py-10 lg:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Header Banner */}
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Register your association
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Submit your department or college association for approval to start collecting dues and managing finances.
          </p>
        </div>

        {/* Compact Horizontal Steps (Mobile & Desktop) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl bg-card border border-border/80 shadow-xs text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="flex size-5 sm:size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold">
              1
            </span>
            <span className="font-medium text-foreground truncate">Submit Details</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex size-5 sm:size-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] sm:text-xs font-bold">
              2
            </span>
            <span className="font-medium text-muted-foreground truncate">Review (24-48h)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex size-5 sm:size-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-[10px] sm:text-xs font-bold">
              3
            </span>
            <span className="font-medium text-muted-foreground truncate">Get Activated</span>
          </div>
        </div>

        {/* Main Grid: On Desktop (Sidebar left, Form right). On Mobile (Form top, Info below) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Form Section (order-1 on mobile, order-2 on desktop) */}
          <section className="order-1 lg:order-2 lg:col-span-7">
            <ApplyForm />
          </section>

          {/* Instructions & Help Sidebar (order-2 on mobile, order-1 on desktop) */}
          <aside className="order-2 lg:order-1 lg:col-span-5 space-y-4 sm:space-y-6 lg:sticky lg:top-6">
            
            {/* Step Explanation */}
            <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs">
              <h2 className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
                <FileTextIcon className="size-4 text-primary" />
                What happens after you apply?
              </h2>
              <ol className="mt-3.5 space-y-3 text-xs sm:text-sm text-muted-foreground">
                <li className="flex gap-2.5">
                  <span className="font-bold text-foreground shrink-0">Step 1:</span>
                  <span>We verify your department&apos;s association details and active executive personnel.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-foreground shrink-0">Step 2:</span>
                  <span>Your designated Finance Director receives an activation email with login credentials.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="font-bold text-foreground shrink-0">Step 3:</span>
                  <span>Create departmental dues, share payment links, and track collections in real-time.</span>
                </li>
              </ol>
            </div>

            {/* Requirements Checklist */}
            <div className="rounded-xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs">
              <h2 className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2">
                <ShieldCheckIcon className="size-4 text-emerald-500" />
                Requirements Checklist
              </h2>
              <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Valid institutional email or active departmental contact.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Official 10-digit NUBAN association account number.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Active phone number and email for the Finance Director.</span>
                </li>
              </ul>
            </div>

            {/* Need Assistance Card */}
            <div className="rounded-xl bg-muted/50 p-4 border border-border/60 text-xs sm:text-sm text-muted-foreground flex items-start gap-3">
              <HelpCircleIcon className="size-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Need assistance with your registration?</p>
                <p className="mt-0.5 leading-relaxed">
                  Reach out to support at{" "}
                  <a
                    href="mailto:support@nacos.org.ng"
                    className="text-primary font-medium underline underline-offset-2"
                  >
                    support@nacos.org.ng
                  </a>{" "}
                  if your bank account cannot be resolved or if you have questions.
                </p>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}