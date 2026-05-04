"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Tag = { label: string; total: number };

type TagContextType = {
  tags: Tag[];
  isLoading: boolean;
  error: string | null;
  refreshTags: () => void;
};

const TagContext = createContext<TagContextType | null>(null);

export function TagsProvider({ children }: { children: React.ReactNode }) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = useCallback(() => {
    setIsLoading(true);
    fetch("/api/tags")
      .then((res) => res.json())
      .then((json) => setTags(json.data))
      .catch(() => setError("Failed to laod tags"))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return (
    <TagContext.Provider
      value={{ tags, isLoading, error, refreshTags: fetchTags }}
    >
      {children}
    </TagContext.Provider>
  );
}

export function useTags() {
  const ctx = useContext(TagContext);
  if (!ctx) throw new Error("useTags must be used within a TagProvider");
  return ctx;
}
