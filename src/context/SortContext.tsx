"use client";

import { createContext, useContext, useState } from "react";

export type SortOption = "recently-added" | "recently-visited" | "most-visited";

type SortContextType = {
  sort: SortOption;
  setSort: (sort: SortOption) => void;
};

const SortContext = createContext<SortContextType | null>(null);

export function SortProvider({ children }: { children: React.ReactNode }) {
  const [sort, setSort] = useState<SortOption>("recently-added");

  return (
    <SortContext.Provider value={{ sort, setSort }}>
      {children}
    </SortContext.Provider>
  );
}

export function useSort() {
  const ctx = useContext(SortContext);
  if (!ctx) throw new Error("useSort must be used within a SortProvider");
  return ctx;
}
