'use client';

import React from "react";
import { createPortal } from "react-dom";

const UNITS = [
    { value: "kg", label: "Kg" },
    { value: "g", label: "g" },
    { value: "lb", label: "lb" },
    { value: "oz", label: "oz" },
] as const;

type Unit = (typeof UNITS)[number]["value"];

export default function UnitDropdown({
    value,
    onChange,
    className = "h-full pr-2 pl-3 text-xs text-gray-800 bg-transparent focus:outline-none cursor-pointer",
    gutter = 2,              // space between button and menu
    listMaxHeight = 128,     //  cap menu height (px). Make smaller/bigger as you like.
}: {
    value: Unit;
    onChange: (v: Unit) => void;
    className?: string;
    gutter?: number;
    listMaxHeight?: number;
}) {
    const [open, setOpen] = React.useState(false);
    const btnRef = React.useRef<HTMLButtonElement>(null);
    const listRef = React.useRef<HTMLUListElement>(null);

    const [pos, setPos] = React.useState<{
        left: number;
        top?: number;
        bottom?: number;
        width: number;
        maxHeight: number;
        placement: "top" | "bottom";
    }>({ left: 0, top: 0, width: 0, maxHeight: listMaxHeight, placement: "bottom" });

    const updatePosition = React.useCallback(() => {
        const el = btnRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();

        const GAP = Math.max(-4, Math.min(24, gutter));
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const spaceBelow = vh - r.bottom - GAP;
        const spaceAbove = r.top - GAP;
        const placeBottom = spaceBelow >= Math.min(listMaxHeight, spaceAbove);

        const width = r.width;
        const left = Math.min(Math.max(0, r.left), Math.max(0, vw - width - 4));

        //  keep it small and scrollable
        const maxHeight = Math.min(listMaxHeight, placeBottom ? spaceBelow : spaceAbove);

        setPos({
            left,
            width,
            placement: placeBottom ? "bottom" : "top",
            top: placeBottom ? r.bottom + GAP : undefined,
            bottom: placeBottom ? undefined : vh - r.top + GAP,
            maxHeight: Math.max(72, maxHeight), // don't go too tiny
        });
    }, [gutter, listMaxHeight]);

    React.useEffect(() => {
        if (!open) return;
        updatePosition();
        const onScrollOrResize = () => updatePosition();
        window.addEventListener("scroll", onScrollOrResize, true);
        window.addEventListener("resize", onScrollOrResize);
        return () => {
            window.removeEventListener("scroll", onScrollOrResize, true);
            window.removeEventListener("resize", onScrollOrResize);
        };
    }, [open, updatePosition]);

    React.useEffect(() => {
        const handle = (e: PointerEvent) => {
            const t = e.target as Node;
            if (btnRef.current?.contains(t) || listRef.current?.contains(t)) return;
            setOpen(false);
        };
                  document.addEventListener("pointerdown", handle, { capture: true });
          return () =>
              document.removeEventListener("pointerdown", handle, { capture: true });
    }, []);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
        if (e.key === " " || e.key === "Enter" || e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            queueMicrotask(() => {
                (listRef.current?.querySelector("[data-option='true']") as HTMLButtonElement | null)?.focus();
            });
        }
    };

    const menu =
        open &&
        createPortal(
            <div
                style={{
                    position: "fixed",
                    left: pos.left,
                    top: pos.top,
                    bottom: pos.bottom,
                    width: pos.width,
                    zIndex: 2147483647,
                }}
            >
                <ul
                    ref={listRef}
                    role="listbox"
                    // scrollable + compact
                    className="rounded-md border border-gray-200 bg-white shadow-lg overflow-y-auto overscroll-contain custom-scroll"
                    style={{ maxHeight: pos.maxHeight }}
                >
                    {UNITS.map((u) => (
                        <li key={u.value}>
                            <button
                                type="button"
                                role="option"
                                data-option="true"
                                aria-selected={u.value === value}
                                className={`w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 focus:bg-gray-50 outline-none ${u.value === value ? "bg-gray-50" : ""
                                    }`}
                                onClick={() => {
                                    onChange(u.value);
                                    setOpen(false);
                                    btnRef.current?.focus();
                                }}
                            >
                                {u.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>,
            document.body
        );

    return (
        <div className="relative">
            <button
                ref={btnRef}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(v => !v)}
                onKeyDown={onKeyDown}
                className={`relative inline-flex items-center gap-2 px-3 py-2.5 whitespace-nowrap ${className}`}
            >
                <span className="leading-none">
                    {UNITS.find(u => u.value === value)?.label ?? value}
                </span>

                <svg
                    width="16" height="17" viewBox="0 0 16 17" fill="none"
                    className="shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M4.27325 6.57446H11.7266C11.8584 6.57502 11.9872 6.61465 12.0965 6.68836C12.2058 6.76207 12.2908 6.86654 12.3408 6.98856C12.3907 7.11058 12.4034 7.24467 12.3771 7.37388C12.3508 7.50309 12.2869 7.62161 12.1932 7.71446L8.47325 11.4345C8.41127 11.4969 8.33754 11.5465 8.2563 11.5804C8.17506 11.6142 8.08792 11.6317 7.99991 11.6317C7.91191 11.6317 7.82477 11.6142 7.74353 11.5804C7.66229 11.5465 7.58856 11.4969 7.52658 11.4345L3.80658 7.71446C3.71297 7.62161 3.64899 7.50309 3.62273 7.37388C3.59647 7.24467 3.60912 7.11058 3.65907 6.98856C3.70902 6.86654 3.79403 6.76207 3.90335 6.68836C4.01267 6.61465 4.1414 6.57502 4.27325 6.57446Z" fill="#374957" />
                </svg>
            </button>

            {menu}
        </div>
    );
}
