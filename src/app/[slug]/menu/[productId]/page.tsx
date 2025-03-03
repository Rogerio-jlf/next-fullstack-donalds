import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { dbPrisma } from "@/lib/prisma";

import ProductDetails from "./components/product-details";
import ProductHeader from "./components/product-header";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

// Loading skeleton for product page
const ProductPageSkeleton = () => (
  <div className="flex h-full min-h-screen flex-col bg-slate-50">
    {/* Product header skeleton */}
    <div className="relative min-h-[300px] w-full animate-pulse bg-slate-100">
      <div className="absolute left-4 top-4 h-10 w-10 animate-pulse rounded-full bg-white/60" />
      <div className="absolute right-4 top-4 h-10 w-10 animate-pulse rounded-full bg-white/60" />
    </div>

    {/* Product details skeleton */}
    <div className="relative z-10 mt-[-1.5rem] flex flex-auto flex-col rounded-t-3xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      <Skeleton className="mb-2 h-8 w-4/5" />
      <Skeleton className="mb-6 h-6 w-3/5" />

      <Skeleton className="mb-6 h-20 w-full rounded-xl" />

      <div className="mb-8 space-y-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="mt-auto">
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </div>
  </div>
);

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;

  const product = await dbPrisma.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound();
  }

  return (
    <div className="flex h-full min-h-screen flex-col bg-gradient-to-b from-white to-slate-50">
      <Suspense fallback={<ProductPageSkeleton />}>
        <div className="sticky top-0 z-20 bg-white">
          <ProductHeader product={product} />
        </div>

        <main className="relative z-10 flex-1 pb-20">
          <ProductDetails product={product} />
        </main>
      </Suspense>

      {/* Subtle background pattern - optional */}
      <div className="bg-grid-slate-200 pointer-events-none fixed inset-0 z-0 bg-[center_top_-1px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
    </div>
  );
};

export default ProductPage;
