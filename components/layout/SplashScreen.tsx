"use client";

import { useState, useEffect, useMemo } from "react";

const STORAGE_KEY = "nacosSplashLastSeenAt";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// This variable lives outside the component. 
// It persists as long as the tab is open, preventing the splash 
// from re-triggering during internal route navigation.
let hasCheckedSplashInSession = false;

const TYPING_TEXTS = [
  "Initializing NACOS FUNAAB...",
  "Loading computing resources...",
  "Connecting to the future...",
  "Welcome to innovation!",
];

const SYMBOLS = ["</>", "{}", "[]", "()", "&&", "||", "=>", "++"];

export default function SplashScreen({
  children,
  minDelay = 2000,
}: {
  children: React.ReactNode;
  minDelay?: number;
}) {
  const [showSplash, setShowSplash] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Stable particles
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      left: `${(i * 37 + 11) % 100}%`,
      top: `${(i * 53 + 7) % 100}%`,
      delay: `${(i * 0.3) % 3}s`,
    })), []);

  useEffect(() => {
    // If we've already handled the splash in this session, don't do anything
    if (hasCheckedSplashInSession) return;

    const checkSplash = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      const lastSeen = stored ? Number(stored) : 0;
      const isExpired = Date.now() - lastSeen > ONE_DAY_MS;

      if (isExpired) {
        // Setting state inside requestAnimationFrame satisfies the "no-cascading-renders" rule
        requestAnimationFrame(() => {
          setShowSplash(true);
        });
        
        localStorage.setItem(STORAGE_KEY, String(Date.now()));

        setTimeout(() => {
          setShowSplash(false);
        }, minDelay);
      }
      
      hasCheckedSplashInSession = true;
    };

    checkSplash();
  }, [minDelay]);

  // Typing animation
  useEffect(() => {
    if (!showSplash) return;

    const currentText = TYPING_TEXTS[textIndex];
    if (!currentText) return;

    let timer: NodeJS.Timeout;

    if (displayText.length < currentText.length) {
      timer = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, 50);
    } else if (textIndex < TYPING_TEXTS.length - 1) {
      timer = setTimeout(() => {
        setDisplayText("");
        setTextIndex((i) => i + 1);
      }, 800);
    }

    return () => clearTimeout(timer);
  }, [displayText, textIndex, showSplash]);

  // Cursor blink
  useEffect(() => {
    if (!showSplash) return;
    const id = setInterval(() => setShowCursor((p) => !p), 500);
    return () => clearInterval(id);
  }, [showSplash]);

  return (
    <>
      {/* The main website content is ALWAYS rendered but hidden from 
          screen readers while the splash is active */}
      <div aria-hidden={showSplash}>{children}</div>

      {/* The Splash Overlay */}
      {showSplash && (
        <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center z-[9999]">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-emerald-950 to-emerald-900 overflow-hidden">
            {particles.map((p, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-emerald-400/20 rounded-full animate-pulse"
                style={{ left: p.left, top: p.top, animationDelay: p.delay }}
              />
            ))}
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            {SYMBOLS.map((symbol, i) => (
              <div
                key={i}
                className="absolute text-emerald-500 font-mono text-xl animate-bounce"
                style={{
                  left: `${(i * 18) % 90}%`,
                  top: `${(i * 14) % 80}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                {symbol}
              </div>
            ))}
          </div>

          <div className="relative z-10 w-full max-w-xl px-6">
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
                NACOS
              </h1>
              <p className="text-emerald-500/60 font-mono tracking-[0.3em] text-sm mt-2 uppercase">
                Funaab Chapter
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-md border border-emerald-500/20 rounded-xl p-6 shadow-2xl">
              <div className="flex gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <div className="font-mono text-emerald-400 text-sm sm:text-base">
                <span className="opacity-50 mr-2">$</span>
                {displayText}
                <span className={showCursor ? "opacity-100" : "opacity-0"}>_</span>
              </div>
            </div>

            <div className="mt-8 px-2">
              <div className="h-1 w-full bg-emerald-950 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500" 
                  style={{ animation: `loadBar ${minDelay}ms linear forwards` }} 
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes loadBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </>
  );
}