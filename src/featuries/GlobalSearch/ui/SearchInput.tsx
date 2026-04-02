import { Input } from "@/shared/ui/input";
import { Search } from "lucide-react";

export function SearchInput() {
  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          type="search"
          className="w-full pl-8 bg-background"
        />
      </div>
    </div>
  );
}
