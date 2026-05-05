"use client";

import { createContext, useContext, useState } from "react";

type FilterContextType = {
    selectedTags: string[];
    toggleTag: (tag: string) => void;
    clearTags: () => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
    }

    const clearTags = () => setSelectedTags([]);

    return (
        <FilterContext.Provider value={{ selectedTags, toggleTag, clearTags }}>
            {children}
        </FilterContext.Provider>
    )
}

export function useFilter() {
    const ctx = useContext(FilterContext);
    if (!ctx) throw new Error("useFilter must be used within a FilterProvider");
    return ctx;
}