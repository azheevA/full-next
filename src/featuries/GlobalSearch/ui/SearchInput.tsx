"use client";
import { Input } from "@/shared/ui/input";
import { Kbd, KbdGroup } from "@/shared/ui/kbd";
import { api } from "@@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useHotkeys("ctrl+k", (e) => {
    e.preventDefault();
    inputRef.current?.focus();
  });
  const results = useQuery(
    api.posts.searchPosts,
    searchTerm.length >= 1 ? { term: searchTerm, limit: 5 } : "skip",
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    if (!open) setOpen(true);
  }
  const handleBlur = () => {
    setTimeout(() => {
      setOpen(false);
    }, 200);
  };
  return (
    <div className="relative w-full max-w-sm rounded-lg">
      <div className="relative flex flex-row">
        <div className=" absolute right-2 top-1 flex flex-col items-center gap-4">
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <span>+</span>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            type="search"
            ref={inputRef}
            className="w-full pl-8 bg-background"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setOpen(true)}
            onBlur={handleBlur}
          />
        </div>
      </div>

      {open && searchTerm.length >= 2 && (
        <div className="absolute top-full z-10 w-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
          {results === undefined ? (
            <div className="flex items-center justify-center p-4 text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Searching...</span>
            </div>
          ) : results.length === 0 ? (
            <p className="p-4 text-sm text-center text-muted-foreground">
              No results found for {searchTerm}
            </p>
          ) : (
            <div className="py-2">
              {results.map((post) => (
                <Link
                  href={`/blog/${post._id}`}
                  key={post._id}
                  onClick={() => setOpen(false)}
                  className="flex flex-col px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  <p className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors">
                    {post.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {post.body.substring(0, 60)}...
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
