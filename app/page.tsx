"use client";

import { useState, type ReactNode } from "react";

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function Shell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Client-side utility · no server required
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </header>
        {children}
        <footer className="mt-10 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          Data stays in your browser. Part of the Bookchaowalit developer tools portfolio.
        </footer>
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
      : variant === "secondary"
        ? "bg-white text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-800"
        : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900";
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-zinc-500">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 font-mono text-sm text-zinc-900 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100";
const areaClass = `${inputClass} min-h-[160px] resize-y`;

type Palette = { name: string; colors: string[] };

const PRESETS: Palette[] = [
  { name: "Sunset", colors: ["#FF6B6B", "#FFA06B", "#FFD93D", "#6BCB77", "#4D96FF"] },
  { name: "Ocean", colors: ["#023E8A", "#0077B6", "#0096C7", "#48CAE4", "#90E0EF"] },
  { name: "Forest", colors: ["#2D6A4F", "#40916C", "#52B788", "#74C69D", "#95D5B2"] },
  { name: "Berry", colors: ["#7400B8", "#9D4EDD", "#C77DFF", "#E0AAFF", "#F3D9FA"] },
  { name: "Warm", colors: ["#9B2222", "#CD5C5C", "#E9967A", "#F4A460", "#FFE4B5"] },
  { name: "Slate", colors: ["#0F172A", "#1E293B", "#334155", "#94A3B8", "#F8FAFC"] },
];

function toCss(p: Palette) {
  return p.colors.map((c, i) => `  --color-${i + 1}: ${c};`).join("\n");
}
function toTailwind(p: Palette) {
  return p.colors.map((c, i) => `  ${p.name.toLowerCase()}-${i + 1}: "${c}",`).join("\n");
}
function toJson(p: Palette) {
  return JSON.stringify({ name: p.name, colors: p.colors }, null, 2);
}

export default function Home() {
  const [selected, setSelected] = useState<Palette>(PRESETS[0]);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (label: string, value: string) => {
    if (await copyText(value)) {
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    }
  };

  return (
    <Shell title="Color Palettes" subtitle="Pick a palette, copy swatches, or export tokens for CSS and Tailwind configs.">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">{selected.name}</h2>
          <Button variant="secondary" onClick={() => void copy("palette", selected.colors.join("\n"))}>
            {copied === "palette" ? "Copied" : "Copy all HEX"}
          </Button>
        </div>
        <div className="flex h-28 overflow-hidden rounded-xl">
          {selected.colors.map((color) => (
            <button
              key={color}
              type="button"
              className="group relative flex-1 transition hover:flex-[1.2]"
              style={{ backgroundColor: color }}
              onClick={() => void copy(color, color)}
              title={color}
            >
              <span className="absolute inset-x-0 bottom-2 mx-auto w-fit rounded-full bg-white/90 px-2 py-0.5 font-mono text-xs text-zinc-900 opacity-0 transition group-hover:opacity-100">
                {copied === color ? "Copied" : color}
              </span>
            </button>
          ))}
        </div>
      </div>

      <h2 className="mb-3 mt-8 text-lg font-medium">Presets</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setSelected(p)}
            className={`rounded-xl border p-3 text-left transition hover:shadow ${
              selected.name === p.name
                ? "border-zinc-900 ring-2 ring-zinc-900 dark:border-zinc-100 dark:ring-zinc-100"
                : "border-zinc-200 dark:border-zinc-800"
            }`}
          >
            <div className="mb-2 flex h-10 overflow-hidden rounded-md">
              {p.colors.map((c) => (
                <div key={c} className="flex-1" style={{ backgroundColor: c }} />
              ))}
            </div>
            <div className="text-sm font-medium">{p.name}</div>
          </button>
        ))}
      </div>

      <h2 className="mb-3 mt-8 text-lg font-medium">Export</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <Button variant="secondary" onClick={() => void copy("css", `:root {\n${toCss(selected)}\n}`)}>
          {copied === "css" ? "Copied CSS" : "Copy CSS vars"}
        </Button>
        <Button variant="secondary" onClick={() => void copy("tw", `{\n${toTailwind(selected)}\n}`)}>
          {copied === "tw" ? "Copied Tailwind" : "Copy Tailwind"}
        </Button>
        <Button variant="secondary" onClick={() => void copy("json", toJson(selected))}>
          {copied === "json" ? "Copied JSON" : "Copy JSON"}
        </Button>
      </div>
    </Shell>
  );
}
