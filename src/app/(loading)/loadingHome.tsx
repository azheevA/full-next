import { Skeleton } from "@/shared/ui/skeleton";
import { Card, CardContent } from "@/shared/ui/card";

export default function Loading() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-20 -right-4 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px] -z-10" />

      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col items-center text-center justify-center gap-6 px-4">
          <Skeleton className="h-7 w-48 rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-12 md:h-20 w-70 md:w-150" />
            <Skeleton className="h-12 md:h-20 w-50 md:w-100 mx-auto" />
          </div>
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-75 md:w-125" />
            <Skeleton className="h-4 w-62.5 md:w-100 mx-auto" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Skeleton className="h-12 w-40 rounded-md" />
            <Skeleton className="h-12 w-40 rounded-md" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="bg-card/50 backdrop-blur-sm border-none shadow-none"
              >
                <CardContent className="pt-6">
                  <Skeleton className="size-12 rounded-lg mb-4" />
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Skeleton */}
      <section className="py-20 border-t border-muted/50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
