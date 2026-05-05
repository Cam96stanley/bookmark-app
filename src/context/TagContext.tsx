"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type Tag = { label: string; total: number };

type TagContextType = {
  tags: Tag[];
  isLoading: boolean;
  error: string | null;
  refreshTags: () => void;
};

type TagsProviderProps = {
  children: React.ReactNode;
  initialTags?: Tag[];
};

const TagContext = createContext<TagContextType | null>(null);

export function TagsProvider({ children, initialTags = [] }: TagsProviderProps) {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = useCallback(() => {
    setIsLoading(true);
    fetch("/api/tags", { credentials: "include" })
      .then((res) => res.json())
      .then((json) => setTags(json.data ?? []))
      .catch(() => setError("Failed to load tags"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <TagContext.Provider value={{ tags, isLoading, error, refreshTags: fetchTags }}>
      {children}
    </TagContext.Provider>
  );
}

export function useTags() {
  const ctx = useContext(TagContext);
  if (!ctx) throw new Error("useTags must be used within a TagProvider");
  return ctx;
}