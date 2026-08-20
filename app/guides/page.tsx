"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  type Guide,
  type QuickAction,
  colorMap,
  guides,
  quickActions,
} from "@/constants/guides-constants";
import {
  ArrowRight,
  X,
  Zap,
  CheckCircle,
  Lightbulb,
  AlertTriangle,
  Phone,
  MessageCircle,
} from "lucide-react";
import React from "react";

// ── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

// ── Guide Card ────────────────────────────────────────────────────────────────

const GuideCard = React.memo(
  ({ guide, onSelect }: { guide: Guide; onSelect: (guide: Guide) => void }) => (
    <Card
      onClick={() => onSelect(guide)}
      className="cursor-pointer border border-border bg-card hover:shadow-md transition-all duration-200 hover:border-primary/30 group"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              colorMap[guide.color]
            }`}
          >
            <guide.icon className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs font-normal">
              {guide.duration}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-base font-semibold text-card-foreground group-hover:text-primary transition-colors leading-snug">
          {guide.title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed mt-1">
          {guide.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          View guide
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </CardContent>
    </Card>
  )
);
GuideCard.displayName = "GuideCard";

// ── Quick Action Button ───────────────────────────────────────────────────────

const QuickActionButton = React.memo(({ action }: { action: QuickAction }) => (
  <Button
    variant="outline"
    className="h-auto py-3 border-border px-4 justify-start gap-3 hover:bg-accent hover:border-primary/30 transition-all"
    asChild
  >
    <a href={action.href}>
      <div
        className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${
          colorMap[action.color]
        }`}
      >
        <action.icon className="w-4 h-4" />
      </div>
      <div className="text-left flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground">{action.title}</p>
        <p className="text-xs text-muted-foreground">{action.description}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
    </a>
  </Button>
));
QuickActionButton.displayName = "QuickActionButton";

// ── Guide Modal ───────────────────────────────────────────────────────────────

const GuideModal = React.memo(
  ({ guide, onClose }: { guide: Guide; onClose: () => void }) => {
    // Fix #6 — lock scroll + escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [onClose]);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="bg-background border border-border rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              {/* Fix #6 — icon wrapper now uses colorMap */}
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  colorMap[guide.color]
                }`}
              >
                <guide.icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-foreground truncate">
                  {guide.title}
                </h2>
                <p className="text-xs text-muted-foreground truncate">
                  {guide.description}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full flex-shrink-0 ml-2"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Modal body */}
          <div className="overflow-y-auto flex-1 p-5">
            <GuideContent guide={guide} />
          </div>
        </motion.div>
      </motion.div>
    );
  }
);
GuideModal.displayName = "GuideModal";

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GuidesPage() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  // Fix #4 — removed useMemo on static imports, guides/quickActions are constants
  const handleGuideSelect = useCallback((guide: Guide) => {
    setSelectedGuide(guide);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedGuide(null);
  }, []);

  return (
    <div className="min-h-screen bg-background">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        {/* Fix #2 — motion.header → motion.div */}
        <div className="border-b border-border bg-card">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              <motion.div variants={fadeUp}>
                <Badge variant="secondary">Guides</Badge>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
              >
                Payment &amp; Receipt Guides
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-muted-foreground text-base max-w-lg mx-auto"
              >
                Step-by-step instructions for payments, receipts,
                troubleshooting, and best practices.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* ── Content ──────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12">
          {/* Quick actions */}
          <motion.section
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Quick Actions
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
            >
              {quickActions.map((action) => (
                <QuickActionButton key={action.title} action={action} />
              ))}
            </motion.div>
          </motion.section>

          {/* Guides grid */}
          <motion.section
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Guides
            </motion.p>
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {guides.map((guide) => (
                <motion.div key={guide.id} variants={fadeUp}>
                  <GuideCard guide={guide} onSelect={handleGuideSelect} />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Support reference */}
          <motion.section
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Support
            </motion.p>
            <motion.div variants={fadeUp}>
              <QuickSupportSection />
            </motion.div>
          </motion.section>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedGuide && (
            <GuideModal guide={selectedGuide} onClose={handleModalClose} />
          )}
        </AnimatePresence>
    </div>
  );
}

// ── Quick Support Section ─────────────────────────────────────────────────────

// Fix #3 — no dynamic Tailwind classes; use static border/bg tokens only
const QuickSupportSection = React.memo(() => (
  <Card className="border border-border">
    <CardHeader className="pb-4">
      <CardTitle className="text-base font-semibold text-card-foreground">
        Quick Support Reference
      </CardTitle>
      <CardDescription>Who to contact for different issues</CardDescription>
    </CardHeader>
    <CardContent className="grid sm:grid-cols-2 gap-4">
      <SupportContactItem
        icon={<MessageCircle className="w-4 h-4 text-primary" />}
        title="Payment Issues"
        description="Deductions, failed payments, receipt problems"
        href="https://wa.me/+2349074660245?text=Hi%2C%20I%20need%20help%20with%20a%20payment%20issue."
        label="Chat on WhatsApp"
      />
      <SupportContactItem
        icon={<MessageCircle className="w-4 h-4 text-primary" />}
        title="Technical Issues"
        description="Website bugs, receipt errors, platform problems"
        href="https://wa.me/+2349161285212?text=Hi%2C%20I%20need%20technical%20support."
        label="Chat on WhatsApp"
      />
    </CardContent>
  </Card>
));
QuickSupportSection.displayName = "QuickSupportSection";

function SupportContactItem({
  icon,
  title,
  description,
  href,
  label,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  label: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-accent/20">
      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-card-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
          {description}
        </p>
        <Button
          variant="link"
          size="sm"
          className="px-0 h-auto mt-2 text-primary text-xs"
          asChild
        >
          <a href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        </Button>
      </div>
    </div>
  );
}

// ── Guide Content (modal body) ────────────────────────────────────────────────

function GuideContent({ guide }: { guide: Guide }) {
  return (
    <div className="space-y-6">
      {/* Sections */}
      {guide.sections?.map((section) => (
        // Fix #5 — stable key from section.title
        <div key={section.title} className="space-y-3">
          <div className="flex items-center gap-2">
            <section.icon className="w-4 h-4 text-primary flex-shrink-0" />
            <h3 className="font-semibold text-sm text-foreground">
              {section.title}
            </h3>
          </div>
          <ul className="space-y-2 pl-6">
            {section.items.map((item) => (
              // Fix #5 — stable key from item text
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Common issues */}
      {guide.commonIssues && (
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-foreground">
            Common Issues &amp; Solutions
          </h3>
          <div className="space-y-3">
            {guide.commonIssues.map((issue) => (
              // Fix #5 — stable key from problem text
              <div
                key={issue.problem}
                className="rounded-lg border border-border p-4 space-y-2"
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <p className="font-semibold text-sm text-foreground">
                    {issue.problem}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  {issue.solution}
                </p>
                <div className="pl-6 space-y-1">
                  <p className="text-xs font-medium text-foreground flex items-center gap-1">
                    <Zap className="w-3 h-3 text-primary" />
                    Immediate steps:
                  </p>
                  <ul className="space-y-1">
                    {issue.immediateSteps.map((step) => (
                      <li
                        key={step}
                        className="text-xs text-muted-foreground flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-muted-foreground flex-shrink-0" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Practice categories */}
      {guide.categories && (
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-foreground">
            Best Practice Categories
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {guide.categories.map((category) => (
              // Fix #5 — stable key from category.title
              <div
                key={category.title}
                className="rounded-lg border border-border p-4 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <category.icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="font-semibold text-sm text-foreground">
                    {category.title}
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {category.practices.map((practice) => (
                    <li
                      key={practice}
                      className="flex items-start gap-2 text-xs text-muted-foreground"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      {(guide.tips ?? guide.proTips) && (
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-foreground">
            {guide.proTips ? "Pro Tips" : "Tips"}
          </h3>
          <div className="rounded-lg border border-border bg-accent/20 p-4 space-y-2">
            {(guide.tips ?? guide.proTips ?? []).map((tip) => (
              // Fix #5 — stable key from tip text
              <div
                key={tip}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                {tip}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warning */}
      {guide.warning && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-2 text-destructive mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-semibold text-sm">Important Notice</span>
          </div>
          <p className="text-sm text-muted-foreground">{guide.warning}</p>
        </div>
      )}

      {/* Contact */}
      {guide.contact && (
        <div className="rounded-lg border border-border bg-accent/20 p-4">
          <div className="flex items-center gap-2 text-primary mb-1">
            <Phone className="w-4 h-4" />
            <span className="font-semibold text-sm">Need Help?</span>
          </div>
          <p className="text-sm text-muted-foreground">{guide.contact}</p>
        </div>
      )}
    </div>
  );
}
