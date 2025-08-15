import React, { useMemo, useRef, useState, useEffect } from "react";
import { ChevronDown, Check, Search, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AsYouType,
  parsePhoneNumberFromString,
  getCountries,
  getCountryCallingCode,
  CountryCode,
} from "libphonenumber-js";

type PhoneValue = {
  iso: CountryCode;
  dialCode: string;
  national: string;
  e164: string;
};

export default function PhoneNumberPicker({
  label = "Phone number",
  value,
  onChange,
  className = "",
  required = false,
  autoFocus = false,
}: {
  label?: string;
  value: PhoneValue;
  onChange: (value: PhoneValue) => void;
  className?: string;
  required?: boolean;
  autoFocus?: boolean;
}) {
  const allCountries = useMemo<CountryCode[]>(() => getCountries(), []);
  const [iso, setIso] = useState<CountryCode>("AE");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [national, setNational] = useState("");
  const [error, setError] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const countries = useMemo(() => {
    return allCountries
      .map((c) => ({
        iso: c,
        dialCode: `+${getCountryCallingCode(c)}`,
        name: countryName(c),
        flag: flagEmoji(c),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allCountries]);

  const selected = countries.find((c) => c.iso === iso);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const e164 = buildE164(selected.iso, national);
    onChange({ iso: selected.iso, dialCode: selected.dialCode, national, e164 });
  }, [selected, national, onChange]);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value || "";
    const formatter = new AsYouType(iso);
    const formatted = formatter.input(raw.replace(/[^\d]/g, ""));
    setNational(formatted);
    if (error) setError("");
  }

  function onBlur() {
    if (!selected) return;
    const phone = tryParse(selected.iso, national);
    if (!phone) return setError("Enter a valid phone number.");
    if (!phone.isPossible())
      return setError("This number seems too short or invalid for the selected country.");
    if (!phone.isValid())
      return setError("This number format is not valid for the selected country.");
    setError("");
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.iso.toLowerCase().includes(q)
    );
  }, [countries, query]);

  return (
    <div className={`w-full ${className}`} ref={menuRef}>

      <div
        className={`flex items-center rounded-lg border ${error ? "border-red-500" : "border-slate-200"
          } bg-white  focus-within:ring-1 focus-within:ring-slate-200`}
      >
        <button
          type="button"
          className="h-8  pl-4 pr-3 flex items-center gap-2 border-r border-slate-200 min-w-[110px]"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-sm leading-none">{selected?.flag}</span>
          <span className="text-slate-700 text-xs font-medium">
            {selected?.dialCode}
          </span>
          <span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.27325 6H11.7266C11.8584 6.00055 11.9872 6.04019 12.0965 6.1139C12.2058 6.18761 12.2908 6.29208 12.3408 6.4141C12.3907 6.53612 12.4034 6.67021 12.3771 6.79942C12.3508 6.92863 12.2869 7.04715 12.1932 7.14L8.47325 10.86C8.41127 10.9225 8.33754 10.9721 8.2563 11.0059C8.17506 11.0398 8.08792 11.0572 7.99991 11.0572C7.91191 11.0572 7.82477 11.0398 7.74353 11.0059C7.66229 10.9721 7.58856 10.9225 7.52658 10.86L3.80658 7.14C3.71297 7.04715 3.64899 6.92863 3.62273 6.79942C3.59647 6.67021 3.60912 6.53612 3.65907 6.4141C3.70902 6.29208 3.79403 6.18761 3.90335 6.1139C4.01267 6.04019 4.1414 6.00055 4.27325 6V6Z" fill="#374957" />
            </svg>

          </span>
        </button>
        <input
          ref={inputRef}
          type="tel"
          autoFocus={autoFocus}
          value={national}
          onChange={onInputChange}
          onBlur={onBlur}
          placeholder="-651651-1651"
          className="h-8 flex-1 px-4 outline-none bg-transparent text-[12px] text-slate-800 placeholder:text-[12px] placeholder-slate-400"
          />
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1 flex items-center gap-1 text-[13px] text-red-600"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="relative"
          >
            <div className="absolute z-50 mt-2 w-[240px] lg:w-md  rounded-xl border border-slate-200 bg-white shadow-xl">
              <div className="p-2">
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 h-10">
                  <Search className="w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search country or code"
                    className="flex-1 outline-none text-[14px] placeholder-slate-400"
                  />
                </div>
              </div>
              <div className="md:h-[200px] lg:h-[160px] overflow-y-auto py-1 custom-scroll">
                {filtered.map((c) => (
                  <button
                    key={c.iso}
                    className="w-full text-left px-3 py-2.5 hover:bg-slate-50 flex items-center gap-3"
                    onClick={() => {
                      setIso(c.iso);
                      setOpen(false);
                      const ayt = new AsYouType(c.iso);
                      setNational(ayt.input(national.replace(/[^\d]/g, "")));
                      setTimeout(() => inputRef.current?.focus(), 0);
                    }}
                  >
                    <span className="text-xl">{c.flag}</span>
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="text-sm text-slate-800 truncate">{c.name}</div>
                      <div className="text-sm text-slate-500">{c.iso}</div>
                    </div>
                    <div className="text-sm text-slate-700 font-medium">{c.dialCode}</div>
                    {iso === c.iso && <Check className="w-4 h-4 text-slate-600 ml-2" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function tryParse(iso: CountryCode, national: string) {
  try {
    const digits = national.replace(/[^\d]/g, "");
    return parsePhoneNumberFromString(digits, iso) || null;
  } catch {
    return null;
  }
}

function buildE164(iso: CountryCode, national: string): string {
  const phone = tryParse(iso, national);
  return phone ? phone.number : "";
}

function flagEmoji(iso: CountryCode) {
  const codePoints = iso
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function countryName(iso: CountryCode) {
  try {
    return (
      new Intl.DisplayNames([navigator.language || "en"], { type: "region" }).of(iso) ||
      iso
    );
  } catch {
    return iso;
  }
}
