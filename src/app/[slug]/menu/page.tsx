import { notFound } from "next/navigation";
import { Suspense } from "react";

import { dbPrisma } from "@/lib/prisma";

import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

// Loading state component
const RestaurantMenuSkeleton = () => (
  <div className="flex w-full flex-col">
    <div className="relative h-[250px] w-full animate-pulse bg-slate-200" />
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    </div>
  </div>
);

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await dbPrisma.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategory: {
        include: { products: true },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <div className="sticky top-0 z-10 w-full">
        <Suspense fallback={<RestaurantMenuSkeleton />}>
          <RestaurantHeader restaurant={restaurant} />
        </Suspense>
      </div>

      <main className="flex-1 pb-20">
        <Suspense
          fallback={
            <div className="relative z-50 mt-[-1.5rem] space-y-4 rounded-t-3xl bg-white p-5 shadow-lg">
              <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
              <div className="h-40 w-full animate-pulse rounded bg-slate-100" />
            </div>
          }
        >
          <RestaurantCategories restaurant={restaurant} />
        </Suspense>
      </main>

      <div className="pointer-events-none fixed bottom-0 left-0 z-0 h-16 w-full bg-gradient-to-t from-slate-50/80 to-transparent" />
    </div>
  );
};

export default RestaurantMenuPage;
