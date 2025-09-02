'use client';

import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Portal,
} from '@headlessui/react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

type OptionInput = string | { value: string; label?: string };

type Props = {
    options: OptionInput[];
    value?: string;                 // controlled value
    defaultValue?: string;          // uncontrolled initial value
    onChange?: (value: string) => void;
    buttonClassName?: string;       // customize button
    menuClassName?: string;         // customize menu
    disabled?: boolean;
    searchable?: boolean;           // enable search functionality
};

export default function PurchasingDropdown({
    options,
    value,
    defaultValue,
    onChange,
    buttonClassName = "flex items-center justify-between w-full border border-gray-200 rounded-md h-8 px-3 text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-200",
    menuClassName = "z-[100] rounded-md bg-white shadow-lg ring-1 ring-black/5 text-sm overflow-auto overscroll-contain",
    disabled,
    searchable = true,
}: Props) {
    // normalize options
    const opts = useMemo(() => {
        return options.map(o => typeof o === 'string' ? { value: o, label: o } : { value: o.value, label: o.label ?? o.value });
    }, [options]);

    // search state
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // filter options based on search query
    const filteredOptions = useMemo(() => {
        if (!searchable || !searchQuery.trim()) {
            return opts;
        }
        const query = searchQuery.toLowerCase();
        return opts.filter(opt =>
            opt.label.toLowerCase().includes(query) ||
            opt.value.toLowerCase().includes(query)
        );
    }, [opts, searchQuery, searchable]);

    // pick first valid default
    const firstValue = opts[0]?.value;
    const initial = defaultValue && opts.some(o => o.value === defaultValue) ? defaultValue : firstValue;

    // controlled vs uncontrolled
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<string | undefined>(initial);
    const selected = (isControlled ? value : internal) ?? '';

    // keep internal in sync if options change and selected disappears
    useEffect(() => {
        if (isControlled) return;
        if (!selected || !opts.some(o => o.value === selected)) {
            setInternal(opts[0]?.value);
        }
    }, [opts, isControlled, selected]);

    const handleChange = (v: string) => {
        if (!isControlled) setInternal(v);
        onChange?.(v);
        setIsOpen(false);
        setSearchQuery(''); // Clear search when option is selected
    };

    const btnRef = useRef<HTMLButtonElement | null>(null);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const [menuWidth, setMenuWidth] = useState<number>(0);
    const [menuMaxHeight, setMenuMaxHeight] = useState<number>(80); // further reduced initial height

    // Keep options width equal to button; cap height based on viewport
    useLayoutEffect(() => {
        const el = btnRef.current;
        if (!el) return;
        const update = () => {
            const rect = el.getBoundingClientRect();
            setMenuWidth(rect.width);
                  const gap = 4;
      const vh = window.innerHeight;
      const below = vh - rect.bottom - gap;
      const above = rect.top - gap;
      const desired = 150; // reduced from 200 to 150
      const max = Math.max(100, Math.min(desired, below > 120 ? below : above)); // reduced minimum from 120 to 100
      setMenuMaxHeight(max);
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update, true);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', update);
            window.removeEventListener('scroll', update, true);
        };
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [isOpen, searchable]);

    const ChevronIcon = () => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M4.27325 6H11.7266C11.8584 6.00055 11.9872 6.04019 12.0965 6.1139C12.2058 6.18761 12.2908 6.29208 12.3408 6.4141C12.3907 6.53612 12.4034 6.67021 12.3771 6.79942C12.3508 6.92863 12.2869 7.04715 12.1932 7.14L8.47325 10.86C8.41127 10.9225 8.33754 10.9721 8.2563 11.0059C8.17506 11.0398 8.08792 11.0572 7.99991 11.0572C7.91191 11.0572 7.82477 11.0398 7.74353 11.0059C7.66229 10.9721 7.58856 10.9225 7.52658 10.86L3.80658 7.14C3.71297 7.04715 3.64899 6.92863 3.62273 6.79942C3.59647 6.67021 3.60912 6.53612 3.65907 6.4141C3.70902 6.29208 3.79403 6.18761 3.90335 6.1139C4.01267 6.04019 4.1414 6.00055 4.27325 6Z" fill="#727A90" />
        </svg>
    );

    const label = opts.find(o => o.value === selected)?.label ?? selected;

    return (
        <Listbox value={selected} onChange={handleChange} disabled={disabled}>
            {({ open }) => {
                // Update isOpen state
                if (open !== isOpen) {
                    setIsOpen(open);
                    if (!open) {
                        setSearchQuery(''); // Clear search when dropdown closes
                    }
                }

                return (
                    <div className="relative mt-1">
                        <ListboxButton
                            ref={btnRef}
                            className={buttonClassName}
                        >
                            {label || 'Select...'}
                            <ChevronIcon />
                        </ListboxButton>

                        <Portal>
                            <ListboxOptions
                                anchor="bottom start"
                                style={{ width: menuWidth ? `${menuWidth}px` : undefined }}
                                className={`z-[10001] rounded-md bg-white shadow-lg ring-1 ring-black/5 text-sm
              h-32 overflow-y-auto overscroll-contain custom-scroll ${menuClassName}`}
                            >
                                {/* Search Input */}
                                {searchable && (
                                    <div className="sticky top-0 bg-white border-b border-gray-200 p-2">
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Escape') {
                                                    e.preventDefault();
                                                    setSearchQuery('');
                                                }
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Options */}
                                {filteredOptions.length === 0 ? (
                                    <div className="px-3 py-2 text-xs text-gray-500">
                                        {searchQuery ? 'No matching options' : 'No options'}
                                    </div>
                                ) : (
                                    filteredOptions.map((opt) => (
                                        <ListboxOption
                                            key={opt.value}
                                            value={opt.value}
                                            className={({ active, selected }) =>
                                                `cursor-pointer text-xs select-none px-3 py-2 ${active ? 'bg-primary text-white' : 'text-gray-900'
                                                } ${selected ? 'font-medium' : ''}`
                                            }
                                        >
                                            {opt.label}
                                        </ListboxOption>
                                    ))
                                )}
                            </ListboxOptions>
                        </Portal>
                    </div>
                );
            }}
        </Listbox>
    );
}
